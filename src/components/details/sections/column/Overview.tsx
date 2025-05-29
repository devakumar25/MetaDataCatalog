import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface OverviewProps {
  asset: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ asset }) => {
  // Mock column details
  const columnDetails = {
    name: asset.name,
    dataType: 'VARCHAR(255)',
    isMandatory: true,
    defaultValue: 'NULL',
    isPersonalData: true,
    description: 'Customer email address used for communication and login',
    synonyms: ['email', 'email_address', 'user_email'],
    defaultFunction: null,
    columnPriority: 'High',
    position: 3,
    formatting: {
      alignment: 'left',
      format: 'text',
      validation: 'email',
      conditionalFormatting: [
        {
          condition: 'IS NULL',
          style: { backgroundColor: '#FEE2E2', textColor: '#991B1B' }
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Column Information</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Column Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Data Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.dataType}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Is Mandatory?</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {columnDetails.isMandatory ? 'Yes' : 'No'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Default Value</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.defaultValue}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Is Personal Data?</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {columnDetails.isPersonalData ? 'Yes' : 'No'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Column Priority</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.columnPriority}</dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{columnDetails.description}</p>
      </div>

      {/* Synonyms */}
      <div>
        <h3 className="text-lg font-medium mb-4">Synonyms</h3>
        <div className="flex flex-wrap gap-2">
          {columnDetails.synonyms.map((synonym, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {synonym}
            </span>
          ))}
        </div>
      </div>

      {/* Formatting */}
      <div>
        <h3 className="text-lg font-medium mb-4">Formatting</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Column Position</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.position}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Alignment</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.formatting.alignment}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Format</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.formatting.format}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Validation</dt>
            <dd className="mt-1 text-sm text-gray-900">{columnDetails.formatting.validation}</dd>
          </div>
        </dl>

        {/* Conditional Formatting */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Conditional Formatting</h4>
          <div className="space-y-2">
            {columnDetails.formatting.conditionalFormatting.map((rule, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">When {rule.condition}</span>
                  <div
                    className="w-6 h-6 rounded"
                    style={{
                      backgroundColor: rule.style.backgroundColor,
                      color: rule.style.textColor
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};