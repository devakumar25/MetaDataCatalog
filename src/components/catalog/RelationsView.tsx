import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { RelationshipDetails } from '../details/RelationshipDetails';
import { RelationshipPlainView } from './RelationshipPlainView';
import { ERDGView } from './ERDGView';


interface DataCluster {
  id: string;
  name: string;
  dataSources: string[];
  tablesCount: number;
  relationshipsCount: number;
  viewsCount: number;
  tags: string[];
  status: 'active' | 'inactive';
}

// Mock data for data clusters
const mockDataClusters: DataCluster[] = Array.from({ length: 15 }, (_, i) => ({
  id: `cluster-${i + 1}`,
  name: [
    'Sales Analytics Cluster',
    'Customer Data Cluster',
    'Product Inventory Cluster',
    'Marketing Analytics Cluster',
    'Financial Data Cluster',
    'Operations Cluster',
    'HR Analytics Cluster',
    'Supply Chain Cluster',
    'Support Analytics Cluster',
    'User Activity Cluster'
  ][Math.floor(Math.random() * 10)],
  dataSources: Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    (_, j) => [
      'Sales Database',
      'Customer Database',
      'Product Database',
      'Marketing Database',
      'Financial Database',
      'HR Database',
      'Analytics Database'
    ][Math.floor(Math.random() * 7)]
  ),
  tablesCount: Math.floor(Math.random() * 50) + 10,
  relationshipsCount: Math.floor(Math.random() * 30) + 5,
  viewsCount: Math.floor(Math.random() * 20) + 5,
  tags: [
    ...(Math.random() > 0.5 ? ['single data source cluster'] : ['multi data source cluster']),
    ...(Math.random() > 0.8 ? ['inactive'] : [])
  ],
  status: Math.random() > 0.2 ? 'active' : 'inactive'
}));

export const RelationsView: React.FC = () => {
  const [activeView, setActiveView] = useState<'relationships' | 'clusters'>('relationships');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [showErdg, setShowErdg] = useState<boolean>(false);
  const [activeClusterId, setActiveClusterId] = useState<string>('');

  // Get unique tags and their counts
  const tagCounts = mockDataClusters.reduce((acc: Record<string, number>, cluster) => {
    cluster.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const filteredClusters = useMemo(() => {
    return mockDataClusters.filter(cluster => {
      const matchesSearch = 
        cluster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cluster.dataSources.some(ds => ds.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => cluster.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return (
    <div className="p-4">
      {/* View Toggle */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('relationships')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeView === 'relationships'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Relationships
          </button>
          <button
            onClick={() => setActiveView('clusters')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeView === 'clusters'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Data Clusters
          </button>
        </div>
      </div>

      {showErdg && 
      <ERDGView 
        clusterId={activeClusterId}
        onClose={() => setShowErdg(false)}
        />
      }
      {activeView === 'clusters' ? (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search clusters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(tagCounts).map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                  ${selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {tag} ({count})
              </button>
            ))}
          </div>

          {/* Clusters Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cluster Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Sources</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tables</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationships</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClusters.map((cluster) => (
                  <tr key={cluster.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                          <Icons.Network className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cluster.name}</div>
                          <div className="flex gap-1 mt-1">
                            {cluster.tags.map(tag => (
                              <span
                                key={tag}
                                className={`
                                  inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                  ${tag === 'single data source cluster' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${tag === 'multi data source cluster' ? 'bg-purple-100 text-purple-800' : ''}
                                  ${tag === 'inactive' ? 'bg-red-100 text-red-800' : ''}
                                `}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {cluster.dataSources.map((source, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cluster.tablesCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cluster.relationshipsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cluster.viewsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setActiveClusterId(cluster.name);
                          setShowErdg(true);
                        }}
                      >
                        Show ERDG
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <RelationshipPlainView />
      // <ERDGView />
      )}
    </div>
  );
};