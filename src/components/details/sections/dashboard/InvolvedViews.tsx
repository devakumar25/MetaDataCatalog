import React from 'react';
import * as Icons from 'lucide-react';

interface View {
  id: string;
  name: string;
  type: string;
  description: string;
  position: {
    row: number;
    col: number;
    width: number;
    height: number;
  };
  dataSources: string[];
  refreshInterval: string;
  lastRefreshed: string;
  status: 'active' | 'error' | 'loading';
  errorMessage?: string;
}

export const InvolvedViews: React.FC = () => {
  // Mock views data
  const views: View[] = [
    {
      id: '1',
      name: 'Revenue Trends',
      type: 'Line Chart',
      description: 'Monthly revenue trends with year-over-year comparison',
      position: { row: 1, col: 1, width: 2, height: 1 },
      dataSources: ['Sales Database', 'Financial Data'],
      refreshInterval: '15 minutes',
      lastRefreshed: '2024-03-14T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Customer Metrics',
      type: 'KPI Cards',
      description: 'Key customer metrics including acquisition and churn',
      position: { row: 1, col: 3, width: 1, height: 1 },
      dataSources: ['Customer Database'],
      refreshInterval: '30 minutes',
      lastRefreshed: '2024-03-14T10:15:00Z',
      status: 'active'
    },
    {
      id: '3',
      name: 'Product Performance',
      type: 'Bar Chart',
      description: 'Top performing products by revenue and units sold',
      position: { row: 2, col: 1, width: 1, height: 1 },
      dataSources: ['Product Database', 'Sales Database'],
      refreshInterval: '1 hour',
      lastRefreshed: '2024-03-14T10:00:00Z',
      status: 'error',
      errorMessage: 'Data source connection failed'
    }
  ];

  const getStatusColor = (status: View['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'loading':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusIcon = (status: View['status']) => {
    switch (status) {
      case 'active':
        return <Icons.CheckCircle className="w-4 h-4" />;
      case 'error':
        return <Icons.XCircle className="w-4 h-4" />;
      case 'loading':
        return <Icons.RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  const getViewTypeIcon = (type: string) => {
    switch (type) {
      case 'Line Chart':
        return <Icons.LineChart className="w-4 h-4" />;
      case 'Bar Chart':
        return <Icons.BarChart className="w-4 h-4" />;
      case 'KPI Cards':
        return <Icons.Layout className="w-4 h-4" />;
      default:
        return <Icons.BarChart className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {views.map(view => (
          <div
            key={view.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getViewTypeIcon(view.type)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{view.name}</h4>
                  <p className="text-sm text-gray-500">{view.type}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(view.status)}`}>
                {getStatusIcon(view.status)}
                <span className="text-sm font-medium capitalize">{view.status}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{view.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500">Position</p>
                <p className="text-sm">
                  Row {view.position.row}, Col {view.position.col} 
                  ({view.position.width}x{view.position.height})
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Refresh Interval</p>
                <p className="text-sm">{view.refreshInterval}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {view.dataSources.map((source, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                >
                  {source}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Last refreshed {new Date(view.lastRefreshed).toLocaleString()}</span>
              <button
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Icons.Info className="w-4 h-4" />
              </button>
            </div>

            {view.errorMessage && (
              <div className="mt-2 text-sm text-red-600">
                Error: {view.errorMessage}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};