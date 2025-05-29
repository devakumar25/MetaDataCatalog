import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { AggregateDetails } from '../details/AggregateDetails';
import { LineageView } from '../lineage/LineageView';

interface AggregateData {
  id: string;
  name: string;
  expression: string;
  returnType: string;
  tables: string[];
  aggregateType: 'SUM' | 'AVG' | 'MIN' | 'MAX' | 'COUNT' | 'STD';
  usageCount: number;
  lastAccessed: string;
  tags: string[];
}

// Mock data for aggregates
const mockAggregates: AggregateData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `aggregate-${i + 1}`,
  name: [
    'Total Revenue',
    'Average Order Value',
    'Customer Count',
    'Product Sales',
    'Daily Active Users',
    'Conversion Rate',
    'Churn Rate',
    'Monthly Recurring Revenue',
    'Customer Lifetime Value',
    'Net Promoter Score'
  ][Math.floor(Math.random() * 10)],
  expression: [
    'SUM(order_amount)',
    'AVG(order_value)',
    'COUNT(DISTINCT customer_id)',
    'SUM(quantity * price)',
    'COUNT(DISTINCT user_id)',
    'MIN(active_users / total_users)',
    'MAX(churned_users / total_users)',
    'SUM(subscription_amount)',
    'AVG(customer_value)',
    'AVG(score)'
  ][Math.floor(Math.random() * 10)],
  returnType: ['decimal', 'integer', 'percentage'][Math.floor(Math.random() * 3)],
  tables: [
    ['orders'],
    ['customers', 'orders'],
    ['products', 'sales'],
    ['users', 'events'],
    ['subscriptions']
  ][Math.floor(Math.random() * 5)],
  aggregateType: [
    'SUM', 'AVG', 'MIN', 'MAX', 'COUNT', 'STD'
  ][Math.floor(Math.random() * 6)] as AggregateData['aggregateType'],
  usageCount: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  tags: [
    ...(Math.random() > 0.7 ? ['multi-table'] : ['single-table']),
    ...(Math.random() > 0.8 ? ['no-dependents'] : []),
  ]
}));

interface Column {
  key: keyof AggregateData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof AggregateData;
  direction: 'asc' | 'desc';
} | null;

export const AggregatesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
  const [showLineage, setShowLineage] = useState(false);
  const [assetName, setAssetName] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Aggregate Name', visible: true, sortable: true },
    { key: 'expression', label: 'Expression', visible: true, sortable: true },
    { key: 'returnType', label: 'Return Type', visible: true, sortable: true },
    { key: 'tables', label: 'Source Tables', visible: true, sortable: true },
    { key: 'aggregateType', label: 'Type', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockAggregates.reduce((acc: Record<string, number>, aggregate) => {
    aggregate.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof AggregateData) => {
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

  const getSortedAggregates = (aggregates: AggregateData[]) => {
    if (!sortConfig) return aggregates;

    return [...aggregates].sort((a, b) => {
      if (sortConfig.key === 'window') {
        const aWindow = a.window.type;
        const bWindow = b.window.type;
        return sortConfig.direction === 'asc'
          ? aWindow.localeCompare(bWindow)
          : bWindow.localeCompare(aWindow);
      }

      if (Array.isArray(a[sortConfig.key]) && Array.isArray(b[sortConfig.key])) {
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key].length - b[sortConfig.key].length
          : b[sortConfig.key].length - a[sortConfig.key].length;
      }

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

  const filteredAndSortedAggregates = useMemo(() => {
    const filtered = mockAggregates.filter(aggregate => {
      const matchesSearch = 
        aggregate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aggregate.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        aggregate.tables.some(table => table.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => aggregate.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedAggregates(filtered);
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

  const getAggregateTypeColor = (type: AggregateData['aggregateType']) => {
    switch (type) {
      case 'SUM':
        return 'bg-blue-100 text-blue-800';
      case 'AVG':
        return 'bg-green-100 text-green-800';
      case 'MIN':
        return 'bg-yellow-100 text-yellow-800';
      case 'MAX':
        return 'bg-orange-100 text-orange-800';
      case 'COUNT':
        return 'bg-purple-100 text-purple-800';
      case 'STD':
        return 'bg-pink-100 text-pink-800';
    }
  };

  const getWindowTypeColor = (type: AggregateData['window']['type']) => {
    switch (type) {
      case 'None':
        return 'bg-gray-100 text-gray-800';
      case 'Rolling':
        return 'bg-blue-100 text-blue-800';
      case 'Expanding':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (aggregateId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', aggregateId);
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
                placeholder="Search aggregates..."
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
                    onClick={() => column.sortable && handleSort(column.key as keyof AggregateData)}
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
              {filteredAndSortedAggregates.map((aggregate) => (
                <tr key={aggregate.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.Calculator className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {aggregate.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {aggregate.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'multi-table' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${tag === 'no-dependents' ? 'bg-stone-100 text-stone-800' : ''}
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
                      case 'expression':
                        return (
                          <td key={col.key} className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-mono">
                              {aggregate.expression}
                            </div>
                          </td>
                        );
                      case 'returnType':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{aggregate.returnType}</div>
                          </td>
                        );
                      case 'tables':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {aggregate.tables.map((table, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {table}
                                </span>
                              ))}
                            </div>
                          </td>
                        );
                      case 'aggregateType':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAggregateTypeColor(aggregate.aggregateType)}`}>
                              {aggregate.aggregateType}
                            </span>
                          </td>
                        );
                      case 'window':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getWindowTypeColor(aggregate.window.type)}`}>
                                {aggregate.window.type}
                              </span>
                              {aggregate.window.period && (
                                <div className="text-xs text-gray-500">
                                  Period: {aggregate.window.period}
                                </div>
                              )}
                              {aggregate.window.offset && (
                                <div className="text-xs text-gray-500">
                                  Offset: {aggregate.window.offset}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      case 'isCached':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              aggregate.isCached 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {aggregate.isCached ? 'Yes' : 'No'}
                            </span>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {aggregate.usageCount}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(aggregate.lastAccessed)}
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
    setAssetName(aggregate.name);
}}                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: aggregate.id,
                                    name: aggregate.name,
                                    type: 'Aggregate Formulas',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: aggregate.tables.length,
                                    downstreamAssetsCount: aggregate.usageCount,
                                    tags: aggregate.tags,
                                    icon: 'calculator'
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
        <AggregateDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Aggregate Formulas', selectedAsset.name, 'Details']}
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
