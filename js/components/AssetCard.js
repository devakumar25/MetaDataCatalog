import { icons } from '../utils/icons.js';

export function AssetCard(asset) {
  const formattedDate = new Date(asset.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  function getAssetIcon(type) {
    const iconMap = {
      'Data Sources': 'database',
      'Tables': 'table',
      'Query Tables': 'tableProperties',
      'Columns': 'gitBranch',
      'Relationships': 'gitMerge',
      'Custom Formulas': 'calculator',
      'Variables': 'variable',
      'Filter Criteria': 'filter',
      'Aggregate Formulas': 'calculator',
      'Data Cache Tables': 'database',
      'Reports': 'barChart',
      'Dashboards': 'layoutDashboard',
      'Users': 'user',
      'ML Models': 'brain',
      'Slideshows': 'presentation',
      'Portals': 'layout'
    };

    return iconMap[type] || 'file';
  }

  function getTagStyle(tag) {
    switch (tag) {
      case 'pii':
        return 'bg-red-100 text-red-800';
      case 'lookup':
        return 'bg-purple-100 text-purple-800';
      case 'no-dependents':
        return 'bg-gray-100 text-gray-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'refresh-failed':
        return 'bg-orange-100 text-orange-800';
      case 'long-running':
        return 'bg-blue-100 text-blue-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  const iconName = getAssetIcon(asset.type);

  return `
    <div class="asset-card">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-50 rounded-lg">
            ${icons[iconName]({ class: 'w-6 h-6 text-blue-600' })}
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">${asset.name}</h3>
            <p class="text-sm text-gray-500">${asset.type}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors asset-lineage-btn" data-id="${asset.id}">
            ${icons.network({ class: 'w-5 h-5' })}
          </button>
          <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors asset-info-btn" data-id="${asset.id}">
            ${icons.info({ class: 'w-5 h-5' })}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p class="text-sm text-gray-500">Created by</p>
          <p class="text-sm font-medium">${asset.createdBy}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Created on</p>
          <p class="text-sm font-medium">${formattedDate}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Shared with</p>
          <p class="text-sm font-medium">${asset.sharedUsersCount} users</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Data Sources</p>
          <p class="text-sm font-medium">${asset.dataSourcesCount}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Downstream Assets</p>
          <p class="text-sm font-medium">${asset.downstreamAssetsCount}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        ${Array.isArray(asset.tags) ? asset.tags.map(tag => `
          <span class="px-2 py-1 rounded-full text-xs font-medium ${getTagStyle(tag)}">
            ${tag.replace('-', ' ')}
          </span>
        `).join('') : ''}
      </div>
    </div>
  `;
}