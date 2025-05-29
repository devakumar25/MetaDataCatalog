import React from 'react';
import * as Icons from 'lucide-react';

interface View {
  id: string;
  name: string;
  type: string;
  description: string;
  createdBy: string;
  lastAccessed: string;
  usageCount: number;
}

export const RelationshipViews: React.FC = () => {
  // Mock views data
  const views: View[] = [
    {
      id: '1',
      name: 'Customer Orders Summary',
      type: 'Materialized View',
      description: 'Aggregated view of customer orders with key metrics',
      createdBy: 'John Smith',
      lastAccessed: '2024-03-14T10:30:00Z',
      usageCount: 156
    },
    {
      id: '2',
      name: 'Order Details',
      type: 'Regular View',
      description: 'Detailed view of orders with customer information',
      createdBy: 'Sarah Johnson',
      lastAccessed: '2024-03-14T09:15:00Z',
      usageCount: 89
    }
  ];

  return (
    <div className="space-y-4">
      {views.map(view => (
        <div
          key={view.id}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icons.Table className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{view.name}</h4>
                <p className="text-xs text-gray-500">{view.type}</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(view.lastAccessed).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{view.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Created by {view.createdBy}</span>
            <span>{view.usageCount} uses in the last 30 days</span>
          </div>
        </div>
      ))}
    </div>
  );
};