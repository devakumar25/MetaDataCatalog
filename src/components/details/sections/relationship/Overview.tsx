import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock relationship details
  const relationshipDetails = {
    name: asset.name,
    fromTable: {
      name: 'orders',
      dataSource: 'Sales Database',
      schema: 'public'
    },
    toTable: {
      name: 'customers',
      dataSource: 'Customer Database',
      schema: 'public'
    },
    type: 'many-to-one',
    columns: [
      { from: 'customer_id', to: 'id' }
    ],
    dataCluster: {
      name: 'Sales Analytics',
      type: 'Multi Data Source',
      tablesCount: 15,
      relationshipsCount: 8
    },
    createdBy: 'John Smith',
    createdAt: '2024-03-01T10:00:00Z',
    modifiedBy: 'Sarah Johnson',
    modifiedAt: '2024-03-14T15:30:00Z',
    description: 'Links orders to their respective customers',
    isActive: true
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Relationship Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{relationshipDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{relationshipDetails.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">{relationshipDetails.createdBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(relationshipDetails.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Modified By</dt>
            <dd className="mt-1 text-sm text-gray-900">{relationshipDetails.modifiedBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Modified At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(relationshipDetails.modifiedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Table Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Table Information</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* From Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icons.ArrowRight className="w-4 h-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-900">From Table</h4>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.fromTable.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Data Source</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.fromTable.dataSource}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Schema</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.fromTable.schema}</dd>
              </div>
            </dl>
          </div>

          {/* To Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icons.ArrowLeft className="w-4 h-4 text-gray-400" />
              <h4 className="text-sm font-medium text-gray-900">To Table</h4>
            </div>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Name</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.toTable.name}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Data Source</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.toTable.dataSource}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Schema</dt>
                <dd className="mt-1 text-sm font-medium">{relationshipDetails.toTable.schema}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Column Mapping */}
      <div>
        <h3 className="text-lg font-medium mb-4">Column Mapping</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {relationshipDetails.columns.map((mapping, index) => (
            <div
              key={index}
              className="flex items-center space-x-4"
            >
              <span className="text-sm font-medium">{mapping.from}</span>
              <Icons.ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium">{mapping.to}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Cluster Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Data Cluster</h3>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-500">Name</dt>
              <dd className="mt-1 text-sm font-medium">{relationshipDetails.dataCluster.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Type</dt>
              <dd className="mt-1 text-sm font-medium">{relationshipDetails.dataCluster.type}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Tables Count</dt>
              <dd className="mt-1 text-sm font-medium">{relationshipDetails.dataCluster.tablesCount}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Relationships Count</dt>
              <dd className="mt-1 text-sm font-medium">{relationshipDetails.dataCluster.relationshipsCount}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};