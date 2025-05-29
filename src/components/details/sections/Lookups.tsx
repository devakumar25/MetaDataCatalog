import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Lookup {
  id: string;
  fromTable: string;
  toTable: string;
  fromColumn: string;
  toColumn: string;
  relationshipType: 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';
  usageCount: number;
  tags: string[];
}

interface LookupProps {
  lookups: Lookup[];
}

export const Lookups: React.FC<LookupProps> = ({ lookups }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tagCounts = lookups.reduce((acc: Record<string, number>, lookup) => {
    lookup.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const getRelationshipIcon = (type: Lookup['relationshipType']) => {
    switch (type) {
      case 'one-to-one':
        return <Icons.ArrowRightLeft className="w-4 h-4" />;
      case 'one-to-many':
        return <Icons.GitBranch className="w-4 h-4" />;
      case 'many-to-one':
        return <Icons.GitMerge className="w-4 h-4" />;
      case 'many-to-many':
        return <Icons.Network className="w-4 h-4" />;
    }
  };

  const getRelationshipTooltip = (type: Lookup['relationshipType']) => {
    return type.split('-').join(' ');
  };

  const filteredLookups = lookups.filter(lookup => {
    const matchesSearch = `${lookup.fromTable} ${lookup.toTable} ${lookup.fromColumn} ${lookup.toColumn}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => lookup.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search lookups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(tagCounts).map(([tag, count]) => (
          <button
            key={tag}
            onClick={() => {
              setSelectedTags(prev => 
                prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
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

      <div className="space-y-3">
        {filteredLookups.map(lookup => (
          <div
            key={lookup.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg group relative">
                  {getRelationshipIcon(lookup.relationshipType)}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded
                                opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {getRelationshipTooltip(lookup.relationshipType)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{lookup.fromTable}</span>
                    <Icons.ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{lookup.toTable}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{lookup.fromColumn}</span>
                    <Icons.ArrowRight className="w-3 h-3" />
                    <span>{lookup.toColumn}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {lookup.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      tag === 'no-dependents'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {tag === 'no-dependents' ? 'No dependents' : `Used in ${lookup.usageCount} reports`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};