import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../types/assets';
import { mockAssets } from '../data/searchData';
import { AssetCard } from '../components/AssetCard';
import { assetCounts } from '../data/homeData';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags and their counts
  const tagCounts = mockAssets.reduce((acc: Record<string, number>, asset) => {
    asset.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  // Get unique types and their counts, maintaining the order from assetCounts
  const typeCounts = mockAssets.reduce((acc: Record<string, number>, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {});

  // Organize types based on assetCounts groups
  const organizedTypes = assetCounts.map(group => ({
    group: group.group,
    types: group.assets.map(asset => ({
      name: asset.name.replace(/ /g, ' '),
      count: typeCounts[asset.name] || 0
    }))
  }));

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || asset.type === selectedType;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => asset.tags.includes(tag));
    return matchesSearch && matchesType && matchesTags;
  });

  return (
    <div className="w-full px-4">
      <div className="mb-6 space-y-4">
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
          <div className="relative w-64">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="All">All Types</option>
              {organizedTypes.map((group, index) => (
                <React.Fragment key={group.group}>
                  {index > 0 && (
                    <option disabled className="bg-gray-100">
                      ─────────────
                    </option>
                  )}
                  <option disabled className="font-medium bg-gray-50">
                    {group.group}
                  </option>
                  {group.types.map(type => (
                    <option key={type.name} value={type.name}>
                      {type.name} ({type.count})
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </select>
            <Icons.ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredAssets.map(asset => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
};

export default Search;