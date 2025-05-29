import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';

interface DataCacheTableDetailsProps {
  asset: SearchAsset;
  onClose: () => void;
}

interface CacheTableDetails {
  name: string;
  baseTableName: string;
  baseTableRows: number;
  cacheTableRows: number;
  dimensions: Array<{
    name: string;
    dataType: string;
    excluded: boolean;
  }>;
  aggregates: Array<{
    name: string;
    dataType: string;
    function: string;
    excluded: boolean;
  }>;
  syncHistory: Array<{
    timestamp: string;
    status: 'success' | 'failed';
    duration: string;
    rowsProcessed: number;
  }>;
}

// Mock data for the cache table details
const mockCacheTableDetails: CacheTableDetails = {
  name: 'Daily Sales Cache',
  baseTableName: 'sales_transactions',
  baseTableRows: 1250000,
  cacheTableRows: 365,
  dimensions: [
    { name: 'date', dataType: 'DATE', excluded: false },
    { name: 'product_category', dataType: 'VARCHAR(100)', excluded: false },
    { name: 'region', dataType: 'VARCHAR(50)', excluded: true },
    { name: 'customer_segment', dataType: 'VARCHAR(50)', excluded: false }
  ],
  aggregates: [
    { name: 'total_sales', dataType: 'DECIMAL(15,2)', function: 'SUM(amount)', excluded: false },
    { name: 'order_count', dataType: 'INTEGER', function: 'COUNT(order_id)', excluded: false },
    { name: 'avg_order_value', dataType: 'DECIMAL(10,2)', function: 'AVG(amount)', excluded: true },
    { name: 'min_order_value', dataType: 'DECIMAL(10,2)', function: 'MIN(amount)', excluded: false },
    { name: 'max_order_value', dataType: 'DECIMAL(10,2)', function: 'MAX(amount)', excluded: false }
  ],
  syncHistory: Array.from({ length: 10 }, (_, i) => ({
    timestamp: new Date(Date.now() - i * 86400000).toISOString(),
    status: Math.random() > 0.2 ? 'success' : 'failed',
    duration: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 60)}s`,
    rowsProcessed: Math.floor(Math.random() * 100000) + 1000
  }))
};

export const DataCacheTableDetails: React.FC<DataCacheTableDetailsProps> = ({ asset, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sync-history' >('overview');

  const tabs = [
    { id: 'overview', label: 'Columns', icon: Icons.Layout },
    { id: 'sync-history', label: 'Sync History', icon: Icons.History },
  ];

  const handleExcludeColumn = (type: 'dimension' | 'aggregate', name: string) => {
    console.log(`Excluding ${type} column: ${name}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg w-[90vw] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icons.Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{mockCacheTableDetails.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">Data Cache Table</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Base Table</p>
            <p className="text-2xl font-semibold mt-1">{mockCacheTableDetails.baseTableName}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Base Table Rows</p>
            <p className="text-2xl font-semibold mt-1">{mockCacheTableDetails.baseTableRows.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Cache Table Rows</p>
            <p className="text-2xl font-semibold mt-1">{mockCacheTableDetails.cacheTableRows.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500">Compression Ratio</p>
            <p className="text-2xl font-semibold mt-1">
              {(mockCacheTableDetails.baseTableRows / mockCacheTableDetails.cacheTableRows).toFixed(2)}x
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 border-b border-gray-200">
          <div className="flex items-start space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`
                  flex items-center space-x-1 px-3 py-2 text-sm font-medium border-b-2 
                  transition-colors relative -mb-px whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Dimensions</h3>
                  <div className="space-y-2">
                    {mockCacheTableDetails.dimensions.map((dim) => (
                      <div
                        key={dim.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dim.name}</p>
                          <p className="text-xs text-gray-500">{dim.dataType}</p>
                        </div>
                        <button
                          onClick={() => handleExcludeColumn('dimension', dim.name)}
                          className={`
                            px-3 py-1.5 text-xs font-medium rounded-md
                            ${dim.excluded
                              ? 'bg-gray-100 text-gray-600'
                              : 'text-red-600 hover:bg-red-50'
                            }
                          `}
                        >
                          {dim.excluded ? 'Excluded' : 'Exclude from Cache'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Aggregates</h3>
                  <div className="space-y-2">
                    {mockCacheTableDetails.aggregates.map((agg) => (
                      <div
                        key={agg.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">{agg.name}</p>
                          <p className="text-xs text-gray-500">{agg.function}</p>
                          <p className="text-xs text-gray-500">{agg.dataType}</p>
                        </div>
                        <button
                          onClick={() => handleExcludeColumn('aggregate', agg.name)}
                          className={`
                            px-3 py-1.5 text-xs font-medium rounded-md
                            ${agg.excluded
                              ? 'bg-gray-100 text-gray-600'
                              : 'text-red-600 hover:bg-red-50'
                            }
                          `}
                        >
                          {agg.excluded ? 'Excluded' : 'Exclude from Cache'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sync-history' && (
              <div>
                <h3 className="text-lg font-medium mb-4">Sync History</h3>
                <div className="space-y-3">
                  {mockCacheTableDetails.syncHistory.map((sync, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        sync.status === 'success' 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(sync.timestamp).toLocaleString()}
                            </p>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              sync.status === 'success'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {sync.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Duration: {sync.duration}</span>
                            <span>{sync.rowsProcessed.toLocaleString()} rows processed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};