import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { DataCacheTableDetails } from '../details/DataCacheTableDetails';

interface CacheTableData {
  id: string;
  name: string;
  baseTableName: string;
  cacheRowCount: number;
  baseRowCount: number;
  lastComputed: string;
  computeTime: string;
  dimensions: Array<{
    name: string;
    type: string;
  }>;
  aggregates: Array<{
    column: string;
    operation: 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX';
  }>;
}

// Mock data for cache tables
const mockCacheTables: CacheTableData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `cache-${i + 1}`,
  name: [
    'Daily Sales Cache',
    'Customer Metrics Cache',
    'Product Performance Cache',
    'Order Analytics Cache',
    'Inventory Summary Cache',
    'Revenue Stats Cache',
    'User Activity Cache',
    'Campaign Results Cache',
    'Support Metrics Cache',
    'Financial KPIs Cache'
  ][Math.floor(Math.random() * 10)],
  baseTableName: [
    'sales',
    'customers',
    'products',
    'orders',
    'inventory'
  ][Math.floor(Math.random() * 5)],
  cacheRowCount: Math.floor(Math.random() * 100000) + 1000,
  baseRowCount: Math.floor(Math.random() * 1000000) + 10000,
  lastComputed: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
  readEngine1Sync: {
    status: 'success', // Math.random() > 0.2 ? 'success' : 'failed',
    lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    timeTaken: `${Math.floor(Math.random() * 30) + 1}m ${Math.floor(Math.random() * 60)}s`
  },
  readEngine2Sync: {
    status: 'success',  // Math.random() > 0.2 ? 'success' : 'failed',
    lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    timeTaken: `${Math.floor(Math.random() * 30) + 1}m ${Math.floor(Math.random() * 60)}s`
  },
  computeTime: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`,
  dimensions: [
    { name: 'date', type: 'DATE' },
    { name: 'product_category', type: 'STRING' },
    { name: 'region', type: 'STRING' },
    { name: 'customer_segment', type: 'STRING' }
  ].slice(0, Math.floor(Math.random() * 3) + 2),
  aggregates: [
    { column: 'amount', operation: 'SUM' },
    { column: 'quantity', operation: 'COUNT' },
    { column: 'price', operation: 'AVG' },
    { column: 'discount', operation: 'MIN' },
    { column: 'rating', operation: 'MAX' }
  ].slice(0, Math.floor(Math.random() * 3) + 2) as CacheTableData['aggregates']
}));

export const DataCacheTablesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);

  const filteredTables = useMemo(() => 
    mockCacheTables.filter(table =>
      table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      table.baseTableName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  );

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getAggregateColor = (operation: string) => {
    switch (operation) {
      case 'SUM':
        return 'bg-blue-100 text-blue-800';
      case 'AVG':
        return 'bg-green-100 text-green-800';
      case 'COUNT':
        return 'bg-purple-100 text-purple-800';
      case 'MIN':
        return 'bg-yellow-100 text-yellow-800';
      case 'MAX':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExcludeColumn = (tableId: string, columnName: string, type: 'dimension' | 'aggregate') => {
    console.log(`Exclude ${type} column "${columnName}" from cache table ${tableId}`);
  };

    const getSyncStatusColor = (status: 'success' | 'failed') => {
    return status === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };
  
    const getSyncStatusIcon = (status: 'success' | 'failed') => {
    return status === 'success' ? 
      <Icons.CheckCircle className="w-4 h-4" /> : 
      <Icons.XCircle className="w-4 h-4" />;
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowDetails = (table: CacheTableData) => {
    const searchAsset: SearchAsset = {
      id: table.id,
      name: table.name,
      type: 'Data Cache Tables',
      createdAt: new Date().toISOString(),
      createdBy: 'System',
      sharedUsersCount: 0,
      dataSourcesCount: 1,
      downstreamAssetsCount: 0,
      tags: [],
      icon: 'database'
    };
    setSelectedAsset(searchAsset);
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cache tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Cache Tables</div>
            <div className="text-2xl font-semibold">32</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Rows</div>
            <div className="text-2xl font-semibold">1,20,42,332 </div>
          </div>
        </div>
      
      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/*<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"></th>*/}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cache Table</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Table</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cached Rows</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Table Rows</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compute Engine 1</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compute Engine 2</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTables.map((table) => (
              <React.Fragment key={table.id}>
                <tr className="hover:bg-gray-50">
                  {/*<td className="px-6 py-4">
                    <button
                      onClick={() => toggleRow(table.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Icons.ChevronRight 
                        className={`w-4 h-4 transform transition-transform ${
                          expandedRows[table.id] ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  </td>*/}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{table.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{table.baseTableName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(table.cacheRowCount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatNumber(table.baseRowCount)}</div>
                  </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className={`p-1 rounded-full ${getSyncStatusColor(table.readEngine1Sync.status)}`}>
                                {getSyncStatusIcon(table.readEngine1Sync.status)}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">
                                  {formatDate(table.readEngine1Sync.lastSync)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Time taken: {table.readEngine1Sync.timeTaken}
                                </span>
                              </div>
                            </div>
                          </td>
                  
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className={`p-1 rounded-full ${getSyncStatusColor(table.readEngine2Sync.status)}`}>
                                {getSyncStatusIcon(table.readEngine2Sync.status)}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-sm text-gray-500">
                                  {formatDate(table.readEngine2Sync.lastSync)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Time taken: {table.readEngine2Sync.timeTaken}
                                </span>
                              </div>
                            </div>
                          </td>

                 <td  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-center space-x-2">
                           
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: 'abc123',
                                    name: table.name,
                                    type: 'Dashboards',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System Generated',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: 0,
                                    downstreamAssetsCount: 0,
                                    tags: '',
                                    icon: 'database'
                                  };
                                  setSelectedAsset(searchAsset);
                                }}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Info className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                </tr>
                {expandedRows[table.id] && (
                  <tr className="bg-gray-50">
                    <td colSpan={8} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Dimensions */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Dimensions</h4>
                          <div className="space-y-2">
                            {table.dimensions.map((dim, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900">{dim.name}</span>
                                  <span className="text-xs text-gray-500">{dim.type}</span>
                                </div>
                                <button
                                  onClick={() => handleExcludeColumn(table.id, dim.name, 'dimension')}
                                  className="text-xs font-medium text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                >
                                  Exclude from Cache
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Aggregates */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Aggregates</h4>
                          <div className="space-y-2">
                            {table.aggregates.map((agg, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-2 rounded border border-gray-200"
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-900">{agg.column}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAggregateColor(agg.operation)}`}>
                                    {agg.operation}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleExcludeColumn(table.id, agg.column, 'aggregate')}
                                  className="text-xs font-medium text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                >
                                  Exclude from Cache
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAsset && (
        <DataCacheTableDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </div>
  );
};