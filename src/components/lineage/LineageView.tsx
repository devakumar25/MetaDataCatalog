import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import dagre from '@dagrejs/dagre';
import * as Icons from 'lucide-react';
import { AssetNode } from './types';
import { NodeDetails } from './NodeDetails';
import { mockLineageData } from './mockData';

interface LineageViewProps {
  assetId: string;
  onClose: () => void;
}

export const LineageView: React.FC<LineageViewProps> = ({ assetId, onClose }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<AssetNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<AssetNode | null>(null);
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);

  
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
      ranksep: 150,
      marginx: 50,
      marginy: 50
    });

    // Set default edge and node properties
    graph.setDefaultEdgeLabel(() => ({}));

    // Add nodes to the graph
    mockLineageData.nodes.forEach(node => {
      graph.setNode(node.id, {
        label: node.name,
        width: 280,
        height: 120,
        ...node
      });
    });

    // Add edges to the graph
    mockLineageData.edges.forEach(edge => {
      graph.setEdge(edge.source, edge.target);
    });

    // Layout the graph
    dagre.layout(graph);

    // Draw edges with gradient
    graph.edges().forEach(e => {
      const edge = graph.edge(e);
      const points = edge.points || [];
      
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

      g.append('path')
        .attr('d', line(points))
        .attr('stroke', `url(#${gradientId})`)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('marker-end', 'url(#arrow)');
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

    // Node background with gradient
    nodes.each(function(v) {
      const node = graph.node(v);
      const g = d3.select(this);
      
      // Create gradient for node background
      const gradientId = `node-gradient-${node.id}`;
      const gradient = defs.append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');
        
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', 0.9);
        
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#f8fafc')
        .attr('stop-opacity', 0.9);

      // Node rectangle with shadow and gradient
      g.append('rect')
        .attr('width', node.width)
        .attr('height', node.height)
        .attr('rx', 12)
        .attr('ry', 12)
        .attr('fill', `url(#${gradientId})`)
        .attr('stroke', '#e2e8f0')
        .attr('stroke-width', 2)
        .attr('filter', 'url(#shadow)');
    });

    // Add shadow filter
    const filter = defs.append('filter')
      .attr('id', 'shadow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
      
    filter.append('feGaussianBlur')
      .attr('in', 'SourceAlpha')
      .attr('stdDeviation', 3);
      
    filter.append('feOffset')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('result', 'offsetblur');
      
    const merge = filter.append('feMerge');
    merge.append('feMergeNode');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Node content
    nodes.each(function(v) {
      const node = graph.node(v);
      const g = d3.select(this);
      
      // Icon based on type
      const iconGroup = g.append('g')
        .attr('transform', 'translate(16, 16)');
        
      iconGroup.append('rect')
        .attr('width', 24)
        .attr('height', 24)
        .attr('rx', 6)
        .attr('fill', '#eff6ff');
        
      iconGroup.append('text')
        .attr('x', 12)
        .attr('y', 16)
        .attr('text-anchor', 'middle')
        .attr('fill', '#3b82f6')
        .attr('font-family', 'sans-serif')
        .text(() => {
          switch (node.type) {
            case 'Data Source': return '';
            case 'Table': return '';
            case 'Query Table': return '';
            case 'Custom Formula': return '';
            case 'Report': return '';
            case 'Dashboard': return '';
            case 'ML Model': return '';
            default: return '';
          }
        });

      // Title
      g.append('text')
        .attr('x', 50)
        .attr('y', 30)
        .attr('font-size', '14px')
        .attr('font-weight', 'bold')
        .attr('fill', '#1e293b')
        .text(node.name);

      // Type
      g.append('text')
        .attr('x', 50)
        .attr('y', 48)
        .attr('font-size', '12px')
        .attr('fill', '#64748b')
        .text(node.type);

      // Description
    /*  if (node.description) {
        g.append('text')
          .attr('x', 16)
          .attr('y', 70)
          .attr('font-size', '12px')
          .attr('fill', '#64748b')
          .text(node.description);
      }*/

      // Tags
      const tags = g.append('g')
        .attr('transform', `translate(16, 85)`);

      node.tags.forEach((tag: string, i: number) => {
        const tagGroup = tags.append('g')
          .attr('transform', `translate(${i * 80}, 0)`);

        tagGroup.append('rect')
          .attr('rx', 12)
          .attr('ry', 12)
          .attr('width', 75)
          .attr('height', 24)
          .attr('fill', '#f1f5f9');

        tagGroup.append('text')
          .attr('x', 37.5)
          .attr('y', 16)
          .attr('text-anchor', 'middle')
          .attr('font-size', '11px')
          .attr('fill', 'green')
          .text(tag);
      });

      // Hover actions
      const actionsGroup = g.append('g')
        .attr('class', 'node-actions')
        .attr('transform', `translate(${node.width - 120}, 16)`)
        .style('opacity', 0);

      // Upstream assets button
      actionsGroup.append('rect')
        .attr('width', 32)
        .attr('height', 32)
        .attr('rx', 6)
        .attr('fill', '#f8fafc')
        .attr('cursor', 'pointer')
        .on('click', () => {
          console.log('Show upstream assets for:', node.id);
        });

      // Downstream assets button
      actionsGroup.append('rect')
        .attr('x', 40)
        .attr('width', 32)
        .attr('height', 32)
        .attr('rx', 6)
        .attr('fill', '#f8fafc')
        .attr('cursor', 'pointer')
        .on('click', () => {
          console.log('Show downstream assets for:', node.id);
        });

      // Details button
      actionsGroup.append('rect')
        .attr('x', 80)
        .attr('width', 32)
        .attr('height', 32)
        .attr('rx', 6)
        .attr('fill', '#f8fafc')
        .attr('cursor', 'pointer')
        .on('click', () => {
          setSelectedNode(node);
        });
    });

    // Add hover effects
    nodes
      .on('mouseenter', function(event, v) {
        const node = graph.node(v);
        d3.select(this).select('.node-actions')
          .transition()
          .duration(200)
          .style('opacity', 1);
        setHoveredNode(node);
      })
      .on('mouseleave', function() {
        d3.select(this).select('.node-actions')
          .transition()
          .duration(200)
          .style('opacity', 0);
        setHoveredNode(null);
      });

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
        setTransform(event.transform);
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
  }, [assetId]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{assetId} - Lineage</h2>
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
        </div>

        {/* Node Details Modal */}
        {selectedNode && (
          <NodeDetails
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </div>
    </div>
  );
};