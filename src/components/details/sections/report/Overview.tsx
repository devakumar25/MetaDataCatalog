import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock report details
  const reportDetails = {
    name: asset.name,
    description: 'Comprehensive sales performance analysis with key metrics and trends',
    createdBy: 'John Smith',
    createdAt: '2024-03-01T10:00:00Z',
    lastModifiedBy: 'Sarah Johnson',
    lastModifiedAt: '2024-03-14T15:30:00Z',
    query: ''
  };

  // Mock path used data
  const pathUsed = [
    { path: 'Customers.customer_id', joinType: 'N-1' },
    { path: 'Orders.order_id', joinType: '1-1' },
    { path: 'Region.region_id', joinType: '1-1' }
  ];

  // Mock columns data
  const xAxisColumns = ['date', 'region'];
  const yAxisColumns = ['total_sales', 'total_orders'];
  const filterColumns = ['category', 'status'];
  const userFilterColumns = ['region', 'customer_id'];

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Report Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{reportDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">{reportDetails.createdBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(reportDetails.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified By</dt>
            <dd className="mt-1 text-sm text-gray-900">{reportDetails.lastModifiedBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(reportDetails.lastModifiedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{reportDetails.description}</p>
      </div>

      {/* Path Used */}
      <div>
        <h3 className="text-lg font-medium mb-4">Path Used</h3>
        <p className="text-sm text-gray-600">
          {pathUsed.map((path, index) => (
            <span key={index}>
              {index > 0 && ' -> '}
              <span className="font-medium">{path.path}</span> <span className="text-gray-500">({path.joinType})</span>
            </span>
          ))}
        </p>
      </div>

      {/* Columns List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Columns</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">X-Axis Columns</dt>
            <dd className="mt-1 text-sm text-gray-900">{xAxisColumns.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Y-Axis Columns</dt>
            <dd className="mt-1 text-sm text-gray-900">{yAxisColumns.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Filter Columns</dt>
            <dd className="mt-1 text-sm text-gray-900">{filterColumns.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">User Filter Columns</dt>
            <dd className="mt-1 text-sm text-gray-900">{userFilterColumns.join(', ')}</dd>
          </div>
        </div>
      </div>
    </div>
  );
};
