import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../types/assets';
import { AssetCard } from '../../AssetCard';
import { mockAssets } from '../../../data/searchData';

interface DownstreamAssetsProps {
  assets?: SearchAsset[];
  path?: string[];
  onPathChange?: (newPath: string[]) => void;
}

export const DownstreamAssets: React.FC<DownstreamAssetsProps> = ({ 
  assets = mockAssets,
  path = [],
  onPathChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const typeCounts = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tagCounts = assets.reduce((acc, asset) => {
    asset.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || asset.type === selectedType;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => asset.tags.includes(tag));
    return matchesSearch && matchesType && matchesTags;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">
          Downstream Assets <span className="text-sm text-gray-500">({filteredAssets.length} assets)</span>
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="">All Types</option>
              {Object.entries(typeCounts).sort().map(([type, count]) => (
                <option key={type} value={type}>{type} ({count})</option>
              ))}
            </select>
            <Icons.ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(tagCounts).sort().map(([tag, count]) => (
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
            {tag.replace('-', ' ')} ({count})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAssets.map(asset => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            path={path}
            onPathChange={onPathChange}
          />
        ))}
      </div>
    </div>
  );
};