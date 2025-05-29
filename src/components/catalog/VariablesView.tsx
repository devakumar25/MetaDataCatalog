
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { VariableDetails } from '../details/VariableDetails';
import { LineageView } from '../lineage/LineageView';

interface VariableData {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'list' | 'object';
  defaultValue: string;
  usageCount: number;
  lastAccessed: string;
  tags: string[];
}

// Mock data for variables
const mockVariables: VariableData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `variable-${i + 1}`,
  name: [
    'Selected Date Range',
    'Product Categories',
    'Region Filter',
    'Department List',
    'Status Options',
    'Currency Code',
    'User Role',
    'Time Period',
    'Customer Segment',
    'Report Type'
  ][Math.floor(Math.random() * 10)],
  type: [
    'string',
    'range',
    'list',
    'string',
    'range',
    'list',
  ][Math.floor(Math.random() * 6)] as VariableData['type'],
  defaultValue: [
    '["Electronics", "Clothing", "Books"]',
    'Last 30 Days',
    'North America',
    'true',
    '2024-01-01',
    'USD'
  ][Math.floor(Math.random() * 6)],
  usageCount: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  tags: [

  ]
}));

interface Column {
  key: keyof VariableData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof VariableData;
  direction: 'asc' | 'desc';
} | null;

export const VariablesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
     const [showLineage, setShowLineage] = useState(false);
   const [assetName, setAssetName] = useState<string>('');


  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Variable Name', visible: true, sortable: true },
    { key: 'type', label: 'Type', visible: true, sortable: true },
    { key: 'defaultValue', label: 'Default Value', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockVariables.reduce((acc: Record<string, number>, variable) => {
    variable.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof VariableData) => {
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

  const getSortedVariables = (variables: VariableData[]) => {
    if (!sortConfig) return variables;

    return [...variables].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortConfig.direction === 'asc'
          ? (aValue === bValue ? 0 : aValue ? 1 : -1)
          : (aValue === bValue ? 0 : aValue ? -1 : 1);
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

  const filteredAndSortedVariables = useMemo(() => {
    const filtered = mockVariables.filter(variable => {
      const matchesSearch = 
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.defaultValue.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => variable.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedVariables(filtered);
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

  const getTypeIcon = (type: VariableData['type']) => {
    switch (type) {
      case 'string':
        return <Icons.Type className="w-4 h-4" />;
      case 'ss':
        return <Icons.Hash className="w-4 h-4" />;
      case 'boolean':
        return <Icons.ToggleLeft className="w-4 h-4" />;
      case 'date':
        return <Icons.Calendar className="w-4 h-4" />;
      case 'list':
        return <Icons.List className="w-4 h-4" />;
      case 'range':
        return <Icons.Box className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: VariableData['type']) => {
    switch (type) {
      case 'string':
        return 'bg-blue-100 text-blue-800';
      case 'number':
        return 'bg-green-100 text-green-800';
      case 'boolean':
        return 'bg-purple-100 text-purple-800';
      case 'date':
        return 'bg-yellow-100 text-yellow-800';
      case 'list':
        return 'bg-orange-100 text-orange-800';
      case 'object':
        return 'bg-pink-100 text-pink-800';
    }
  };

  const getScopeColor = (scope: VariableData['scope']) => {
    switch (scope) {
      case 'global':
        return 'bg-purple-100 text-purple-800';
      case 'report':
        return 'bg-blue-100 text-blue-800';
      case 'dashboard':
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (variableId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', variableId);
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
                placeholder="Search variables..."
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
                    onClick={() => column.sortable && handleSort(column.key as keyof VariableData)}
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
              {filteredAndSortedVariables.map((variable) => (
                <tr key={variable.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.Variable className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {variable.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {variable.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'user-input' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${tag === 'system-managed' ? 'bg-purple-100 text-purple-800' : ''}
                                        ${tag === 'deprecated' ? 'bg-red-100 text-red-800' : ''}
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
                      case 'type':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(variable.type)}`}>
                              {getTypeIcon(variable.type)}
                              <span>{variable.type}</span>
                            </span>
                          </td>
                        );
                      case 'defaultValue':
                        return (
                          <td key={col.key} className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-mono">
                              {variable.defaultValue}
                            </div>
                          </td>
                        );
                      case 'scope':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getScopeColor(variable.scope)}`}>
                              {variable.scope}
                            </span>
                          </td>
                        );
                      case 'isRequired':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              variable.isRequired 
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {variable.isRequired ? 'Required' : 'Optional'}
                            </span>
                          </td>
                        );
                      case 'validation':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {variable.validation || '-'}
                            </div>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {variable.usageCount}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(variable.lastAccessed)}
                            </div>
                          </td>
                        );
                      case 'actions':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                 onClick={() => {
    setShowLineage(true);
    setAssetName(variable.name);
}}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: variable.id,
                                    name: variable.name,
                                    type: 'Variables',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: 1,
                                    downstreamAssetsCount: variable.usageCount,
                                    tags: variable.tags,
                                    icon: 'variable'
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
        <VariableDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Variables', selectedAsset.name, 'Details']}
        />
      )}

      {showLineage && (
    <LineageView
      assetId={assetName}
      onClose={() => setShowLineage(false)}
    />
)}
    </div>
  );
};
