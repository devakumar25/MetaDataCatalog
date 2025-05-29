
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { RelationshipDetails } from '../details/RelationshipDetails';
import { LineageView } from '../lineage/LineageView';

interface RelationData {
  id: string;
  name: string;
  sourceTable: string;
  sourceColumn: string;
  targetTable: string;
  targetColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  status: 'active' | 'inactive';
  usageCount: number;
  lastAccessed: string;
  tags: string[];
}

// Mock data for relationships
const mockRelations: RelationData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `relation-${i + 1}`,
  name: [
    'Customer Orders',
    'Order Products',
    'Product Categories',
    'Customer Addresses',
    'Employee Departments',
    'Order Shipments',
    'Product Suppliers',
    'Customer Support Tickets',
    'Employee Managers',
    'Order Payments'
  ][Math.floor(Math.random() * 10)],
  sourceTable: [
    'customers',
    'orders',
    'products',
    'employees',
    'departments'
  ][Math.floor(Math.random() * 5)],
  sourceColumn: [
    'id',
    'customer_id',
    'product_id',
    'employee_id',
    'department_id'
  ][Math.floor(Math.random() * 5)],
  targetTable: [
    'orders',
    'products',
    'categories',
    'addresses',
    'departments'
  ][Math.floor(Math.random() * 5)],
  targetColumn: [
    'id',
    'customer_id',
    'product_id',
    'employee_id',
    'department_id'
  ][Math.floor(Math.random() * 5)],
  type: [
    'one-to-one',
    'one-to-many',
    'many-to-one',
    'many-to-many'
  ][Math.floor(Math.random() * 4)] as RelationData['type'],
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  usageCount: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  tags: [
    ...(Math.random() > 0.7 ? ['no-dependents'] : []),
    ...(Math.random() > 0.8 ? ['inactive'] : [])
  ]
}));

interface Column {
  key: keyof RelationData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof RelationData;
  direction: 'asc' | 'desc';
} | null;

export const RelationshipPlainView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
     const [showLineage, setShowLineage] = useState(false);
   const [assetName, setAssetName] = useState<string>('');


  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Relationship Name', visible: true, sortable: true },
    { key: 'sourceTable', label: 'Source Table', visible: true, sortable: true },
    { key: 'sourceColumn', label: 'Source Column', visible: true, sortable: true },
    { key: 'targetTable', label: 'Target Table', visible: true, sortable: true },
    { key: 'targetColumn', label: 'Target Column', visible: true, sortable: true },
    { key: 'type', label: 'Type', visible: true, sortable: true },
    { key: 'status', label: 'Status', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockRelations.reduce((acc: Record<string, number>, relation) => {
    relation.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof RelationData) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortedRelations = (relations: RelationData[]) => {
    if (!sortConfig) return relations;

    return [...relations].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (sortConfig.key === 'lastAccessed') {
        const aDate = new Date(a.lastAccessed).getTime();
        const bDate = new Date(b.lastAccessed).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      return 0;
    });
  };

  const filteredAndSortedRelations = useMemo(() => {
    const filtered = mockRelations.filter(relation => {
      const matchesSearch = 
        relation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        relation.sourceTable.toLowerCase().includes(searchQuery.toLowerCase()) ||
        relation.targetTable.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => relation.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedRelations(filtered);
  }, [searchQuery, selectedTags, sortConfig]);

  const renderSortIcon = (column: Column) => {
    if (!column.sortable) return null;

    const isCurrentSort = sortConfig?.key === column.key;
    const direction = sortConfig?.direction;

    return (
      <span className="ml-2 inline-flex">
        {isCurrentSort ? (
          direction === 'asc' ? (
            <Icons.ArrowUp className="w-4 h-4" />
          ) : (
            <Icons.ArrowDown className="w-4 h-4" />
          )
        ) : (
          <Icons.ArrowUpDown className="w-4 h-4 text-gray-300" />
        )}
      </span>
    );
  };

  const getRelationTypeIcon = (type: RelationData['type']) => {
    switch (type) {
      case 'one-to-one':
        return <Icons.ArrowRightLeft className="w-4 h-4" />;
      case 'one-to-many':
        return <Icons.GitBranch className="w-4 h-4" />;
      case 'many-to-one':
        return <Icons.GitMerge className="w-4 h-4" />;
      case 'many-to-many':
        return <Icons.Network className="w-4 h-4" />;
    }
  };

  const getRelationTypeColor = (type: RelationData['type']) => {
    switch (type) {
      case 'one-to-one':
        return 'bg-blue-100 text-blue-800';
      case 'one-to-many':
        return 'bg-green-100 text-green-800';
      case 'many-to-one':
        return 'bg-purple-100 text-purple-800';
      case 'many-to-many':
        return 'bg-orange-100 text-orange-800';
    }
  };

  const getStatusColor = (status: 'active' | 'inactive') => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (relationId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', relationId);
  };

  return (
    <div className="p-4">
      {/* Header Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search relationships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              ref={(el) => {
                if (el && !columnSelectorAnchor) setColumnSelectorAnchor(el);
              }}
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center space-x-2">
                <Icons.Columns className="w-4 h-4" />
                <span>Show/Hide Columns</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev => 
                  prev.includes(tag) 
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${selectedTags.includes(tag)
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {tag.replace('-', ' ')} ({count})
            </button>
          ))}
        </div>

        {/* Column Selector Dropdown */}
        {showColumnSelector && columnSelectorAnchor && (
          <div 
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-64"
            style={{
              top: columnSelectorAnchor.getBoundingClientRect().bottom + 4,
              left: columnSelectorAnchor.getBoundingClientRect().left
            }}
          >
            <div className="p-2">
              {columns.map((column) => (
                <label
                  key={column.key}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={column.visible}
                    onChange={() => {
                      setColumns(columns.map(col => 
                        col.key === column.key 
                          ? { ...col, visible: !col.visible }
                          : col
                      ));
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.filter(col => col.visible).map((column) => (
                  <th
                    key={column.key}
                    className={`
                      px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    `}
                    onClick={() => column.sortable && handleSort(column.key as keyof RelationData)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedRelations.map((relation) => (
                <tr key={relation.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.GitMerge className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {relation.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {relation.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'no-dependents' ? 'bg-gray-100 text-gray-800' : ''}
                                        ${tag === 'inactive' ? 'bg-red-100 text-red-800' : ''}
                                      `}
                                    >
                                      {tag.replace('-', ' ')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'sourceTable':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{relation.sourceTable}</div>
                          </td>
                        );
                      case 'sourceColumn':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{relation.sourceColumn}</div>
                          </td>
                        );
                      case 'targetTable':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{relation.targetTable}</div>
                          </td>
                        );
                      case 'targetColumn':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{relation.targetColumn}</div>
                          </td>
                        );
                      case 'type':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRelationTypeColor(relation.type)}`}>
                              {getRelationTypeIcon(relation.type)}
                              <span>{relation.type.replace(/-/g, ' ')}</span>
                            </span>
                          </td>
                        );
                      case 'status':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(relation.status)}`}>
                              {relation.status}
                            </span>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {relation.usageCount}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(relation.lastAccessed)}
                            </div>
                          </td>
                        );
                      case 'actions':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              {/*<button
                                onClick={() => handleShowLineage(relation.id)}
                                className="text-gray-400 hover:text-blue-600"
                              >
                      
                                <Icons.Database className="w-5 h-5" />
                              </button>*/}
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: relation.id,
                                    name: relation.name,
                                    type: 'Relationships',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: 1,
                                    downstreamAssetsCount: relation.usageCount,
                                    tags: relation.tags,
                                    icon: 'git-merge'
                                  };
                                  setSelectedAsset(searchAsset);
                                }}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Info className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        );
                      default:
                        return null;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <RelationshipDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};
