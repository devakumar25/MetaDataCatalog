import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock aggregate details
  const aggregateDetails = {
    name: asset.name,
    type: 'Aggregate Formula',
    aggregateType: 'SUM',
    targetColumn: 'amount',
    groupBy: ['customer_id', 'product_category'],
    filters: ['status = "completed"', 'amount > 0'],
    description: 'Calculates total sales amount by customer and product category',
    window: {
      type: 'Rolling',
      period: '30 days',
      offset: '1 day'
    },
    performance: {
      avgComputeTime: '2.5s',
      rowsProcessed: 1250000
    },
    sourceTables: [
      { name: 'orders', columns: ['amount', 'customer_id', 'status'] },
      { name: 'products', columns: ['id', 'category'] }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Aggregate Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{aggregateDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{aggregateDetails.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Aggregate Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{aggregateDetails.aggregateType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Target Column</dt>
            <dd className="mt-1 text-sm text-gray-900">{aggregateDetails.targetColumn}</dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{aggregateDetails.description}</p>
      </div>

            <div>
        <h3 className="text-lg font-medium mb-4">Formula Expression</h3>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          sum(CustomerDetails.Cost)
        </div>
      </div>
      
      {/* Configuration */}
      {/*<div>
        <h3 className="text-lg font-medium mb-4">Configuration</h3>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Group By</h4>
            <div className="flex flex-wrap gap-2">
              {aggregateDetails.groupBy.map((field, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Filters</h4>
            <div className="space-y-2">
              {aggregateDetails.filters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Icons.Filter className="w-4 h-4 text-gray-400" />
                  <span>{filter}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Window Configuration</h4>
            <dl className="grid grid-cols-3 gap-4">
              <div>
                <dt className="text-sm text-gray-500">Type</dt>
                <dd className="mt-1 text-sm font-medium">{aggregateDetails.window.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Period</dt>
                <dd className="mt-1 text-sm font-medium">{aggregateDetails.window.period}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Offset</dt>
                <dd className="mt-1 text-sm font-medium">{aggregateDetails.window.offset}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div> */}

      {/* Source Tables */}
      <div>
        <h3 className="text-lg font-medium mb-4">Source Tables</h3>
        <div className="space-y-3">
          {aggregateDetails.sourceTables.map((table, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icons.Table className="w-4 h-4 text-gray-400" />
                <h4 className="text-sm font-medium text-gray-900">{table.name}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {table.columns.map((column, colIndex) => (
                  <span
                    key={colIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                  >
                    {column}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <dt className="text-sm text-gray-500">Avg. Compute Time</dt>
            <dd className="mt-1 text-xl font-semibold text-gray-900">
              {aggregateDetails.performance.avgComputeTime}
            </dd>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <dt className="text-sm text-gray-500">Rows Processed</dt>
            <dd className="mt-1 text-xl font-semibold text-gray-900">
              {aggregateDetails.performance.rowsProcessed.toLocaleString()}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};