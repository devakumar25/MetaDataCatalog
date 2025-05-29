import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock dashboard details
  const dashboardDetails = {
    name: asset.name,
    description: 'Executive dashboard showing key business metrics and performance indicators',
    createdBy: 'John Smith',
    createdAt: '2024-03-01T10:00:00Z',
    lastModifiedBy: 'Sarah Johnson',
    lastModifiedAt: '2024-03-14T15:30:00Z',
    refreshInterval: '15 minutes',
    layout: {
      type: 'Grid',
      columns: 3,
      rows: 2
    },
    theme: {
      name: 'Corporate',
      primaryColor: '#2563eb',
      accentColor: '#60a5fa'
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Dashboard Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{dashboardDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">{dashboardDetails.createdBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(dashboardDetails.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified By</dt>
            <dd className="mt-1 text-sm text-gray-900">{dashboardDetails.lastModifiedBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(dashboardDetails.lastModifiedAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Refresh Interval</dt>
            <dd className="mt-1 text-sm text-gray-900">{dashboardDetails.refreshInterval}</dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{dashboardDetails.description}</p>
      </div>

      {/* Layout Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4">Layout Configuration</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <dl className="grid grid-cols-3 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Layout Type</dt>
              <dd className="mt-1 text-sm font-medium">{dashboardDetails.layout.type}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Columns</dt>
              <dd className="mt-1 text-sm font-medium">{dashboardDetails.layout.columns}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Rows</dt>
              <dd className="mt-1 text-sm font-medium">{dashboardDetails.layout.rows}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Theme Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4">Theme Configuration</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <dl className="grid grid-cols-3 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Theme Name</dt>
              <dd className="mt-1 text-sm font-medium">{dashboardDetails.theme.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Primary Color</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: dashboardDetails.theme.primaryColor }}
                />
                <span className="text-sm font-medium">{dashboardDetails.theme.primaryColor}</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Accent Color</dt>
              <dd className="mt-1 flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: dashboardDetails.theme.accentColor }}
                />
                <span className="text-sm font-medium">{dashboardDetails.theme.accentColor}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};