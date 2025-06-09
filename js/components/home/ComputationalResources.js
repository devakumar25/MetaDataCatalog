import { icons } from '../../utils/icons.js';

export function ComputationalResources(statistics) {
  return `
    <div class="bg-white rounded-lg shadow-sm p-3">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Storage Metrics</h2>
      <div class="grid grid-cols-1 gap-3 scrollbar-thumb-gray-200 scrollbar-track-transparent">
        ${statistics.map(group => `
          <div class="bg-gray-50 rounded-lg p-2 overflow-x-auto scrollbar-thin">
            <div class="flex gap-2 justify-between overflow-x-auto scrollbar-thin">
              ${group.assets.map(asset => `
                <div
                  class="bg-white rounded-md p-2 flex items-center space-x-2 border border-gray-100 hover:cursor-pointer hover:border-stone-200 w-full storage-metric-item"
                  data-path="${asset.path}"
                >
                  <div class="flex-shrink-0 p-1 bg-blue-50 rounded-md">
                    ${icons[asset.icon]({ class: 'w-4 h-4' })}
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">
                      ${asset.count}
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