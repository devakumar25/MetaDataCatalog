import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Column {
  id: string;
  name: string;
  dataType: string;
  defaultValue: string | null;
  description?: string;
  tags: string[];
  isMandatory?: boolean;
  isUnique?: boolean;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: {
    table: string;
    column: string;
  };
}

interface ColumnsProps {
  columns: Column[];
  onViewDetails: (columnId: string) => void;
}

export const Columns: React.FC<ColumnsProps> = ({ columns, onViewDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags and their counts
  const tagCounts = columns.reduce((acc: Record<string, number>, column) => {
    column.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const filteredColumns = columns.filter(column => {
    const matchesSearch = column.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         column.dataType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         column.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => column.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType.toLowerCase()) {
      case 'string':
        return <Icons.Type className="w-4 h-4" />;
      case 'number':
        return <Icons.Hash className="w-4 h-4" />;
      case 'boolean':
        return <Icons.ToggleLeft className="w-4 h-4" />;
      case 'date':
        return <Icons.Calendar className="w-4 h-4" />;
      case 'object':
        return <Icons.Box className="w-4 h-4" />;
      case 'array':
        return <Icons.List className="w-4 h-4" />;
      default:
        return <Icons.Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search columns..."
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
            {tag} ({count})
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredColumns.map(column => (
          <div
            key={column.id}
            className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="p-2 bg-blue-50 rounded-lg">
                {getDataTypeIcon(column.dataType)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{column.name}</h4>
                  <div className="flex gap-1">
                    {column.isMandatory && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        Required
                      </span>
                    )}
                    {column.isPrimaryKey && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        PK
                      </span>
                    )}
                    {column.isForeignKey && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        FK
                      </span>
                    )}
                    {column.isUnique && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Unique
                      </span>
                    )}
                    {column.tags.includes('pii') && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        PII
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-gray-500">{column.dataType}</span>
                  {column.defaultValue && (
                    <span className="text-sm text-gray-500">
                      Default: {column.defaultValue}
                    </span>
                  )}
                </div>
                {column.description && (
                  <p className="text-sm text-gray-600 mt-1">{column.description}</p>
                )}
                {column.references && (
                  <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                    <Icons.GitMerge className="w-4 h-4" />
                    <span>References {column.references.table}.{column.references.column}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onViewDetails(column.id)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Icons.Info className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};