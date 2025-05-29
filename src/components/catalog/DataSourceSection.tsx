import React from 'react';
import * as Icons from 'lucide-react';
import { DataSourceTile } from './DataSourceTile';
import { DataSourceSectionProps } from './types';
import { mockTransformations } from './mockData';

export const DataSourceSection: React.FC<DataSourceSectionProps> = ({
  title,
  description,
  icon,
  sources,
  onSourceSelect,
  isTransformation = false,
  searchQuery = ''
}) => {
  const Icon = Icons[icon];
  
  const items = isTransformation ? 
    (title === 'Pipelines' ? mockTransformations.pipelines :
     title === 'Code Studio' ? mockTransformations.codeStudio :
     mockTransformations.snapshots).filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    ) :
    sources;

  const handleTransformationSelect = (item: any) => {
    // Create a source-like object for transformations
    const transformationSource = {
      id: item.id,
      name: item.name,
      type: title, // 'Pipelines', 'Code Studio', or 'Snapshots'
      // Add relevant metadata based on transformation type
      ...(title === 'Pipelines' && {
        sourceTables: item.sourceTables,
        sourceTablesCount: item.sourceTablesCount
      }),
      ...(title === 'Snapshots' && {
        sourceTable: item.sourceTable,
        sourceReport: item.sourceReport
      })
    };
    onSourceSelect(transformationSource);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex items-center justify-between mb-4 bg-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <span className="text-sm text-gray-500">({items.length})</span>
            </div>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 -mr-2">
        <div className="space-y-4">
          {isTransformation ? (
            items.map((item: any) => (
              <div 
                key={item.id} 
                className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors cursor-pointer"
                onClick={() => handleTransformationSelect(item)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {title === 'Pipelines' ? <Icons.GitBranch className="w-5 h-5 text-blue-600" /> :
                       title === 'Code Studio' ? <Icons.Code className="w-5 h-5 text-blue-600" /> :
                       <Icons.Camera className="w-5 h-5 text-blue-600" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      {title === 'Pipelines' && (
                        <p className="text-xs text-gray-500">
                          {item.sourceTablesCount} source tables
                        </p>
                      )}
                      {title === 'Snapshots' && (
                        <p className="text-xs text-gray-500">
                          {item.sourceReport}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Last synced: {new Date(item.lastSync).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            sources.map(source => (
              <DataSourceTile
                key={source.id}
                source={source}
                onSelect={onSourceSelect}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};