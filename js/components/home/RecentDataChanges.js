import { icons } from '../../utils/icons.js';

export function RecentDataChanges(changes) {
  const getIcon = (type) => {
    const iconMap = {
      'ColumnAdded': 'plusSquare',
      'ColumnRemoved': 'minusSquare',
      'DataUpdated': 'refreshCw',
      'TableCreated': 'table',
      'TableDeleted': 'trash2',
      'PermissionChanged': 'shieldCheck',
      'ReportModified': 'fileText',
      'AggregateModified': 'calculator',
      'LookupAdded': 'gitMerge',
      'ImportUpdated': 'import'
    };
    return iconMap[type] || 'alertCircle';
  };

  return `
    <div class="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h2>
      <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div class="space-y-1">
          ${changes.map(change => `
            <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-2 min-w-0">
                <div class="p-1 bg-blue-50 rounded-md flex-shrink-0">
                  ${icons[getIcon(change.type)]({ class: 'w-4 h-4 text-blue-600' })}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center space-x-1">
                    <span class="text-sm font-medium text-gray-900 truncate">
                      ${change.assetName}
                    </span>
                    <span class="text-xs text-gray-500 flex-shrink-0">(${change.assetType})</span>
                    <span class="text-xs font-medium text-gray-700 bg-gray-200 px-1 py-0 rounded-md flex-shrink-0">
                      ${change.affectedAssets} Affected
                    </span>
                  </div>
                  <div class="text-xs text-gray-600 break-words">
                    ${change.message} by <strong>${change.changedBy}</strong> at ${change.timestamp}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}