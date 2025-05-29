import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { mockAssets } from '../../data/searchData';
import { AssetViewProps } from './types';
import { LineageView } from '../lineage/LineageView';
import { TableDetails } from '../details/TableDetails';
import { ReportDetails } from '../details/ReportDetails';
import { DashboardDetails } from '../details/DashboardDetails';

export const AssetView: React.FC<AssetViewProps> = ({ searchQuery, selectedDataSource }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [assetId, setAssetId] = useState<string>('');
  const [showLineage, setShowLineage] = useState<boolean>(false);

  const assetTypes = [
    { type: 'Tables', icon: Icons.Table },
    { type: 'Query Tables', icon: Icons.TableProperties },
    { type: 'Reports', icon: Icons.BarChart },
    { type: 'Dashboards', icon: Icons.LayoutDashboard },
  ];

  const getAssetsByType = (type: string) => {
    let assets = mockAssets.filter(asset => 
      asset.type === type && 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If a transformation is selected, filter assets based on the transformation type
    if (selectedDataSource) {
      const source = mockAssets.find(a => a.id === selectedDataSource);
      if (source) {
        switch (source.type) {
          case 'Pipelines':
            // Show assets related to the pipeline's source tables
            assets = assets.filter(asset => 
              asset.tags.includes('pipeline-related') || 
              asset.tags.includes('data-transformation')
            );
            break;
          case 'Code Studio':
            // Show assets that use the custom code
            assets = assets.filter(asset => 
              asset.tags.includes('custom-code') || 
              asset.tags.includes('code-generated')
            );
            break;
          case 'Snapshots':
            // Show assets based on the snapshot's source
            assets = assets.filter(asset => 
              asset.tags.includes('snapshot-source') || 
              asset.tags.includes('snapshot-derived')
            );
            break;
        }
      }
    }

    return assets;
  };

  const toggleSection = (type: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleAll = () => {
    if (Object.keys(expandedSections).length === assetTypes.length) {
      setExpandedSections({});
    } else {
      const expanded: Record<string, boolean> = {};
      assetTypes.forEach(({ type }) => {
        expanded[type] = true;
      });
      setExpandedSections(expanded);
    }
  };


  return selectedAsset ? (
      selectedAsset.type === 'Report' ? 
    <ReportDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Columns', selectedAsset.name, 'Details']}
        />
    : selectedAsset.type === 'Dashboard' ? 
    <DashboardDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Columns', selectedAsset.name, 'Details']}
        />
    : <TableDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Columns', selectedAsset.name, 'Details']}
        />
      ) : (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={toggleAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {Object.keys(expandedSections).length === assetTypes.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
      <div className="space-y-2">
        {assetTypes.map(({ type, icon: Icon }) => {
          const assets = getAssetsByType(type);
          return (
            <div key={type} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleSection(type)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {type} ({Math.floor(Math.random() * 100)})
                  </span>
                </div>
                <Icons.ChevronDown 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSections[type] ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections[type] && (
                <div className="border-t border-gray-200 divide-y divide-gray-200">
                  {assets.map(asset => (
                    <div 
                      key={asset.id}
                      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">{asset.type}</p>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded-md"
                         onClick={() => {
                             
                                  setSelectedAsset({...asset});
                                }}
                        >
                        <Icons.Info className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};