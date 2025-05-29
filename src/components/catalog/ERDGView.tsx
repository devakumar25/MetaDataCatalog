import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import dagre from '@dagrejs/dagre';
import * as Icons from 'lucide-react';
import { TableDetails } from '../details/TableDetails';
import { SearchAsset } from '../../types/assets';

interface Column {
  name: string;
  dataType: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  references?: {
    table: string;
    column: string;
  };
}

interface TableNode {
  id: string;
  name: string;
  columns: Column[];
  tags: string[];
  description?: string;
}

interface Relationship {
  id: string;
  sourceTable: string;
  sourceColumn: string;
  targetTable: string;
  targetColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
}

interface ERDGData {
  tables: TableNode[];
  relationships: Relationship[];
}

interface ERDGViewProps {
  clusterId: string;
  onClose: () => void;
}

// Mock data for demonstration
const mockERDGData: ERDGData = {
  tables: [
    {
      id: 'customers',
      name: 'Customers',
      description: 'Customer information',
      tags: ['core', 'pii'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'email', dataType: 'varchar(255)', isPrimaryKey: false, isForeignKey: false },
        { name: 'name', dataType: 'varchar(100)', isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false },
        { name: 'status', dataType: 'varchar(20)', isPrimaryKey: false, isForeignKey: false },
        { name: 'last_login', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false },
        { name: 'preferences', dataType: 'jsonb', isPrimaryKey: false, isForeignKey: false },
        { name: 'account_type', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'orders',
      name: 'Orders',
      description: 'Order transactions',
      tags: ['core', 'transactional'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'customer_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'customers', column: 'id' } },
        { name: 'order_date', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false },
        { name: 'status', dataType: 'varchar(20)', isPrimaryKey: false, isForeignKey: false },
        { name: 'total_amount', dataType: 'decimal(10,2)', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'order_items',
      name: 'Order Items',
      description: 'Order line items',
      tags: ['core', 'transactional'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'order_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'orders', column: 'id' } },
        { name: 'product_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
        { name: 'quantity', dataType: 'integer', isPrimaryKey: false, isForeignKey: false },
        { name: 'unit_price', dataType: 'decimal(10,2)', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'products',
      name: 'Products',
      description: 'Product catalog',
      tags: ['core', 'reference'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'name', dataType: 'varchar(255)', isPrimaryKey: false, isForeignKey: false },
        { name: 'description', dataType: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'category_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'categories', column: 'id' } },
        { name: 'price', dataType: 'decimal(10,2)', isPrimaryKey: false, isForeignKey: false },
        { name: 'stock', dataType: 'integer', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'categories',
      name: 'Categories',
      description: 'Product categories',
      tags: ['reference'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'name', dataType: 'varchar(100)', isPrimaryKey: false, isForeignKey: false },
        { name: 'parent_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'categories', column: 'id' } }
      ]
    },
    {
      id: 'shipping_addresses',
      name: 'Shipping Addresses',
      description: 'Customer shipping addresses',
      tags: ['core', 'pii'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'customer_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'customers', column: 'id' } },
        { name: 'address_line1', dataType: 'varchar(255)', isPrimaryKey: false, isForeignKey: false },
        { name: 'address_line2', dataType: 'varchar(255)', isPrimaryKey: false, isForeignKey: false },
        { name: 'city', dataType: 'varchar(100)', isPrimaryKey: false, isForeignKey: false },
        { name: 'state', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false },
        { name: 'postal_code', dataType: 'varchar(20)', isPrimaryKey: false, isForeignKey: false },
        { name: 'country', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'payments',
      name: 'Payments',
      description: 'Order payment transactions',
      tags: ['core', 'transactional'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'order_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'orders', column: 'id' } },
        { name: 'amount', dataType: 'decimal(10,2)', isPrimaryKey: false, isForeignKey: false },
        { name: 'payment_method', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false },
        { name: 'status', dataType: 'varchar(20)', isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory',
      description: 'Product inventory levels',
      tags: ['core', 'operational'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'product_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
        { name: 'warehouse_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'warehouses', column: 'id' } },
        { name: 'quantity', dataType: 'integer', isPrimaryKey: false, isForeignKey: false },
        { name: 'last_updated', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'warehouses',
      name: 'Warehouses',
      description: 'Warehouse locations',
      tags: ['reference'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'name', dataType: 'varchar(100)', isPrimaryKey: false, isForeignKey: false },
        { name: 'address', dataType: 'varchar(255)', isPrimaryKey: false, isForeignKey: false },
        { name: 'city', dataType: 'varchar(100)', isPrimaryKey: false, isForeignKey: false },
        { name: 'state', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false },
        { name: 'country', dataType: 'varchar(50)', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'reviews',
      name: 'Reviews',
      description: 'Product reviews',
      tags: ['core', 'user-generated'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'product_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
        { name: 'customer_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'customers', column: 'id' } },
        { name: 'rating', dataType: 'integer', isPrimaryKey: false, isForeignKey: false },
        { name: 'comment', dataType: 'text', isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      id: 'wishlists',
      name: 'Wishlists',
      description: 'Customer wishlists',
      tags: ['core'],
      columns: [
        { name: 'id', dataType: 'uuid', isPrimaryKey: true, isForeignKey: false },
        { name: 'customer_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'customers', column: 'id' } },
        { name: 'product_id', dataType: 'uuid', isPrimaryKey: false, isForeignKey: true, references: { table: 'products', column: 'id' } },
        { name: 'added_at', dataType: 'timestamp', isPrimaryKey: false, isForeignKey: false }
      ]
    }
  ],
  relationships: [
    {
      id: 'rel1',
      sourceTable: 'orders',
      sourceColumn: 'customer_id',
      targetTable: 'customers',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel2',
      sourceTable: 'order_items',
      sourceColumn: 'order_id',
      targetTable: 'orders',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel3',
      sourceTable: 'order_items',
      sourceColumn: 'product_id',
      targetTable: 'products',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel4',
      sourceTable: 'products',
      sourceColumn: 'category_id',
      targetTable: 'categories',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel6',
      sourceTable: 'shipping_addresses',
      sourceColumn: 'customer_id',
      targetTable: 'customers',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel7',
      sourceTable: 'payments',
      sourceColumn: 'order_id',
      targetTable: 'orders',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel8',
      sourceTable: 'inventory',
      sourceColumn: 'product_id',
      targetTable: 'products',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel9',
      sourceTable: 'inventory',
      sourceColumn: 'warehouse_id',
      targetTable: 'warehouses',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel11',
      sourceTable: 'reviews',
      sourceColumn: 'customer_id',
      targetTable: 'customers',
      targetColumn: 'id',
      type: 'many-to-one'
    },
    {
      id: 'rel13',
      sourceTable: 'wishlists',
      sourceColumn: 'product_id',
      targetTable: 'products',
      targetColumn: 'id',
      type: 'many-to-one'
    }
  ]
};

interface RelationshipTooltip {
  relationship: Relationship;
  position: {
    x: number;
    y: number;
  };
  views: {
    name: string;
    type: string;
    lastAccessed: string;
  }[];
}

export const ERDGView: React.FC<ERDGViewProps> = ({ clusterId, onClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedTable, setSelectedTable] = useState<SearchAsset | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [hoveredEdge, setHoveredEdge] = useState<Relationship | null>(null);
  const [relationshipTooltip, setRelationshipTooltip] = useState<RelationshipTooltip | null>(null);

  const getMockViewsForRelationship = (relationship: Relationship) => {
    return [
      {
        name: 'Customer Orders Report',
        type: 'Report',
        lastAccessed: new Date(Date.now() - Math.random() * 86400000).toISOString()
      },
      {
        name: 'Sales Dashboard',
        type: 'Dashboard',
        lastAccessed: new Date(Date.now() - Math.random() * 86400000).toISOString()
      },
      {
        name: 'Order Analytics',
        type: 'Query Table',
        lastAccessed: new Date(Date.now() - Math.random() * 86400000).toISOString()
      }
    ];
  };

  const handleEdgeHover = (event: MouseEvent, relationship: Relationship) => {
    if (!event.target) return;

    const rect = (event.target as SVGElement).getBoundingClientRect();
    setRelationshipTooltip({
      relationship,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      },
      views: getMockViewsForRelationship(relationship)
    });
  };

  const handleEdgeHoverOut = () => {
    setRelationshipTooltip(null);
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    
    // Add dotted background pattern
    const defs = svg.append('defs');
    
    defs.append('pattern')
      .attr('id', 'dot-pattern')
      .attr('width', 20)
      .attr('height', 20)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('circle')
      .attr('cx', 2)
      .attr('cy', 2)
      .attr('r', 1)
      .attr('fill', '#e2e8f0');

    // Add background rect with pattern
    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', 'url(#dot-pattern)');

    const g = svg.append('g');

    // Create a new directed graph
    const graph = new dagre.graphlib.Graph();
    graph.setGraph({
      rankdir: 'LR',
      nodesep: 100,
      ranksep: 200,
      marginx: 50,
      marginy: 50
    });

    // Set default edge and node properties
    graph.setDefaultEdgeLabel(() => ({}));

    // Calculate node dimensions based on columns
    mockERDGData.tables.forEach(table => {
      const isExpanded = expandedNodes[table.id];
      const visibleColumns = isExpanded ? table.columns : table.columns.slice(0, 6);
      const height = 80 + visibleColumns.length * 24;

      graph.setNode(table.id, {
        label: table.name,
        width: 300,
        height,
        ...table
      });
    });

    // Add edges to the graph
    mockERDGData.relationships.forEach(rel => {
      graph.setEdge(rel.sourceTable, rel.targetTable, {
        relationship: rel
      });
    });

    // Layout the graph
    dagre.layout(graph);

    // Draw edges with gradient and hover effect
    graph.edges().forEach(e => {
      const edge = graph.edge(e);
      const points = edge.points || [];
      const rel = edge.relationship as Relationship;
      
      // Create unique gradient ID for each edge
      const gradientId = `edge-gradient-${e.v}-${e.w}`;
      
      // Add gradient definition
      const gradient = defs.append('linearGradient')
        .attr('id', gradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', points[0].x)
        .attr('y1', points[0].y)
        .attr('x2', points[points.length - 1].x)
        .attr('y2', points[points.length - 1].y);
        
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#3b82f6');
        
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#60a5fa');

      const line = d3.line()
        .x(d => d.x)
        .y(d => d.y)
        .curve(d3.curveBasis);

      const path = g.append('path')
        .attr('d', line(points))
        .attr('stroke', `url(#${gradientId})`)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)')
        .on('mouseenter', (event) => handleEdgeHover(event, rel))
        .on('mouseleave', handleEdgeHoverOut);

      // Add invisible wider path for better hover detection
      g.append('path')
        .attr('d', line(points))
        .attr('stroke', 'transparent')
        .attr('stroke-width', 20)
        .attr('fill', 'none')
        .style('pointer-events', 'stroke')
        .on('mouseenter', (event) => handleEdgeHover(event, rel))
        .on('mouseleave', handleEdgeHoverOut);
    });

    // Create arrow marker
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#60a5fa');

    // Draw nodes
    const nodes = g.selectAll('.node')
      .data(graph.nodes())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', v => {
        const node = graph.node(v);
        return `translate(${node.x - node.width / 2},${node.y - node.height / 2})`;
      });

    // Node background
    nodes.each(function(v) {
      const node = graph.node(v);
      const g = d3.select(this);
      const table = mockERDGData.tables.find(t => t.id === v);
      if (!table) return;

      // Node rectangle
      g.append('rect')
        .attr('width', node.width)
        .attr('height', node.height)
        .attr('rx', 8)
        .attr('fill', '#ffffff')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 2);

      // Header
      const header = g.append('g')
        .attr('transform', 'translate(0, 0)');

      header.append('rect')
        .attr('width', node.width)
        .attr('height', 40)
        .attr('rx', 8)
        .attr('fill', '#f8fafc');

      // Table name
      header.append('text')
        .attr('x', 16)
        .attr('y', 26)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#1e293b')
        .text(table.name);

      // Details button
      const detailsButton = header.append('g')
        .attr('transform', `translate(${node.width - 32}, 8)`)
        .attr('cursor', 'pointer')
        .on('click', () => {
          const searchAsset: SearchAsset = {
            id: table.id,
            name: table.name,
            type: 'Table',
            createdAt: new Date().toISOString(),
            createdBy: 'System',
            sharedUsersCount: 0,
            dataSourcesCount: 1,
            downstreamAssetsCount: 0,
            tags: table.tags,
            icon: 'table'
          };
          setSelectedTable(searchAsset);
        });

      detailsButton.append('rect')
        .attr('width', 24)
        .attr('height', 24)
        .attr('rx', 4)
        .attr('fill', '#eff6ff');

      detailsButton.append('text')
        .attr('x', 12)
        .attr('y', 16)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .attr('fill', '#3b82f6')
        .text('i');

      // Columns
      const isExpanded = expandedNodes[table.id];
      const visibleColumns = isExpanded ? table.columns : table.columns.slice(0, 6);
      
      visibleColumns.forEach((column, i) => {
        const columnGroup = g.append('g')
          .attr('transform', `translate(16, ${48 + i * 24})`);

        // Column name
        columnGroup.append('text')
          .attr('x', 0)
          .attr('y', 12)
          .attr('font-size', '12px')
          .attr('fill', '#64748b')
          .text(column.name);

        // Data type
        columnGroup.append('text')
          .attr('x', node.width - 32)
          .attr('y', 12)
          .attr('font-size', '12px')
          .attr('text-anchor', 'end')
          .attr('fill', '#94a3b8')
          .text(column.dataType);

        // Key indicators
        if (column.isPrimaryKey) {
          columnGroup.append('text')
            .attr('x', -12)
            .attr('y', 12)
            .attr('font-size', '12px')
            .attr('fill', '#3b82f6')
            .text('🔑');
        }
        if (column.isForeignKey) {
          columnGroup.append('text')
            .attr('x', -24)
            .attr('y', 12)
            .attr('font-size', '12px')
            .attr('fill', '#8b5cf6')
            .text('🔗');
        }
      });

      // Show more button if needed
      if (table.columns.length > 6 && !isExpanded) {
        const showMoreButton = g.append('g')
          .attr('transform', `translate(16, ${48 + 6 * 24})`)
          .attr('cursor', 'pointer')
          .on('click', () => {
            setExpandedNodes(prev => ({
              ...prev,
              [table.id]: true
            }));
          });

        showMoreButton.append('text')
          .attr('font-size', '12px')
          .attr('fill', '#3b82f6')
          .text(`Show ${table.columns.length - 6} more columns...`);
      }
    });

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoom);

    // Center the graph
    const graphWidth = graph.graph().width || 0;
    const graphHeight = graph.graph().height || 0;
    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;
    const initialScale = Math.min(
      svgWidth / graphWidth,
      svgHeight / graphHeight
    ) * 0.9;

    const initialTransform = d3.zoomIdentity
      .translate(
        (svgWidth - graphWidth * initialScale) / 2,
        (svgHeight - graphHeight * initialScale) / 2
      )
      .scale(initialScale);

    svg.call(zoom.transform, initialTransform);
  }, [clusterId, expandedNodes]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{clusterId} - Entity Relationship Diagram</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Graph */}
        <div className="flex-1 relative overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full"
          />

          {/* Relationship tooltip */}
          {relationshipTooltip && (
            <div
              className="fixed bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md"
              style={{
                left: relationshipTooltip.position.x,
                top: relationshipTooltip.position.y + 20,
                transform: 'translateX(-50%)',
                zIndex: 1000
              }}
            >
              <div className="mb-3">
                <h4 className="text-sm font-medium text-gray-900">Relationship Details</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {relationshipTooltip.relationship.sourceTable}.
                  {relationshipTooltip.relationship.sourceColumn} →{' '}
                  {relationshipTooltip.relationship.targetTable}.
                  {relationshipTooltip.relationship.targetColumn}
                </p>
                <p className="text-xs font-medium text-blue-600 mt-1">
                  Type: {relationshipTooltip.relationship.type.replace(/-/g, ' ')}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-medium text-gray-700 mb-2">{relationshipTooltip.views.length} Downstream Views </h5>
                {/*<div className="space-y-2">
                  {relationshipTooltip.views.map((view, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium text-gray-900">{view.name}</p>
                        <p className="text-gray-500">{view.type}</p>
                      </div>
                      <p className="text-gray-400">
                        {new Date(view.lastAccessed).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>*/}
              </div>
            </div>
          )}
        </div>

        {/* Table Details Modal */}
        {selectedTable && (
          <TableDetails
            asset={selectedTable}
            onClose={() => setSelectedTable(null)}
            path={['Catalog', 'Data Clusters', 'ERDG', selectedTable.name]}
          />
        )}
      </div>
    </div>
  );
};