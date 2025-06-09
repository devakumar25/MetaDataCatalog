import { icons } from '../utils/icons.js';

export function WorkspaceTile(workspace, onToggleFavorite) {
  const formattedDate = new Date(workspace.lastAccessed).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return `
    <div class="workspace-tile">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-3">
          <div class="p-1.5 bg-blue-50 rounded-md">
            ${icons.barChart2({ class: 'w-5 h-5 text-blue-600' })}
          </div>
          <h3 class="text-base font-medium text-gray-900">${workspace.name}</h3>
        </div>
        <button
          class="favorite-button text-gray-400 hover:text-yellow-400 transition-colors"
          data-id="${workspace.id}"
        >
          ${icons.star({ 
            class: `w-4 h-4 ${workspace.isFavorite ? 'text-yellow-400 fill-yellow-400' : ''}`,
            fill: workspace.isFavorite ? 'currentColor' : 'none'
          })}
        </button>
      </div>
      <p class="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">${workspace.description}</p>
      <div class="space-y-2 text-sm border-t border-gray-100 pt-3 mt-auto">
        <div class="flex items-center text-gray-500">
          ${icons.clock({ class: 'w-4 h-4 mr-2' })}
          <span>Last accessed: ${formattedDate}</span>
        </div>
        <div class="flex items-center text-gray-500">
          ${icons.user({ class: 'w-4 h-4 mr-2' })}
          <span>Created by: ${workspace.createdBy}</span>
        </div>
        <div class="flex items-center justify-between pt-1">
          <span class="text-blue-600 font-medium">${workspace.assetsCount} Assets</span>
          ${icons.chevronRight({ class: 'w-4 h-4 text-gray-400' })}
        </div>
      </div>
    </div>
  `;
}