import { icons } from '../utils/icons.js';
import { AssetCard } from '../components/AssetCard.js';
import { mockAssets } from '../data/searchData.js';
import { assetCounts } from '../data/homeData.js';

export class SearchPage {
  constructor() {
    this.searchQuery = '';
    this.selectedType = 'All';
    this.selectedTags = [];
  }
  
  mount() {
    // Set up event listeners
    this.setupEventListeners();
    
    // Initial render of assets
    this.updateAssetsList();
  }
  
  unmount() {
    // Clean up event listeners
    this.cleanupEventListeners();
  }
  
  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('asset-search');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearchInput.bind(this));
    }
    
    // Type select
    const typeSelect = document.getElementById('asset-type-select');
    if (typeSelect) {
      typeSelect.addEventListener('change', this.handleTypeChange.bind(this));
    }
    
    // Tag buttons
    const tagButtons = document.querySelectorAll('.tag-button');
    tagButtons.forEach(button => {
      button.addEventListener('click', this.handleTagClick.bind(this));
    });
  }
  
  cleanupEventListeners() {
    const searchInput = document.getElementById('asset-search');
    if (searchInput) {
      searchInput.removeEventListener('input', this.handleSearchInput.bind(this));
    }
    
    const typeSelect = document.getElementById('asset-type-select');
    if (typeSelect) {
      typeSelect.removeEventListener('change', this.handleTypeChange.bind(this));
    }
    
    const tagButtons = document.querySelectorAll('.tag-button');
    tagButtons.forEach(button => {
      button.removeEventListener('click', this.handleTagClick.bind(this));
    });
  }
  
  handleSearchInput(e) {
    this.searchQuery = e.target.value;
    this.updateAssetsList();
  }
  
  handleTypeChange(e) {
    this.selectedType = e.target.value;
    this.updateAssetsList();
  }
  
  handleTagClick(e) {
    const tag = e.currentTarget.getAttribute('data-tag');
    
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
    
    this.updateTagButtons();
    this.updateAssetsList();
  }
  
  updateTagButtons() {
    const tagButtons = document.querySelectorAll('.tag-button');
    tagButtons.forEach(button => {
      const tag = button.getAttribute('data-tag');
      
      if (this.selectedTags.includes(tag)) {
        button.classList.add('bg-blue-100', 'text-blue-800');
        button.classList.remove('bg-gray-100', 'text-gray-600');
      } else {
        button.classList.remove('bg-blue-100', 'text-blue-800');
        button.classList.add('bg-gray-100', 'text-gray-600');
      }
    });
  }
  
  updateAssetsList() {
    const assetsContainer = document.getElementById('assets-container');
    if (!assetsContainer) return;
    
    const filteredAssets = this.getFilteredAssets();
    
    assetsContainer.innerHTML = '';
    
    filteredAssets.forEach(asset => {
      const assetElement = document.createElement('div');
      assetElement.innerHTML = AssetCard(asset);
      assetsContainer.appendChild(assetElement);
    });
  }
  
  getFilteredAssets() {
    return mockAssets.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           asset.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           asset.createdBy.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = this.selectedType === 'All' || asset.type === this.selectedType;
      const matchesTags = this.selectedTags.length === 0 || 
                         this.selectedTags.every(tag => asset.tags.includes(tag));
      return matchesSearch && matchesType && matchesTags;
    });
  }
  
  getTagCounts() {
    return mockAssets.reduce((acc, asset) => {
      asset.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
  }
  
  getOrganizedTypes() {
    // Get unique types and their counts, maintaining the order from assetCounts
    const typeCounts = mockAssets.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {});
    
    // Organize types based on assetCounts groups
    return assetCounts.map(group => ({
      group: group.group,
      types: group.assets.map(asset => ({
        name: asset.name.replace(/ /g, ' '),
        count: typeCounts[asset.name] || 0
      }))
    }));
  }
  
  render() {
    const container = document.createElement('div');
    container.className = 'w-full px-4';
    
    const tagCounts = this.getTagCounts();
    const organizedTypes = this.getOrganizedTypes();
    
    container.innerHTML = `
      <div class="mb-6 space-y-4">
        <div class="flex items-center space-x-4">
          <div class="flex-1 relative">
            ${icons.search({ class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' })}
            <input
              id="asset-search"
              type="text"
              placeholder="Search assets..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="relative w-64">
            <select
              id="asset-type-select"
              class="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="All">All Types</option>
              ${organizedTypes.map((group, index) => `
                ${index > 0 ? `
                  <option disabled class="bg-gray-100">
                    ─────────────
                  </option>
                ` : ''}
                <option disabled class="font-medium bg-gray-50">
                  ${group.group}
                </option>
                ${group.types.map(type => `
                  <option value="${type.name}">
                    ${type.name} (${type.count})
                  </option>
                `).join('')}
              `).join('')}
            </select>
            ${icons.chevronDown({ class: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none' })}
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          ${Object.entries(tagCounts).sort().map(([tag, count]) => `
            <button
              class="tag-button px-3 py-1.5 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"
              data-tag="${tag}"
            >
              ${tag.replace('-', ' ')} (${count})
            </button>
          `).join('')}
        </div>
      </div>

      <div id="assets-container" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <!-- Assets will be rendered here -->
      </div>
    `;
    
    return container;
  }
}