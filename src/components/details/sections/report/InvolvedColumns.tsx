import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Column {
  id: string;
  name: string;
  table: string;
  type: 'dimension' | 'aggregate' | 'filter';
  dataType: string;
  operation?: string;
  filterType?: 'user' | 'view';
  filterCondition?: string;
  description?: string;
}

export const InvolvedColumns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dimensions' | 'aggregates' | 'filters'>('dimensions');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock columns data
  const columns: Column[] = [
    // Dimensions
    {
      id: '1',
      name: 'customer_name',
      table: 'customers',
      type: 'dimension',
      dataType: 'string',
      description: 'Customer full name'
    },
    {
      id: '2',
      name: 'category',
      table: 'products',
      type: 'dimension',
      dataType: 'string',
      description: 'Product category'
    },
    {
      id: '3',
      name: 'order_month',
      table: 'orders',
      type: 'dimension',
      dataType: 'date',
      description: 'Order month'
    },
    // Aggregates
    {
      id: '4',
      name: 'total_orders',
      table: 'orders',
      type: 'aggregate',
      dataType: 'number',
      operation: 'COUNT(DISTINCT order_id)',
      description: 'Total number of orders'
    },
    {
      id: '5',
      name: 'total_amount',
      table: 'orders',
      type: 'aggregate',
      dataType: 'number',
      operation: 'SUM(amount)',
      description: 'Total order amount'
    },
    {
      id: '6',
      name: 'avg_order_value',
      table: 'orders',
      type: 'aggregate',
      dataType: 'number',
      operation: 'AVG(amount)',
      description: 'Average order value'
    },
    // Filters
    {
      id: '7',
      name: 'status',
      table: 'orders',
      type: 'filter',
      dataType: 'string',
      filterType: 'view',
      filterCondition: "status = 'completed'",
      description: 'Order status filter'
    },
    {
      id: '8',
      name: 'order_date',
      table: 'orders',
      type: 'filter',
      dataType: 'date',
      filterType: 'user',
      filterCondition: 'Last 12 months',
      description: 'Order date range'
    }
  ];

  const filteredColumns = columns.filter(column => {
    const matchesSearch = column.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         column.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         column.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = column.type === activeTab.slice(0, -1); // Remove 's' from tab name
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (column: Column) => {
    switch (column.type) {
      case 'dimension':
        return <Icons.Box className="w-4 h-4" />;
      case 'aggregate':
        return <Icons.Calculator className="w-4 h-4" />;
      case 'filter':
        return <Icons.Filter className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('dimensions')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'dimensions'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Dimensions
          </button>
          <button
            onClick={() => setActiveTab('aggregates')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'aggregates'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Aggregates
          </button>
          <button
            onClick={() => setActiveTab('filters')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'filters'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Filters
          </button>
        </div>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Columns List */}
      <div className="space-y-3">
        {filteredColumns.map(column => (
          <div
            key={column.id}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getTypeIcon(column)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">{column.name}</h4>
                    <span className="text-sm text-gray-500">({column.table})</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{column.dataType}</span>
                    {column.description && (
                      <span className="text-xs text-gray-500">- {column.description}</span>
                    )}
                  </div>
                  {column.operation && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-sm font-mono text-gray-700">
                      {column.operation}
                    </div>
                  )}
                  {column.filterCondition && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`
                        px-2 py-0.5 text-xs font-medium rounded-full
                        ${column.filterType === 'user' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
                      `}>
                        {column.filterType === 'user' ? 'User Filter' : 'View Filter'}
                      </span>
                      <span className="text-sm text-gray-600">{column.filterCondition}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};