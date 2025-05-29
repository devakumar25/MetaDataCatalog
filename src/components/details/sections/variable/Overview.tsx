import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock variable details
  const variableDetails = {
    name: asset.name,
    type: 'list', // Can be 'list', 'string', or 'range'
    description: 'List of product categories for filtering',
    defaultValue: '["Electronics", "Clothing", "Books"]',
    createdBy: 'John Smith',
    createdAt: '2024-03-01T10:00:00Z',
    lastModifiedBy: 'Sarah Johnson',
    lastModifiedAt: '2024-03-14T15:30:00Z',
    validValues: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    validation: {
      required: true,
      minLength: 1,
      maxLength: 10
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Variable Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{variableDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{variableDetails.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">{variableDetails.createdBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(variableDetails.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified By</dt>
            <dd className="mt-1 text-sm text-gray-900">{variableDetails.lastModifiedBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Modified At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(variableDetails.lastModifiedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{variableDetails.description}</p>
      </div>

      {/* Default Value */}
      <div>
        <h3 className="text-lg font-medium mb-4">Default Value</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
            {variableDetails.defaultValue}
          </pre>
        </div>
      </div>

      {/* Valid Values */}
      <div>
        <h3 className="text-lg font-medium mb-4">Valid Values</h3>
        <div className="flex flex-wrap gap-2">
          {variableDetails.validValues.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      {/* Validation Rules */}
      <div>
        <h3 className="text-lg font-medium mb-4">Validation Rules</h3>
        <dl className="grid grid-cols-3 gap-4">
          <div>
            <dt className="text-sm text-gray-500">Required</dt>
            <dd className="mt-1 text-sm font-medium">
              {variableDetails.validation.required ? 'Yes' : 'No'}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Min Length</dt>
            <dd className="mt-1 text-sm font-medium">
              {variableDetails.validation.minLength}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Max Length</dt>
            <dd className="mt-1 text-sm font-medium">
              {variableDetails.validation.maxLength}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};