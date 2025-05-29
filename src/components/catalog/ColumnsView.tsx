
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { ColumnDetails } from '../details/ColumnDetails';
import { LineageView } from '../lineage/LineageView';

interface ColumnData {
  id: string;
  name: string;
  table: string;
  dataType: string;
  nullable: boolean;
  defaultValue: string | null;
  description: string | null;
  usageCount: number;
  lastAccessed: string;
  tags: string[];
}

// Mock data for columns
const mockColumns: ColumnData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `column-${i + 1}`,
  name: [
    'customer_id',
    'email',
    'first_name',
    'last_name',
    'order_date',
    'amount',
    'status',
    'product_id',
    'category',
    'created_at'
  ][Math.floor(Math.random() * 10)],
  table: [
    'customers',
    'orders',
    'products',
    'transactions',
    'inventory'
  ][Math.floor(Math.random() * 5)],
  dataType: [
    'integer',
    'varchar(255)',
    'text',
    'timestamp',
    'decimal(10,2)',
    'boolean'
  ][Math.floor(Math.random() * 6)],
  nullable: Math.random() > 0.5,
  defaultValue: Math.random() > 0.7 ? 'NULL' : null,
  description: Math.random() > 0.3 ? 'Sample column description' : null,
  usageCount: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  tags: [
    ...(Math.random() > 0.7 ? ['pii'] : []),
    ...(Math.random() > 0.8 ? ['lookup'] : []),
    ...(Math.random() > 0.9 ? ['no dependents'] : [])
  ]
}));

interface Column {
  key: keyof ColumnData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof ColumnData;
  direction: 'asc' | 'desc';
} | null;

export const ColumnsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
  const [showLineage, setShowLineage] = useState(false);
  const [assetName, setAssetName] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Column Name', visible: true, sortable: true },
    { key: 'table', label: 'Table', visible: true, sortable: true },
    { key: 'dataType', label: 'Data Type', visible: true, sortable: true },
    { key: 'nullable', label: 'Nullable', visible: true, sortable: true },
    { key: 'defaultValue', label: 'Default Value', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockColumns.reduce((acc: Record<string, number>, column) => {
    column.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof ColumnData) => {
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

  const getSortedColumns = (columns: ColumnData[]) => {
    if (!sortConfig) return columns;

    return [...columns].sort((a, b) => {
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

  const filteredAndSortedColumns = useMemo(() => {
    const filtered = mockColumns.filter(column => {
      const matchesSearch = 
        column.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        column.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
        column.dataType.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => column.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedColumns(filtered);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (columnId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', columnId);
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
                placeholder="Search columns..."
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
                    onClick={() => column.sortable && handleSort(column.key as keyof ColumnData)}
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
              {filteredAndSortedColumns.map((column) => (
                <tr key={column.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.GitBranch className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {column.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {column.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'pii' ? 'bg-red-100 text-red-800' : ''}
                                        ${tag === 'lookup' ? 'bg-purple-100 text-purple-800' : ''}
                                        ${tag === 'no dependents' ? 'bg-yellow-100 text-yellow-800' : ''}
                                      `}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'table':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{column.table}</div>
                          </td>
                        );
                      case 'dataType':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{column.dataType}</div>
                          </td>
                        );
                      case 'nullable':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              column.nullable 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {column.nullable ? 'Yes' : 'No'}
                            </span>
                          </td>
                        );
                      case 'defaultValue':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {column.defaultValue || '-'}
                            </div>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {column.usageCount}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(column.lastAccessed)}
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
    setAssetName(column.name);
}}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: column.id,
                                    name: column.name,
                                    type: 'Columns',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: 1,
                                    downstreamAssetsCount: column.usageCount,
                                    tags: column.tags,
                                    icon: 'git-branch'
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
        <ColumnDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Columns', selectedAsset.name, 'Details']}
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
