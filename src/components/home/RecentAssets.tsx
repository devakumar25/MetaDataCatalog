import React from 'react';
import * as Icons from 'lucide-react';
import { RecentAsset } from '../../types/assets';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface RecentAssetsProps {
  assets: RecentAsset[];
}

export const RecentAssets: React.FC<RecentAssetsProps> = ({ assets }) => {
  const getIcon = (type: string) => {
    const iconMap: { [key: string]: keyof typeof Icons } = {
      'Table': 'Table',
      'QueryTable': 'TableProperties',
      'Report': 'BarChart',
      'Dashboard': 'LayoutDashboard'
    };
    const Icon = Icons[iconMap[type] || 'File'];
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Recent Assets</h2>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="space-y-1">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1 bg-blue-50 rounded-md flex-shrink-0">
                  {getIcon(asset.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.type}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 flex-shrink-0">
                {formatDistanceToNow(new Date(asset.lastAccessed))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};