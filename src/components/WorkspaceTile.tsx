import React from 'react';
import { ChevronRight, Star, BarChart2, Clock, User } from 'lucide-react';
import { Workspace } from '../types/workspace';

interface WorkspaceTileProps {
  workspace: Workspace;
  onToggleFavorite: (id: string) => void;
}

export const WorkspaceTile: React.FC<WorkspaceTileProps> = ({
  workspace,
  onToggleFavorite,
}) => {
  const formattedDate = new Date(workspace.lastAccessed).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-md border border-gray-200 p-5 flex flex-col h-full cursor-pointer hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-blue-50 rounded-md">
            <BarChart2 className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base font-medium text-gray-900">{workspace.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(workspace.id);
          }}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <Star
            className={`w-4 h-4 ${workspace.isFavorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
          />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{workspace.description}</p>
      <div className="space-y-2 text-sm border-t border-gray-100 pt-3 mt-auto">
        <div className="flex items-center text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>Last accessed: {formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-500">
          <User className="w-4 h-4 mr-2" />
          <span>Created by: {workspace.createdBy}</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-blue-600 font-medium">{workspace.assetsCount} Assets</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};