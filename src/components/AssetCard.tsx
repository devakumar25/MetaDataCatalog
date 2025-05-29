import React, { useState, useContext } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../types/assets';
import { DataSourceDetails } from './details/DataSourceDetails';
import { TableDetails } from './details/TableDetails';
import { ColumnDetails } from './details/ColumnDetails';
import { FormulaDetails } from './details/FormulaDetails';
import { AggregateDetails } from './details/AggregateDetails';
import { RelationshipDetails } from './details/RelationshipDetails';
import { ReportDetails } from './details/ReportDetails';
import { DashboardDetails } from './details/DashboardDetails';
import { DataCacheTableDetails } from './details/DataCacheTableDetails';
import { LineageView } from './lineage/LineageView';
import { getMockDataSource } from '../data/mockData';
import { WorkspaceContext } from '../pages/WorkspaceDetail';

interface AssetCardProps {
  asset: SearchAsset;
  path?: string[];
  onPathChange?: (newPath: string[]) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ 
  asset, 
  path = ['Search'],
  onPathChange 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showLineage, setShowLineage] = useState(false);
  const { name: workspaceName } = useContext(WorkspaceContext);
  
  function getAssetIcon(type: string): React.FC<any> {
    const iconMap: { [key: string]: keyof typeof Icons } = {
      'Data Sources': 'Database',
      'Tables': 'Table',
      'Query Tables': 'TableProperties',
      'Columns': 'GitBranch',
      'Relationships': 'GitMerge',
      'Custom Formulas': 'Calculator',
      'Variables': 'Variable',
      'Filter Criteria': 'Filter',
      'Aggregate Formulas': 'Calculator',
      'Data Cache Tables': 'Database',
      'Reports': 'BarChart',
      'Dashboards': 'LayoutDashboard',
      'Users': 'User',
      'ML Models': 'Brain',
      'Slideshows': 'Presentation',
      'Portals': 'Layout'
    };

    const Icon = Icons[iconMap[type] || 'File'];
    return Icon || Icons.File;
  }

  const Icon = getAssetIcon(asset.type);
  const formattedDate = new Date(asset.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleShowDetails = () => {
    setShowDetails(true);
    if (onPathChange) {
      onPathChange([workspaceName, ...path, asset.name, 'Details']);
    }
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    if (onPathChange) {
      onPathChange([workspaceName, ...path.slice(0, -2)]);
    }
  };

  const renderDetailsComponent = () => {
    const commonProps = {
      onClose: handleCloseDetails,
      path: [workspaceName, ...path, asset.name, 'Details'],
      onPathChange
    };

    switch (asset.type) {
      case 'Data Sources':
        return (
          <DataSourceDetails
            dataSource={getMockDataSource(asset.id)}
            {...commonProps}
          />
        );
      case 'Tables':
      case 'Query Tables':
        return (
          <TableDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Columns':
        return (
          <ColumnDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Custom Formulas':
      case 'Variables':
      case 'Filter Criteria':
        return (
          <FormulaDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Aggregate Formulas':
        return (
          <AggregateDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Relationships':
        return (
          <RelationshipDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Reports':
        return (
          <ReportDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Dashboards':
        return (
          <DashboardDetails
            asset={asset}
            {...commonProps}
          />
        );
      case 'Data Cache Tables':
        return (
          <DataCacheTableDetails
            asset={asset}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-stone-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{asset.name}</h3>
              <p className="text-sm text-gray-500">{asset.type}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowLineage(true)}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Icons.Network className="w-5 h-5" />
            </button>
            <button
              onClick={handleShowDetails}
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Icons.Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500">Created by</p>
            <p className="text-sm font-medium">{asset.createdBy}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created on</p>
            <p className="text-sm font-medium">{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Shared with</p>
            <p className="text-sm font-medium">{asset.sharedUsersCount} users</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Data Sources</p>
            <p className="text-sm font-medium">{asset.dataSourcesCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Downstream Assets</p>
            <p className="text-sm font-medium">{asset.downstreamAssetsCount}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {asset.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getTagStyle(tag)}`}
            >
              {tag.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {showDetails && renderDetailsComponent()}
      {showLineage && (
        <LineageView
          assetId={asset.name}
          onClose={() => setShowLineage(false)}
        />
      )}
    </>
  );
};

function getTagStyle(tag: string): string {
  switch (tag) {
    case 'pii':
      return 'bg-red-100 text-red-800';
    case 'lookup':
      return 'bg-purple-100 text-purple-800';
    case 'no-dependents':
      return 'bg-gray-100 text-gray-800';
    case 'inactive':
      return 'bg-yellow-100 text-yellow-800';
    case 'refresh-failed':
      return 'bg-orange-100 text-orange-800';
    case 'long-running':
      return 'bg-blue-100 text-blue-800';
    case 'deprecated':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}