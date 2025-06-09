import { icons } from '../../utils/icons.js';
import { formatDistanceToNow } from '../../utils/dateUtils.js';

export function DataFreshness(issues) {
  const TABS = ['Failures', 'Performance', 'Inactivity'];
  
  const failures = Array.from({ length: 12 }, (_, i) => ({
    id: `failure-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i],
    type: (['Table', 'QueryTable', 'Schedule', 'Alert', 'Workspace Backup', 'Import'])[Math.floor(Math.random() * 6)],
    lastFailedAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    failureCount: Math.floor(Math.random() * 5) + 1,
    category: 'Failures'
  }));

  const performance = Array.from({ length: 10 }, (_, i) => ({
    id: `performance-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i],
    type: 'QueryTable',
    syncTime: `${Math.floor(Math.random() * 20) + 10} mins`,
    suggestion: i % 2 === 0 ? 'Please remove the duplicate join condition' : 'Consider archiving unwanted base table rows',
    category: 'Performance'
  }));

  const inactivity = Array.from({ length: 10 }, (_, i) => ({
    id: `inactivity-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i], 
    type: i % 4 === 0 ? 'Data Cluster' : 'Report',
    lastAccessed: `${Math.floor(Math.random() * 100) + 10} days`,
    suggestion: i % 4 === 0 ? `Review this inactive data cluster and remove ${Math.floor(Math.random() * 100) + 10} dependent views` : 'This report is inactive, consider removing it',
    category: 'Inactivity'
  }));

  const allIssues = [...failures, ...performance, ...inactivity];

  const getIcon = (type) => {
    const iconMap = {
      'Table': 'table',
      'QueryTable': 'table',
      'Schedule': 'zap',
      'Alert': 'zap',
      'Workspace Backup': 'databaseBackup',
      'Import': 'import',
      'Report': 'barChart',
      'Data Cluster': 'box'
    };
    return iconMap[type] || 'table';
  };

  return `
    <div class="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 class="text-lg font-semibold text-gray-900 mb-2">Observation & Recommendations</h2>

      <!-- Tabs -->
      <div class="flex border-b mb-3">
        ${TABS.map((tab, index) => `
          <button
            class="freshness-tab px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              index === 0 ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }"
            data-tab="${tab}"
          >
            ${tab}
          </button>
        `).join('')}
      </div>

      <!-- Issues List -->
      <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        ${TABS.map((tab, index) => `
          <div class="freshness-content space-y-1" data-content="${tab}" style="display: ${index === 0 ? 'block' : 'none'}">
            ${allIssues.filter(issue => issue.category === tab).map(issue => `
              <div class="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors">
                <div class="flex items-center space-x-2 min-w-0">
                  <div class="p-1 bg-red-50 rounded-md flex-shrink-0">
                    ${icons[getIcon(issue.type)]({ class: 'w-4 h-4 text-red-600' })}
                  </div>
                  <div class="min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate">
                      ${issue.name}                   
                      ${tab !== 'Failures' ? `<span class="text-xs text-gray-500 ml-1">(${issue.type})</span>` : ''}
                    </div>
                    ${tab === 'Failures' 
                      ? `<div class="text-xs text-gray-500">${issue.type}</div>` 
                      : issue.suggestion 
                        ? `<div class="text-xs text-gray-600 italic">${issue.suggestion}</div>`
                        : ''}
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  ${issue.failureCount !== undefined 
                    ? `<div class="text-xs text-red-600">Failed ${issue.failureCount} times</div>` 
                    : ''}
                  ${issue.lastFailedAt 
                    ? `<div class="text-xs text-gray-500">Last failed ${formatDistanceToNow(new Date(issue.lastFailedAt))}</div>` 
                    : ''}
                  ${issue.syncTime 
                    ? `<div class="text-xs text-gray-500">Refresh Time: ${issue.syncTime}</div>` 
                    : ''}
                  ${issue.lastAccessed 
                    ? `<div class="text-xs text-gray-500">Last accessed ${issue.lastAccessed} ago</div>` 
                    : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}