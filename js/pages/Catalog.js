import { icons } from '../utils/icons.js';
import { CatalogDetails } from '../components/catalog/CatalogDetails.js';
import { TablesView } from '../components/catalog/TablesView.js';

export class CatalogPage {
  constructor(params) {
    this.params = params;
    this.isSidebarCollapsed = false;
    this.expanded = {};
    this.currentSection = '';
    
    // Initialize expanded state for all categories
    this.catalogStructure.forEach(category => {
      this.expanded[category.id] = true;
      if (category.items) {
        category.items.forEach(item => {
          this.expanded[item.id] = true;
        });
      }
    });
  }
  
  get catalogStructure() {
    return [
      {
        id: 'data',
        name: 'Data',
        icon: 'database',
        items: [
          { id: 'data-sources', name: 'Data Sources', icon: 'database', path: 'data-sources' },
          { id: 'tables', name: 'Tables', icon: 'table', path: 'tables' },
          { id: 'query-tables', name: 'Query Tables', icon: 'tableProperties', path: 'query-tables' },
        ],
      },
      {
        id: 'modeling',
        name: 'Modeling',
        icon: 'gitBranch',
        items: [
          { id: 'columns', name: 'Table Data Columns', icon: 'gitBranch', path: 'columns' },
          { id: 'relationships', name: 'Relationships', icon: 'gitMerge', path: 'relationships' },
          { id: 'custom-formulas', name: 'Formula Columns', icon: 'calculator', path: 'custom-formulas' },
          { id: 'variables', name: 'Variables', icon: 'variable', path: 'variables' },
          { id: 'filter-criteria', name: 'Filters', icon: 'filter', path: 'filter-criteria' },
          { id: 'aggregate-formulas', name: 'Aggregate Formula Columns', icon: 'calculator', path: 'aggregate-formulas' },
          { id: 'ml-models', name: 'ML Models', icon: 'brain', path: 'ml-models' },
          { id: 'custom-functions', name: 'Custom Code Functions', icon: 'settings', path: 'custom-functions' },
          { id: 'formatting', name: 'Formatting', icon: 'textCursor', path: 'formatting' },
        ],
      },
      {
        id: 'performance',
        name: 'Performance',
        icon: 'zap',
        items: [
          { id: 'data-cache-tables', name: 'Data Cache Tables', icon: 'database', path: 'data-cache-tables' },
        ],
      },
      {
        id: 'visualization',
        name: 'Analytics',
        icon: 'barChart',
        items: [
          { id: 'reports', name: 'Reports', icon: 'barChart', path: 'reports' },
          { id: 'dashboards', name: 'Dashboards', icon: 'layoutDashboard', path: 'dashboards' },
          { id: 'slideshows', name: 'Slideshows', icon: 'presentation', path: 'slideshows' },
          { id: 'portals', name: 'Portals', icon: 'layout', path: 'portals' },
        ],
      },
      {
        id: 'aiml',
        name: 'AI & Automation',
        icon: 'cpu',
        items: [
          { id: 'schedules', name: 'Scheduled Actions', icon: 'clock', path: 'schedules' },
          { id: 'askzia', name: 'Ask Zia', icon: 'zap', path: 'askzia' },
          { id: 'actions', name: 'AI Agents', icon: 'bot', path: 'actions' },
          { id: 'channels', name: 'Channels', icon: 'rss', path: 'channels' },
        ],
      },
      {
        id: 'users-groups',
        name: 'User Management',
        icon: 'userCheck',
        items: [
          { id: 'users', name: 'Users', icon: 'users', path: 'users' },
          { id: 'groups', name: 'Groups', icon: 'share2', path: 'groups' },
          { id: 'roles', name: 'Roles & Permissions', icon: 'shield', path: 'roles' },
        ],
      },
      {
        id: 'complaince',
        name: 'Complaince',
        icon: 'shieldCheck',
      }
    ];
  }
  
  mount() {
    // Set up event listeners
    this.setupEventListeners();
    
    // Determine current section
    this.determineCurrentSection();
    
    // Render content
    this.renderContent();
  }
  
  unmount() {
    // Clean up event listeners
    this.cleanupEventListeners();
  }
  
  setupEventListeners() {
    // Toggle sidebar collapse
    const toggleButton = document.getElementById('sidebar-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', this.toggleSidebar.bind(this));
    }
    
    // Category toggle
    const categoryToggles = document.querySelectorAll('.category-toggle');
    categoryToggles.forEach(toggle => {
      toggle.addEventListener('click', this.handleCategoryToggle.bind(this));
    });
    
    // Category select
    const categorySelects = document.querySelectorAll('.category-select');
    categorySelects.forEach(select => {
      select.addEventListener('click', this.handleCategorySelect.bind(this));
    });
  }
  
  cleanupEventListeners() {
    const toggleButton = document.getElementById('sidebar-toggle');
    if (toggleButton) {
      toggleButton.removeEventListener('click', this.toggleSidebar.bind(this));
    }
    
    const categoryToggles = document.querySelectorAll('.category-toggle');
    categoryToggles.forEach(toggle => {
      toggle.removeEventListener('click', this.handleCategoryToggle.bind(this));
    });
    
    const categorySelects = document.querySelectorAll('.category-select');
    categorySelects.forEach(select => {
      select.removeEventListener('click', this.handleCategorySelect.bind(this));
    });
  }
  
  determineCurrentSection() {
    const path = window.location.pathname;
    const parts = path.split('/');
    
    if (parts.length >= 5) {
      this.currentSection = parts[4] || 'data-sources';
    } else {
      this.currentSection = 'data-sources';
    }
  }
  
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.updateSidebarDisplay();
  }
  
  updateSidebarDisplay() {
    const sidebar = document.getElementById('catalog-sidebar');
    const categoryLabels = document.querySelectorAll('.category-label');
    
    if (sidebar) {
      if (this.isSidebarCollapsed) {
        sidebar.classList.add('sidebar-collapsed');
        sidebar.classList.remove('sidebar-expanded');
        categoryLabels.forEach(label => label.style.display = 'none');
      } else {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-expanded');
        categoryLabels.forEach(label => label.style.display = 'block');
      }
    }
  }
  
  handleCategoryToggle(e) {
    e.stopPropagation();
    const id = e.currentTarget.getAttribute('data-id');
    this.expanded[id] = !this.expanded[id];
    this.updateCategoryDisplay(id);
  }
  
  updateCategoryDisplay(id) {
    const categoryContent = document.getElementById(`category-content-${id}`);
    const categoryIcon = document.getElementById(`category-icon-${id}`);
    
    if (categoryContent && categoryIcon) {
      if (this.expanded[id]) {
        categoryContent.style.display = 'block';
        categoryIcon.innerHTML = icons.chevronDown({ class: 'w-4 h-4' });
      } else {
        categoryContent.style.display = 'none';
        categoryIcon.innerHTML = icons.chevronRight({ class: 'w-4 h-4' });
      }
    }
  }
  
  handleCategorySelect(e) {
    const path = e.currentTarget.getAttribute('data-path');
    if (path) {
      this.navigateTo(path);
    }
  }
  
  navigateTo(path) {
    const url = `/workspace/${this.params.id}/catalog/${path}`;
    history.pushState(null, '', url);
    
    this.currentSection = path;
    this.renderContent();
  }
  
  renderContent() {
    const contentContainer = document.getElementById('catalog-content');
    if (!contentContainer) return;
    
    // Render content based on current section
    switch (this.currentSection) {
      case 'tables':
        contentContainer.innerHTML = TablesView();
        break;
      case 'data-sources':
      default:
        contentContainer.innerHTML = CatalogDetails();
        break;
    }
    
    // Update active category
    this.updateActiveCategory();
  }
  
  updateActiveCategory() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      const path = item.getAttribute('data-path');
      
      if (path === this.currentSection) {
        item.classList.add('bg-blue-50', 'text-blue-600');
      } else {
        item.classList.remove('bg-blue-50', 'text-blue-600');
      }
    });
  }
  
  renderCategoryNode(category, level = 0, isLastItem = false) {
    const hasChildren = category.items && category.items.length > 0;
    const isExpanded = this.expanded[category.id];
    const isActive = 'path' in category && this.currentSection === category.path;
    
    return `
      <div class="relative">
        ${level > 0 && !this.isSidebarCollapsed ? `
          <div
            class="absolute left-0 w-px bg-gray-200 ${isLastItem ? 'h-1/2' : 'h-full'}"
            style="left: ${(level - 1) * 1.5 + 0.5}rem;"
          ></div>
        ` : ''}

        <div
          class="category-item flex items-center py-1.5 px-2 rounded-md cursor-pointer
                hover:bg-gray-100 transition-colors group relative
                ${level === 0 ? 'font-medium' : ''}
                ${isActive ? 'bg-blue-50 text-blue-600' : ''}"
          style="padding-left: ${this.isSidebarCollapsed ? '0.5rem' : `${level * 1.5 + 0.5}rem`};
                 margin-left: ${level > 0 && !this.isSidebarCollapsed ? '0.5rem' : '0'}"
          data-path="${category.path || ''}"
        >
          ${level > 0 && !this.isSidebarCollapsed ? `
            <div
              class="absolute h-px bg-gray-200"
              style="left: ${(level - 1) * 1.5 + 0.5}rem; width: 1rem; top: 50%;"
            ></div>
          ` : ''}

          <div class="flex items-center flex-1 min-w-0 category-select" data-path="${category.path || ''}">
            ${hasChildren ? `
              <button
                class="category-toggle p-0.5 hover:bg-gray-200 rounded mr-1 flex-shrink-0"
                data-id="${category.id}"
              >
                <span id="category-icon-${category.id}">
                  ${isExpanded 
                    ? icons.chevronDown({ class: 'w-4 h-4' })
                    : icons.chevronRight({ class: 'w-4 h-4' })
                  }
                </span>
              </button>
            ` : ''}
            ${(!this.isSidebarCollapsed || !hasChildren) ? `
              <div class="relative flex-shrink-0">
                ${icons[category.icon]({ class: `w-4 h-4 ${this.isSidebarCollapsed ? '' : 'mr-2'}` })}
                ${this.isSidebarCollapsed ? `
                  <div class="tooltip">
                    ${category.name}
                  </div>
                ` : ''}
              </div>
            ` : ''}
            ${!this.isSidebarCollapsed ? `
              <span class="category-label truncate">${category.name}</span>
            ` : ''}
          </div>
        </div>

        ${isExpanded && hasChildren ? `
          <div id="category-content-${category.id}" class="relative">
            ${category.items.map((item, index, array) => 
              this.renderCategoryNode(item, level + 1, index === array.length - 1)
            ).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }
  
  render() {
    const container = document.createElement('div');
    container.className = 'flex h-[calc(100vh-8rem)] -mt-6 w-full';
    
    container.innerHTML = `
      <div id="catalog-sidebar" class="sidebar ${this.isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} asset-view-scroll">
        <div class="p-2 space-y-1">
          ${this.catalogStructure.map((category, index) => `
            ${index > 0 && this.isSidebarCollapsed ? '<hr class="my-2" />' : ''}
            ${this.renderCategoryNode(category)}
          `).join('')}
        </div>
      </div>
      <div id="catalog-content" class="flex-1 overflow-auto">
        <!-- Content will be rendered here -->
      </div>
    `;
    
    return container;
  }
}