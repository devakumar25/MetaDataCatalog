import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface BaseColumn {
  id: string;
  name: string;
  table: string;
  dataType: string;
  description?: string;
}

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock formula details
  const formulaDetails = {
    name: asset.name,
    type: asset.type === 'Custom Formulas' ? 'Single Table' : 'Multi Table',
    expression: 'CASE WHEN amount > 1000 THEN "High" WHEN amount > 500 THEN "Medium" ELSE "Low" END',
    returnType: 'STRING',
    description: 'Categorizes transaction amounts into high, medium, and low buckets',
    isCached: true,
    refreshInterval: '1 hour',
    defaultPath: asset.type === 'Custom Formulas' ? null : 'orders -> order_items -> products',
    baseColumns: [
      {
        id: '1',
        name: 'amount',
        table: 'orders',
        dataType: 'DECIMAL',
        description: 'Order total amount'
      },
      {
        id: '2',
        name: 'status',
        table: 'orders',
        dataType: 'STRING',
        description: 'Order status'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Formula Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{formulaDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{formulaDetails.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Return Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{formulaDetails.returnType}</dd>
          </div>
  
          {formulaDetails.defaultPath && (
            <div className="col-span-2">
              <dt className="text-sm font-medium text-gray-500">Default Path</dt>
              <dd className="mt-1 text-sm text-gray-900">{formulaDetails.defaultPath}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Expression */}
      <div>
        <h3 className="text-lg font-medium mb-4">Formula Expression</h3>
        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
          {formulaDetails.expression}
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{formulaDetails.description}</p>
      </div>

      {/* Base Columns */}
      <div>
        <h3 className="text-lg font-medium mb-4">Base Columns</h3>
        <div className="space-y-3">
          {formulaDetails.baseColumns.map((column) => (
            <div
              key={column.id}
              className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icons.Database className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{column.name}</span>
                    <span className="text-sm text-gray-500">({column.table})</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{column.dataType}</span>
                    {column.description && (
                      <span className="text-xs text-gray-500">- {column.description}</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Icons.Info className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};