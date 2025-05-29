import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Aggregate {
  id: string;
  name: string;
  createdBy: string;
  description: string;
  expression: string;
  dataType: string;
  createdAt: string;
  sourceTables?: string[];
}

interface AggregatesProps {
  singleTableAggregates: Aggregate[];
  multiTableAggregates: Aggregate[];
}

export const Aggregates: React.FC<AggregatesProps> = ({
  singleTableAggregates,
  multiTableAggregates
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');
  const [searchQuery, setSearchQuery] = useState('');

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType.toLowerCase()) {
      case 'string':
        return <Icons.Type className="w-4 h-4" />;
      case 'number':
        return <Icons.Hash className="w-4 h-4" />;
      case 'boolean':
        return <Icons.ToggleLeft className="w-4 h-4" />;
      case 'date':
        return <Icons.Calendar className="w-4 h-4" />;
      default:
        return <Icons.Circle className="w-4 h-4" />;
    }
  };

  const currentAggregates = activeTab === 'single' ? singleTableAggregates : multiTableAggregates;
  
  const filteredAggregates = currentAggregates.filter(aggregate =>
    aggregate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aggregate.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aggregate.expression.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('single')}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeTab === 'single'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Single Table Aggregates
          </button>
          <button
            onClick={() => setActiveTab('multi')}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeTab === 'multi'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            Multi Table Aggregates
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search aggregates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredAggregates.map(aggregate => (
          <div
            key={aggregate.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getDataTypeIcon(aggregate.dataType)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{aggregate.name}</h4>
                  <p className="text-xs text-gray-500">Created by {aggregate.createdBy}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(aggregate.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{aggregate.description}</p>
            {activeTab === 'multi' && aggregate.sourceTables && (
              <div className="mt-2 flex flex-wrap gap-2">
                {aggregate.sourceTables.map(table => (
                  <span
                    key={table}
                    className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                  >
                    {table}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                {aggregate.expression}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};