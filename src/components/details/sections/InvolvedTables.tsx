import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Table {
  id: string;
  name: string;
  description: string;
  lastSyncTime: string;
  syncStatus: 'success' | 'failed' | 'in_progress';
  failureReason?: string;
}

export const InvolvedTables: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock tables data
  const tables: Table[] = [
    {
      id: '1',
      name: 'accounts',
      description: 'Customer account information and details',
      lastSyncTime: '2024-03-14T10:30:00Z',
      syncStatus: 'success'
    },
    {
      id: '2',
      name: 'contacts',
      description: 'Contact information for customer accounts',
      lastSyncTime: '2024-03-14T10:15:00Z',
      syncStatus: 'success'
    },
    {
      id: '3',
      name: 'opportunities',
      description: 'Sales opportunities and pipeline data',
      lastSyncTime: '2024-03-14T09:45:00Z',
      syncStatus: 'failed',
      failureReason: 'Connection timeout'
    }
  ];

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSyncStatusColor = (status: Table['syncStatus']) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'in_progress':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getSyncStatusIcon = (status: Table['syncStatus']) => {
    switch (status) {
      case 'success':
        return <Icons.CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <Icons.XCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Icons.RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredTables.map(table => (
          <div
            key={table.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icons.Table className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{table.name}</h4>
                  <p className="text-sm text-gray-500">{table.description}</p>
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getSyncStatusColor(table.syncStatus)}`}>
                {getSyncStatusIcon(table.syncStatus)}
                <span className="text-sm font-medium capitalize">{table.syncStatus.replace('_', ' ')}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Last synced {new Date(table.lastSyncTime).toLocaleString()}</span>
              {table.failureReason && (
                <span className="text-red-600">Error: {table.failureReason}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};