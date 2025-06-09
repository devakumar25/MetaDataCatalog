import { icons } from '../../utils/icons.js';
import { formatDistanceToNow } from '../../utils/dateUtils.js';

export function RecentAssets(assets) {
  const getIcon = (type) => {
    const iconMap = {
      'Table': 'table',
      'QueryTable': 'tableProperties',
      'Report': 'barChart',
      'Dashboard': 'layoutDashboard'
    };
    return iconMap[type] || 'file';
  };

  return `
    <div class="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Recent Assets</h2>
      <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div class="space-y-1">
          ${assets.map(asset => `
            <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
              <div class="flex items-center space-x-2 min-w-0">
                <div class="p-1 bg-blue-50 rounded-md flex-shrink-0">
                  ${icons[getIcon(asset.type)]({ class: 'w-4 h-4' })}
                </div>
                <div class="min-w-0">
                  <div class="text-sm font-medium text-gray-900 truncate">${asset.name}</div>
                  <div class="text-xs text-gray-500">${asset.type}</div>
                </div>
              </div>
              <div class="text-xs text-gray-500 flex-shrink-0">
                ${formatDistanceToNow(new Date(asset.lastAccessed))}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}