import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface ColumnQualityProps {
  asset: SearchAsset;
}

export const ColumnQuality: React.FC<ColumnQualityProps> = ({ asset }) => {
  // Mock quality metrics
  const qualityMetrics = {
    completeness: 98.5,
    uniqueness: 100,
    validity: 99.8,
    consistency: 97.2,
    accuracy: 96.5,
    classification: {
      type: 'Email',
      category: 'Contact Information',
      subCategories: ['Personal Identifier', 'Communication'],
      format: 'user@domain.com',
      patterns: [
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
      ]
    },
    statistics: {
      totalRows: 150000,
      nullCount: 2250,
      distinctCount: 149500,
      minLength: 10,
      maxLength: 50,
      avgLength: 25,
      topValues: [
        { value: 'john.doe@example.com', count: 15 },
        { value: 'jane.smith@example.com', count: 12 },
        { value: 'support@company.com', count: 10 }
      ],
      domains: [
        { domain: 'example.com', count: 45000 },
        { domain: 'company.com', count: 35000 },
        { domain: 'gmail.com', count: 25000 }
      ]
    }
  };

  const getQualityColor = (value: number) => {
    if (value >= 98) return 'text-green-600';
    if (value >= 95) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Quality Scores */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quality Metrics</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { label: 'Completeness', value: qualityMetrics.completeness },
            { label: 'Uniqueness', value: qualityMetrics.uniqueness },
            { label: 'Validity', value: qualityMetrics.validity },
            { label: 'Consistency', value: qualityMetrics.consistency },
            { label: 'Accuracy', value: qualityMetrics.accuracy }
          ].map(metric => (
            <div key={metric.label} className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className={`text-2xl font-semibold ${getQualityColor(metric.value)}`}>
                {metric.value}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Classification */}
      <div>
        <h3 className="text-lg font-medium mb-4">Data Classification</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Type</dt>
              <dd className="mt-1 text-sm text-gray-900">{qualityMetrics.classification.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="mt-1 text-sm text-gray-900">{qualityMetrics.classification.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Sub Categories</dt>
              <dd className="mt-1 flex flex-wrap gap-2">
                {qualityMetrics.classification.subCategories.map(category => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                  >
                    {category}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Expected Format</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">
                {qualityMetrics.classification.format}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Statistics */}
      <div>
        <h3 className="text-lg font-medium mb-4">Data Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Basic Statistics</h4>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Total Rows</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.totalRows.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Null Count</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.nullCount.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Distinct Values</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.distinctCount.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Min Length</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.minLength}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Max Length</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.maxLength}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Average Length</dt>
                <dd className="text-sm text-gray-900">{qualityMetrics.statistics.avgLength}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Domain Distribution</h4>
            <div className="space-y-2">
              {qualityMetrics.statistics.domains.map(domain => (
                <div key={domain.domain} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">{domain.domain}</span>
                      <span className="text-sm text-gray-900">{domain.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(domain.count / qualityMetrics.statistics.totalRows) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};