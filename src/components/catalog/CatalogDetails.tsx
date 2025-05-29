import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { DataSourceSection } from './DataSourceSection';
import { AssetView } from './AssetView';
import { mockDataSources } from './mockData';
import { DataSourceTile } from './types';

export const CatalogDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'datasources' | 'transformations'>('datasources');
  const [mainSearchQuery, setMainSearchQuery] = useState('');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState<{
    source: DataSourceTile;
    table?: { name: string; rowCount: number };
  } | null>(null);

  const handleSourceSelect = (source: DataSourceTile, selectedTable?: { name: string; rowCount: number }) => {
    setSelectedDataSource({ source, table: selectedTable });
  };

  return (
    <div className="h-full flex overflow-hidden">
      <div className="w-[70%] flex flex-col overflow-hidden border-r border-gray-200">
        {/* Fixed Header Section */}
        <div className="flex-shrink-0 p-6 pb-0 bg-white border-b border-gray-200">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'datasources' ? 'data sources' : 'transformations'}...`}
                value={mainSearchQuery}
                onChange={(e) => setMainSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tabs */}
          {/*}
          <div className="border-b border-gray-200">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveTab('datasources')}
                className={`pb-3 text-sm font-medium border-b-2 ${
                  activeTab === 'datasources'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Data Sources
              </button>
              <button
                onClick={() => setActiveTab('transformations')}
                className={`pb-3 text-sm font-medium border-b-2 ${
                  activeTab === 'transformations'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transformations
              </button>
            </div>
          </div>
          */}
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-hidden">
          {activeTab === 'datasources' ? (
            <>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Files and Feeds"
                  description="Connect to files and data feeds"
                  icon="FileText"
                  sources={mockDataSources['files-and-feeds'].filter(source => 
                    source.name.toLowerCase().includes(mainSearchQuery.toLowerCase()) ||
                    source.type.toLowerCase().includes(mainSearchQuery.toLowerCase())
                  )}
                  onSourceSelect={handleSourceSelect}
                />
              </div>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Local & Cloud Data Sources"
                  description="Connect to cloud databases and storage"
                  icon="Cloud"
                  sources={mockDataSources['cloud-sources'].filter(source => 
                    source.name.toLowerCase().includes(mainSearchQuery.toLowerCase()) ||
                    source.type.toLowerCase().includes(mainSearchQuery.toLowerCase())
                  )}
                  onSourceSelect={handleSourceSelect}
                />
              </div>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Business Applications"
                  description="Connect to business tools and apps"
                  icon="Briefcase"
                  sources={mockDataSources['business-apps'].filter(source => 
                    source.name.toLowerCase().includes(mainSearchQuery.toLowerCase()) ||
                    source.type.toLowerCase().includes(mainSearchQuery.toLowerCase())
                  )}
                  onSourceSelect={handleSourceSelect}
                />
              </div>
            </>
          ) : (
            <>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Pipelines"
                  description="Create and manage data pipelines"
                  icon="GitBranch"
                  sources={[]}
                  onSourceSelect={handleSourceSelect}
                  isTransformation={true}
                  searchQuery={mainSearchQuery}
                />
              </div>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Code Studio"
                  description="Write custom transformations"
                  icon="Code"
                  sources={[]}
                  onSourceSelect={handleSourceSelect}
                  isTransformation={true}
                  searchQuery={mainSearchQuery}
                />
              </div>
              <div className="h-full overflow-hidden">
                <DataSourceSection
                  title="Snapshots"
                  description="Manage data snapshots"
                  icon="Camera"
                  sources={[]}
                  onSourceSelect={handleSourceSelect}
                  isTransformation={true}
                  searchQuery={mainSearchQuery}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Asset List (30%) */}
      <div className="w-[30%] flex flex-col overflow-hidden bg-gray-50">
        <div className="flex-shrink-0 p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {selectedDataSource 
              ? selectedDataSource.table
                ? `${selectedDataSource.source.name} - ${selectedDataSource.table.name}`
                : `${selectedDataSource.source.name} Views`
              : 'All Views'
            }
          </h2>
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search assets..."
              value={assetSearchQuery}
              onChange={(e) => setAssetSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto asset-view-scroll">
          <AssetView 
            searchQuery={assetSearchQuery}
            selectedDataSource={selectedDataSource?.source.id}
          />
        </div>
      </div>
    </div>
  );
};