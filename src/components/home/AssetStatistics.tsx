import React from 'react';
import * as Icons from 'lucide-react';
import { AssetCount } from '../../types/assets';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

interface AssetStatisticsProps {
  statistics: AssetCount[];
}

export const AssetStatistics: React.FC<AssetStatisticsProps> = ({ statistics }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleSelect = (path: string) => {
    navigate('catalog/' + path);
  };
  
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 h-full">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Asset Statistics</h2>
      <div className="grid grid-cols-7 gap-3 h-[calc(100%-2.5rem)] scrollbar-thumb-gray-200 scrollbar-track-transparent ">
        {statistics.map((group) => (
          <div
            key={group.group}
            className="bg-gray-50 rounded-lg p-2 overflow-y-auto scrollbar-thin "
          >
            <h3 className="text-sm font-medium text-gray-700 mb-2">{group.group}</h3>

            <div className="grid gap-2">
              {group.assets.map((asset) => (
                <div
                  key={asset.name}
                  onClick={() => {
                    handleSelect(asset.path);
                  }}
                  className="bg-white rounded-md p-2 flex items-center space-x-2 border border-gray-100 hover:cursor-pointer hover:border-1 hover:border-stone-200"
                >
                  <div className="flex-shrink-0 p-1 bg-blue-50 rounded-md">
                    {getIcon(asset.icon)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {asset.count.toLocaleString()}
                      {/*asset.name === 'Data Clusters' && <span className="ml-2 border border-1 bg-stone-200 p-0.5 text-xs font-normal rounded">2 inactive</span>*/}
                    </div>
                    <div className="text-xs text-gray-600 truncate">{asset.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}