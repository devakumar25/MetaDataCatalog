import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { RecommendedAction } from '../../../types/assets';
import { getMockRecommendedActions } from '../../../data/mockData';

interface RecommendedActionsProps {
  actions?: RecommendedAction[];
}

export const RecommendedActions: React.FC<RecommendedActionsProps> = ({ 
  actions: initialActions = getMockRecommendedActions() 
}) => {
  const [actions, setActions] = useState(initialActions);

  const handleAction = (id: string, action: 'done' | 'ignore') => {
    setActions(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-4">
      {actions.map(action => (
        <div key={action.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                action.type === 'warning' ? 'bg-yellow-50' :
                action.type === 'error' ? 'bg-red-50' : 'bg-blue-50'
              }`}>
                <Icons.AlertTriangle className={`w-5 h-5 ${
                  action.type === 'warning' ? 'text-yellow-600' :
                  action.type === 'error' ? 'text-red-600' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                <p className="text-xs text-gray-500">{action.category.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                action.priority === 'high' ? 'bg-red-100 text-red-800' :
                action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {action.priority}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                action.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                action.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {action.status.replace('_', ' ')}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3">{action.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Created {new Date(action.createdAt).toLocaleString()}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAction(action.id, 'done')}
                className="px-3 py-1 text-sm font-medium text-green-600 hover:bg-green-50 rounded-md transition-colors"
              >
                Done
              </button>
              <button
                onClick={() => handleAction(action.id, 'ignore')}
                className="px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};