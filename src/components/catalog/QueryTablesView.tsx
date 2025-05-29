import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { TableDetails } from '../details/TableDetails';
import { LineageView } from '../lineage/LineageView';

interface QueryTableData {
  id: string;
  name: string;
  level: 'L1' | 'L2';
  rowCount: number;
  readEngine1Sync: {
    status: 'success' | 'failed';
    lastSync: string;
    timeTaken: string;
  };
  readEngine2Sync: {
    status: 'success' | 'failed';
    lastSync: string;
    timeTaken: string;
  };
  downstreamAssetsCount: number;
  tags: string[];
}

// Mock data for query tables
const mockQueryTables: QueryTableData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `query-table-${i + 1}`,
  name: [
    'Daily Sales Summary',
    'Customer Segmentation',
    'Product Performance',
    'Marketing ROI Analysis',
    'Inventory Metrics',
    'Revenue Analytics',
    'User Engagement Stats',
    'Campaign Performance',
    'Support Metrics',
    'Financial KPIs'
  ][Math.floor(Math.random() * 10)],
  level: ['L1', 'L2'][Math.floor(Math.random() * 2)] as 'L1' | 'L2',
  rowCount: Math.floor(Math.random() * 1000000) + 1000,
  readEngine1Sync: {
    status: Math.random() > 0.2 ? 'success' : 'failed',
    lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    timeTaken: `${Math.floor(Math.random() * 30) + 1}m ${Math.floor(Math.random() * 60)}s`
  },
  readEngine2Sync: {
    status: Math.random() > 0.2 ? 'success' : 'failed',
    lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    timeTaken: `${Math.floor(Math.random() * 30) + 1}m ${Math.floor(Math.random() * 60)}s`
  },
  downstreamAssetsCount: Math.floor(Math.random() * 100),
  tags: [
    ...(Math.random() > 0.7 ? ['sync-failed'] : []),
    ...(Math.random() > 0.8 ? ['long-running'] : [])
  ]
}));

interface Column {
  key: keyof QueryTableData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof QueryTableData;
  direction: 'asc' | 'desc';
} | null;

export const QueryTablesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
     const [showLineage, setShowLineage] = useState(false);
   const [assetName, setAssetName] = useState<string>('');


  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Query Table Name', visible: true, sortable: true },
    { key: 'level', label: 'Level', visible: true, sortable: true },
    { key: 'rowCount', label: 'Row Count', visible: true, sortable: true },
    { key: 'readEngine1Sync', label: 'Compute Engine 1', visible: true, sortable: true },
    { key: 'readEngine2Sync', label: 'Compute Engine 2', visible: true, sortable: true },
    { key: 'downstreamAssetsCount', label: 'Downstream Assets', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = {
    'sync-failed': mockQueryTables.filter(t => t.tags.includes('sync-failed')).length,
    'long-running': mockQueryTables.filter(t => t.tags.includes('long-running')).length
  };

  const handleSort = (key: keyof QueryTableData) => {
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

  const getSortedTables = (tables: QueryTableData[]) => {
    if (!sortConfig) return tables;

    return [...tables].sort((a, b) => {
      if (sortConfig.key === 'readEngine1Sync' || sortConfig.key === 'readEngine2Sync') {
        // Sort by sync status first, then by last sync time
        const aSync = a[sortConfig.key];
        const bSync = b[sortConfig.key];
        
        if (aSync.status !== bSync.status) {
          return sortConfig.direction === 'asc'
            ? aSync.status.localeCompare(bSync.status)
            : bSync.status.localeCompare(aSync.status);
        }
        
        const aDate = new Date(aSync.lastSync).getTime();
        const bDate = new Date(bSync.lastSync).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

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

      return 0;
    });
  };

  const filteredAndSortedTables = useMemo(() => {
    const filtered = mockQueryTables.filter(table => {
      const matchesSearch = table.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => table.tags.includes(tag));
      return matchesSearch && matchesTags;
    });

    return getSortedTables(filtered);
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

  const getSyncStatusColor = (status: 'success' | 'failed') => {
    return status === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  const getSyncStatusIcon = (status: 'success' | 'failed') => {
    return status === 'success' ? 
      <Icons.CheckCircle className="w-4 h-4" /> : 
      <Icons.XCircle className="w-4 h-4" />;
  };

  const getLevelColor = (level: 'L1' | 'L2') => {
    switch (level) {
      case 'L1':
        return 'bg-blue-100 text-blue-800';
      case 'L2':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (tableId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', tableId);
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
                placeholder="Search query tables..."
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

      <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Tables</div>
            <div className="text-2xl font-semibold">24</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Rows</div>
            <div className="text-2xl font-semibold">1,01,42,332 </div>
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
                    onClick={() => column.sortable && handleSort(column.key as keyof QueryTableData)}
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
              {filteredAndSortedTables.map((table) => (
                <tr key={table.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((column) => {
                    switch (column.key) {
                      case 'name':
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.TableProperties className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {table.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {table.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'sync-failed' ? 'bg-red-100 text-red-800' : ''}
                                        ${tag === 'long-running' ? 'bg-yellow-100 text-yellow-800' : ''}
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
                      case 'level':
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(table.level)}`}>
                              {table.level}
                            </span>
                          </td>
                        );
                      case 'rowCount':
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {table.rowCount.toLocaleString()}
                            </div>
                          </td>
                        );
                      case 'readEngine1Sync':
                      case 'readEngine2Sync':
                        const syncData = table[column.key];
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className={`p-1 rounded-full ${getSyncStatusColor(syncData.status)}`}>
                                {getSyncStatusIcon(syncData.status)}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">
                                  {formatDate(syncData.lastSync)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Time taken: {syncData.timeTaken}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      case 'downstreamAssetsCount':
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {table.downstreamAssetsCount}
                            </div>
                          </td>
                        );
                      case 'actions':
                        return (
                          <td key={column.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
 onClick={() => {
    setShowLineage(true);
    setAssetName(table.name);
}}                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: table.id,
                                    name: table.name,
                                    type: 'Query Tables',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: 1,
                                    downstreamAssetsCount: table.downstreamAssetsCount,
                                    tags: table.tags,
                                    icon: 'table-properties'
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
        <TableDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Query Tables', selectedAsset.name, 'Details']}
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