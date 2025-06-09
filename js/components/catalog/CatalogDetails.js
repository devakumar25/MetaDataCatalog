import { icons } from '../../utils/icons.js';
import { mockDataSources } from './mockData.js';

export function CatalogDetails() {
  return `
    <div class="h-full flex overflow-hidden">
      <div class="w-[70%] flex flex-col overflow-hidden border-r border-gray-200">
        <!-- Fixed Header Section -->
        <div class="flex-shrink-0 p-6 pb-0 bg-white border-b border-gray-200">
          <!-- Search Bar -->
          <div class="mb-4">
            <div class="relative">
              ${icons.search({ class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' })}
              <input
                type="text"
                placeholder="Search data sources..."
                class="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="data-source-search"
              />
            </div>
          </div>
        </div>

        <!-- Scrollable Content Section -->
        <div class="flex-1 p-6 grid grid-cols-3 gap-6 overflow-hidden">
          <div class="h-full overflow-hidden">
            ${renderDataSourceSection(
              'Files and Feeds',
              'Connect to files and data feeds',
              'fileText',
              mockDataSources['files-and-feeds']
            )}
          </div>
          <div class="h-full overflow-hidden">
            ${renderDataSourceSection(
              'Local & Cloud Data Sources',
              'Connect to cloud databases and storage',
              'cloud',
              mockDataSources['cloud-sources']
            )}
          </div>
          <div class="h-full overflow-hidden">
            ${renderDataSourceSection(
              'Business Applications',
              'Connect to business tools and apps',
              'briefcase',
              mockDataSources['business-apps']
            )}
          </div>
        </div>
      </div>

      <!-- Asset List (30%) -->
      <div class="w-[30%] flex flex-col overflow-hidden bg-gray-50">
        <div class="flex-shrink-0 p-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            All Views
          </h2>
          <div class="relative">
            ${icons.search({ class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' })}
            <input
              type="text"
              placeholder="Search assets..."
              class="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="asset-search"
            />
          </div>
        </div>
        <div class="flex-1 p-4 overflow-y-auto asset-view-scroll">
          ${renderAssetView()}
        </div>
      </div>
    </div>
  `;
}

function renderDataSourceSection(title, description, iconName, sources) {
  return `
    <div class="flex flex-col h-full">
      <!-- Fixed Header -->
      <div class="flex items-center justify-between mb-4 bg-white">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-blue-50 rounded-lg">
            ${icons[iconName]({ class: 'w-6 h-6 text-blue-600' })}
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <h3 class="text-lg font-medium text-gray-900">${title}</h3>
              <span class="text-sm text-gray-500">(${sources.length})</span>
            </div>
            <p class="text-sm text-gray-500">${description}</p>
          </div>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto pr-2 -mr-2">
        <div class="space-y-4">
          ${sources.map(source => renderDataSourceTile(source)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderDataSourceTile(source) {
  const itemCount = source.tables?.length || source.connections?.length || source.clients?.length || 0;
  const hasMultipleItems = itemCount > 0;

  return `
    <div class="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors data-source-tile" data-id="${source.id}">
      <div class="p-4 cursor-pointer">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-blue-50 rounded-lg">
              ${icons[source.icon]({ class: 'w-5 h-5 text-blue-600' })}
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">${source.name}</h3>
              <p class="pt-1 text-xs text-gray-500">
                ${source.type}
                ${hasMultipleItems ? `
                  <span class="ml-2 text-blue-600">
                    ${source.tables ? `${itemCount} tables` : 
                     source.connections ? `${itemCount} connections` :
                     `${itemCount} connections`}
                  </span>
                ` : ''}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            ${!hasMultipleItems ? `
              <button class="p-1 hover:bg-gray-100 rounded-md data-source-info-btn" data-id="${source.id}">
                ${icons.info({ class: 'w-4 h-4 text-gray-400 hover:text-blue-600' })}
              </button>
            ` : `
              <button class="p-1 hover:bg-gray-100 rounded-md data-source-expand-btn" data-id="${source.id}">
                ${icons.chevronDown({ class: 'w-4 h-4 transition-transform' })}
              </button>
            `}
          </div>
        </div>
        ${!hasMultipleItems && source.lastSync ? `
          <p class="text-xs text-gray-500 mt-1">
            Last synced: ${new Date(source.lastSync).toLocaleString()}
          </p>
        ` : ''}
      </div>
      <div class="data-source-items border-t border-gray-200 divide-y divide-gray-200" style="display: none;" data-source-id="${source.id}">
        ${renderDataSourceItems(source)}
      </div>
    </div>
  `;
}

function renderDataSourceItems(source) {
  if (source.tables) {
    return source.tables.map((table, index) => `
      <div class="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 data-source-item" data-source-id="${source.id}" data-item-index="${index}">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${table.name}</p>
            <div class="flex items-center space-x-4">
              <p class="text-xs text-gray-500">${table.rowCount.toLocaleString()} rows</p>
              <p class="text-xs text-gray-500">
                Last synced: ${new Date(table.lastSync).toLocaleString()}
              </p>
            </div>
          </div>
          <button class="p-1 hover:bg-gray-200 rounded-md data-source-item-info-btn" data-source-id="${source.id}" data-item-index="${index}">
            ${icons.info({ class: 'w-4 h-4 text-gray-400 hover:text-blue-600' })}
          </button>
        </div>
      </div>
    `).join('');
  }

  if (source.connections) {
    return source.connections.map((conn, index) => `
      <div class="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 data-source-item" data-source-id="${source.id}" data-item-index="${index}">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${conn.name}</p>
            <div class="flex items-center space-x-4">
              <p class="text-xs text-gray-500">${conn.dbType}</p>
              <p class="text-xs text-gray-500">
                Last synced: ${new Date(conn.lastSync).toLocaleString()}
              </p>
            </div>
          </div>
          <button class="p-1 hover:bg-gray-200 rounded-md data-source-item-info-btn" data-source-id="${source.id}" data-item-index="${index}">
            ${icons.info({ class: 'w-4 h-4 text-gray-400 hover:text-blue-600' })}
          </button>
        </div>
      </div>
    `).join('');
  }

  if (source.clients) {
    return source.clients.map((client, index) => `
      <div class="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 data-source-item" data-source-id="${source.id}" data-item-index="${index}">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-900">${client.name}</p>
            <p class="text-xs text-gray-500">
              Last synced: ${new Date(client.lastSync).toLocaleString()}
            </p>
          </div>
          <button class="p-1 hover:bg-gray-200 rounded-md data-source-item-info-btn" data-source-id="${source.id}" data-item-index="${index}">
            ${icons.info({ class: 'w-4 h-4 text-gray-400 hover:text-blue-600' })}
          </button>
        </div>
      </div>
    `).join('');
  }

  return '';
}

function renderAssetView() {
  return `
    <div>
      <div class="flex justify-end mb-2">
        <button class="text-sm text-blue-600 hover:text-blue-700 font-medium toggle-all-btn">
          Expand All
        </button>
      </div>
      <div class="space-y-2 asset-sections">
        ${renderAssetSection('Tables', 'table')}
        ${renderAssetSection('Query Tables', 'tableProperties')}
        ${renderAssetSection('Reports', 'barChart')}
        ${renderAssetSection('Dashboards', 'layoutDashboard')}
      </div>
    </div>
  `;
}

function renderAssetSection(type, iconName) {
  return `
    <div class="bg-white rounded-lg border border-gray-200 asset-section" data-type="${type}">
      <button class="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 asset-section-toggle" data-type="${type}">
        <div class="flex items-center space-x-3">
          ${icons[iconName]({ class: 'w-5 h-5 text-gray-500' })}
          <span class="text-sm font-medium text-gray-900">
            ${type} (${Math.floor(Math.random() * 100)})
          </span>
        </div>
        ${icons.chevronDown({ class: 'w-5 h-5 text-gray-400 transition-transform asset-section-icon' })}
      </button>
      <div class="border-t border-gray-200 divide-y divide-gray-200 asset-section-content" style="display: none;" data-type="${type}">
        ${Array.from({ length: 5 }, (_, i) => `
          <div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 asset-item">
            <div>
              <p class="text-sm font-medium text-gray-900">Asset ${i + 1}</p>
              <p class="text-xs text-gray-500">${type}</p>
            </div>
            <button class="p-1 hover:bg-gray-100 rounded-md asset-info-btn">
              ${icons.info({ class: 'w-4 h-4 text-gray-400' })}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}