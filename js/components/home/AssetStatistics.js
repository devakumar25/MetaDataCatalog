import { icons } from '../../utils/icons.js';

export function AssetStatistics(statistics) {
  return `
    <div class="bg-white rounded-lg shadow-sm p-3 h-full">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Asset Statistics</h2>
      <div class="grid grid-cols-7 gap-3 h-[calc(100%-2.5rem)] scrollbar-thumb-gray-200 scrollbar-track-transparent">
        ${statistics.map(group => `
          <div class="bg-gray-50 rounded-lg p-2 overflow-y-auto scrollbar-thin">
            <h3 class="text-sm font-medium text-gray-700 mb-2">${group.group}</h3>

            <div class="grid gap-2">
              ${group.assets.map(asset => `
                <div
                  class="bg-white rounded-md p-2 flex items-center space-x-2 border border-gray-100 hover:cursor-pointer hover:border-1 hover:border-stone-200 asset-stat-item"
                  data-path="${asset.path}"
                >
                  <div class="flex-shrink-0 p-1 bg-blue-50 rounded-md">
                    ${icons[asset.icon]({ class: 'w-4 h-4' })}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">
                      ${asset.count.toLocaleString()}
                    </div>
                    <div class="text-xs text-gray-600 truncate">${asset.name}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}