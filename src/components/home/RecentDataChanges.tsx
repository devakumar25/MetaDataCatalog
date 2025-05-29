import React from 'react';
import * as Icons from 'lucide-react';

interface RecentDataChangesProps {
  changes: RecentDataChange[];
}

export const RecentDataChanges: React.FC<RecentDataChangesProps> = ({ changes }) => {
  const getIcon = (type: string) => {
    const iconMap: { [key: string]: keyof typeof Icons } = {
      'ColumnAdded': 'PlusSquare',
      'ColumnRemoved': 'MinusSquare',
      'DataUpdated': 'RefreshCw',
      'TableCreated': 'Table',
      'TableDeleted': 'Trash2',
      'PermissionChanged': 'ShieldCheck',
      'ReportModified': 'FileText'
    };
    const Icon = Icons[iconMap[type] || 'AlertCircle'];
    return <Icon className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h2>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="space-y-1">
          {changes.map((change) => (
            <div
              key={change.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1 bg-blue-50 rounded-md flex-shrink-0">
                  {getIcon(change.type)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {change.assetName}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">({change.assetType})</span>
                            <span className="text-xs font-medium text-gray-700 bg-gray-200 px-1 py-0 rounded-md flex-shrink-0">
                {change.affectedAssets} Affected
              </span>
                  </div>
                 <div className="text-xs text-gray-600 break-words">
                    {change.message} by <strong>{change.changedBy}</strong> at {change.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};