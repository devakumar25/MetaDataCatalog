import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { DataCluster } from '../../../types/assets';
import { ERDGView } from '../../catalog/ERDGView';

interface DataClustersProps {
  clusters?: DataCluster[];
}

const mockDataClusters: DataCluster[] = [
  {
    id: '1',
    name: 'Customer Analytics',
    tablesCount: 12,
    lookupsCount: 5,
    isActive: true,
    tags: []
  },
  {
    id: '2',
    name: 'Sales Processing',
    tablesCount: 8,
    lookupsCount: 3,
    isActive: false,
    tags: ['inactive']
  },
  {
    id: '3',
    name: 'Inventory Management',
    tablesCount: 15,
    lookupsCount: 7,
    isActive: true,
    tags: []
  },
  {
    id: '4',
    name: 'Financial Reports',
    tablesCount: 10,
    lookupsCount: 4,
    isActive: false,
    tags: ['inactive']
  }
];

export const DataClusters: React.FC<DataClustersProps> = ({ clusters = mockDataClusters }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [showErdg, setShowErdg] = useState<boolean>(false);
  const [activeClusterId, setActiveClusterId] = useState<string>('');


  console.log(showErdg);
  
  return showErdg ? 
      <ERDGView 
        clusterId={activeClusterId}
        onClose={() => setShowErdg(false)}
        /> : (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Data Clusters</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedTags(prev => 
              prev.includes('inactive') ? prev.filter(t => t !== 'inactive') : [...prev, 'inactive']
            )}
            className={`
              px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${selectedTags.includes('inactive')
                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Inactive
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {clusters
          .filter(cluster => selectedTags.length === 0 || cluster.tags.some(tag => selectedTags.includes(tag)))
          .map(cluster => (
            <div
              key={cluster.id}
              className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icons.Network className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-gray-900">{cluster.name}</h4>
                    {!cluster.isActive && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-500">
                      {cluster.tablesCount} Tables
                    </span>
                    <span className="text-sm text-gray-500">
                      {cluster.lookupsCount} Lookups
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                     setActiveClusterId(cluster.name);
                     setShowErdg(true);
                }}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                View ERDG
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};