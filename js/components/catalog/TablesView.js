import { icons } from '../../utils/icons.js';

export function TablesView() {
  // Mock data for tables
  const mockTables = Array.from({ length: 20 }, (_, i) => ({
    id: `table-${i + 1}`,
    name: [
      'Customer Orders',
      'Product Inventory',
      'Sales Transactions',
      'User Profiles',
      'Marketing Campaigns',
      'Employee Records',
      'Supplier Data',
      'Shipping Details',
      'Payment Transactions',
      'Customer Support'
    ][Math.floor(Math.random() * 10)],
    rowCount: Math.floor(Math.random() * 1000000) + 1000,
    mainEngineSync: {
      status: Math.random() > 0.2 ? 'success' : 'failed',
      lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
    },
    readEngine1Sync: {
      status: Math.random() > 0.2 ? 'success' : 'failed',
      lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
    },
    readEngine2Sync: {
      status: Math.random() > 0.2 ? 'success' : 'failed',
      lastSync: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
    },
    downstreamAssetsCount: Math.floor(Math.random() * 100),
    tags: [
      ...(Math.random() > 0.4 ? ['sync-failed'] : []),
      ...(Math.random() > 0.5 ? ['long-running'] : []),
      ...(Math.random() > 0.6 ? ['pipeline-table'] : [...Math.random() > 0.7 ? ['snapshot-table'] : ['custom-code-table']]),
    ]
  }));

  const tagCounts = {
    'sync-failed': mockTables.filter(t => t.tags.includes('sync-failed')).length,
    'long-running': mockTables.filter(t => t.tags.includes('long-running')).length,
    'pipeline-table': mockTables.filter(t => t.tags.includes('pipeline-table')).length,
    'snapshot-table': mockTables.filter(t => t.tags.includes('snapshot-table')).length,
    'custom-code-table': mockTables.filter(t => t.tags.includes('custom-code-table')).length
  };

  function getSyncStatusColor(status) {
    return status === 'success' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  }

  function getSyncStatusIcon(status) {
    return status === 'success' ? 
      icons.checkCircle({ class: 'w-4 h-4' }) : 
      icons.xCircle({ class: 'w-4 h-4' });
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  return `
    <div class="p-4">
      <!-- Header Controls -->
      <div class="mb-6 space-y-4 ">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 flex-1">
            <div class="relative flex-1 max-w-md">
              ${icons.search({ class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' })}
              <input
                type="text"
                placeholder="Search tables..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                id="table-search"
              />
            </div>
            <button
              class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="column-selector-button"
            >
              <div class="flex items-center space-x-2">
                ${icons.columns({ class: 'w-4 h-4' })}
                <span>Show/Hide Columns</span>
              </div>
            </button>
          </div>
        </div>

        <div class="mb-6 grid grid-cols-2 gap-4">
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Total Tables</div>
            <div class="text-2xl font-semibold">20</div>
          </div>
          <div class="bg-white p-4 rounded-lg border border-gray-200">
            <div class="text-sm text-gray-500">Total Rows</div>
            <div class="text-2xl font-semibold">1,13,42,536</div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2">
          ${Object.entries(tagCounts).map(([tag, count]) => `
            <button
              class="tag-filter-btn px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
              data-tag="${tag}"
            >
              ${tag.replaceAll('-', ' ')} (${count})
            </button>
          `).join('')}
        </div>

        <!-- Column Selector Dropdown (hidden by default) -->
        <div id="column-selector" class="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-64" style="display: none;">
          <div class="p-2">
            <!-- Column checkboxes will be rendered here -->
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 table">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Table Name
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="name">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Row Count
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="rowCount">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Storage Engine
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="mainEngineSync">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Compute Engine 1
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="readEngine1Sync">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Compute Engine 2
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="readEngine2Sync">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div class="flex items-center">
                    Downstream Assets
                    <span class="ml-2 inline-flex cursor-pointer sort-header" data-key="downstreamAssetsCount">
                      ${icons.arrowUpDown({ class: 'w-4 h-4 text-gray-300' })}
                    </span>
                  </div>
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              ${mockTables.map(table => `
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                        ${icons.table({ class: 'h-4 w-4 text-blue-600' })}
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          ${table.name}
                        </div>
                        <div class="flex gap-1 mt-1">
                          ${table.tags.map(tag => `
                            <span
                              class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                ${tag === 'sync-failed' ? 'bg-red-100 text-red-800' : ''}
                                ${tag === 'long-running' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${tag === 'pipeline-table' ? 'bg-blue-100 text-blue-800' : ''}
                                ${tag === 'snapshot-table' ? 'bg-orange-100 text-orange-800' : ''}
                                ${tag === 'custom-code-table' ? 'bg-stone-100 text-stone-800' : ''}"
                            >
                              ${tag.replaceAll('-', ' ')}
                            </span>
                          `).join('')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      ${table.rowCount.toLocaleString()}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <span class="p-1 rounded-full ${getSyncStatusColor(table.mainEngineSync.status)}">
                        ${getSyncStatusIcon(table.mainEngineSync.status)}
                      </span>
                      <span class="text-sm text-gray-500">
                        ${formatDate(table.mainEngineSync.lastSync)}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <span class="p-1 rounded-full ${getSyncStatusColor(table.readEngine1Sync.status)}">
                        ${getSyncStatusIcon(table.readEngine1Sync.status)}
                      </span>
                      <span class="text-sm text-gray-500">
                        ${formatDate(table.readEngine1Sync.lastSync)}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center space-x-2">
                      <span class="p-1 rounded-full ${getSyncStatusColor(table.readEngine2Sync.status)}">
                        ${getSyncStatusIcon(table.readEngine2Sync.status)}
                      </span>
                      <span class="text-sm text-gray-500">
                        ${formatDate(table.readEngine2Sync.lastSync)}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      ${table.downstreamAssetsCount}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <button class="text-gray-400 hover:text-blue-600 table-lineage-btn" data-name="${table.name}">
                        ${icons.network({ class: 'w-5 h-5' })}
                      </button>
                      <button class="text-gray-400 hover:text-blue-600 table-info-btn" data-id="${table.id}">
                        ${icons.info({ class: 'w-5 h-5' })}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}