import { getWorkspaces } from '../data/mockData.js';
import { HomePage } from './Home.js';
import { CatalogPage } from './Catalog.js';
import { SearchPage } from './Search.js';
import { icons } from '../utils/icons.js';

export class WorkspaceDetailPage {
  constructor(params) {
    this.params = params;
    this.workspace = getWorkspaces().find(w => w.id === params.id);
    this.currentSection = '';
    this.isNavExpanded = false;
    this.showUserMenu = false;
    
    // Navigation items
    this.navItems = [
      { id: 'home', icon: 'home', label: 'Home', path: '' },
      { id: 'catalog', icon: 'database', label: 'Catalog', path: 'catalog' },
      { id: 'search', icon: 'search', label: 'Search', path: 'search' },
    ];
    
    // Mock user data
    this.user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'JD'
    };
    
    // Current content component
    this.contentComponent = null;
  }
  
  mount() {
    // Set up event listeners
    this.setupEventListeners();
    
    // Determine current section and render content
    this.determineCurrentSection();
    this.renderContent();
  }
  
  unmount() {
    // Clean up event listeners
    this.cleanupEventListeners();
    
    // Clean up content component
    if (this.contentComponent && typeof this.contentComponent.unmount === 'function') {
      this.contentComponent.unmount();
    }
  }
  
  setupEventListeners() {
    // Navigation hover
    const navSidebar = document.getElementById('nav-sidebar');
    if (navSidebar) {
      navSidebar.addEventListener('mouseenter', this.expandNav.bind(this));
      navSidebar.addEventListener('mouseleave', this.collapseNav.bind(this));
    }
    
    // Navigation items
    this.navItems.forEach(item => {
      const navItem = document.getElementById(`nav-item-${item.id}`);
      if (navItem) {
        navItem.addEventListener('click', () => this.navigateTo(item.path));
      }
    });
    
    // User menu toggle
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
      userMenuButton.addEventListener('click', this.toggleUserMenu.bind(this));
    }
    
    // Document click to close user menu
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  cleanupEventListeners() {
    const navSidebar = document.getElementById('nav-sidebar');
    if (navSidebar) {
      navSidebar.removeEventListener('mouseenter', this.expandNav.bind(this));
      navSidebar.removeEventListener('mouseleave', this.collapseNav.bind(this));
    }
    
    this.navItems.forEach(item => {
      const navItem = document.getElementById(`nav-item-${item.id}`);
      if (navItem) {
        navItem.removeEventListener('click', () => this.navigateTo(item.path));
      }
    });
    
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
      userMenuButton.removeEventListener('click', this.toggleUserMenu.bind(this));
    }
    
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  determineCurrentSection() {
    const path = window.location.pathname;
    const parts = path.split('/');
    
    if (parts.length >= 4) {
      this.currentSection = parts[3] || '';
    } else {
      this.currentSection = '';
    }
    
    // Set active nav item
    this.navItems.forEach(item => {
      const navItem = document.getElementById(`nav-item-${item.id}`);
      if (navItem) {
        if ((item.path === this.currentSection) || 
            (item.path === '' && this.currentSection === '')) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }
  
  expandNav() {
    this.isNavExpanded = true;
    this.updateNavDisplay();
  }
  
  collapseNav() {
    this.isNavExpanded = false;
    this.updateNavDisplay();
  }
  
  updateNavDisplay() {
    const navSidebar = document.getElementById('nav-sidebar');
    const navLabels = document.querySelectorAll('.nav-label');
    
    if (navSidebar) {
      if (this.isNavExpanded) {
        navSidebar.classList.remove('sidebar-collapsed');
        navSidebar.classList.add('sidebar-expanded');
        navLabels.forEach(label => label.style.display = 'block');
      } else {
        navSidebar.classList.add('sidebar-collapsed');
        navSidebar.classList.remove('sidebar-expanded');
        navLabels.forEach(label => label.style.display = 'none');
      }
    }
  }
  
  navigateTo(path) {
    const url = `/workspace/${this.params.id}${path ? '/' + path : ''}`;
    history.pushState(null, '', url);
    
    this.determineCurrentSection();
    this.renderContent();
  }
  
  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.renderUserMenu();
  }
  
  handleDocumentClick(e) {
    const userMenuButton = document.getElementById('user-menu-button');
    const userMenu = document.getElementById('user-menu');
    
    if (this.showUserMenu && userMenuButton && userMenu && 
        !userMenuButton.contains(e.target) && !userMenu.contains(e.target)) {
      this.showUserMenu = false;
      this.renderUserMenu();
    }
  }
  
  renderUserMenu() {
    const userMenuContainer = document.getElementById('user-menu-container');
    if (!userMenuContainer) return;
    
    if (this.showUserMenu) {
      userMenuContainer.innerHTML = `
        <div id="user-menu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div class="px-4 py-2 border-b border-gray-200">
            <p class="text-sm text-gray-600">${this.user.email}</p>
          </div>
          <button
            id="sign-out-button"
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      `;
      
      const signOutButton = document.getElementById('sign-out-button');
      if (signOutButton) {
        signOutButton.addEventListener('click', () => {
          console.log('Sign out');
        });
      }
    } else {
      userMenuContainer.innerHTML = '';
    }
  }
  
  renderContent() {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) return;
    
    // Clean up previous component
    if (this.contentComponent && typeof this.contentComponent.unmount === 'function') {
      this.contentComponent.unmount();
    }
    
    // Create new component based on current section
    switch (this.currentSection) {
      case 'catalog':
        this.contentComponent = new CatalogPage(this.params);
        break;
      case 'search':
        this.contentComponent = new SearchPage();
        break;
      default:
        this.contentComponent = new HomePage(this.workspace);
        break;
    }
    
    // Render component
    contentContainer.innerHTML = '';
    contentContainer.appendChild(this.contentComponent.render());
    
    // Mount component
    if (typeof this.contentComponent.mount === 'function') {
      this.contentComponent.mount();
    }
  }
  
  render() {
    if (!this.workspace) {
      const container = document.createElement('div');
      container.className = 'flex items-center justify-center min-h-screen bg-gray-50';
      container.innerHTML = `
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Workspace Not Found</h1>
          <p class="text-gray-600 mb-6">The workspace you are looking for doesn't exist or has been moved.</p>
          <a href="/" class="btn btn-blue">Go Home</a>
        </div>
      `;
      return container;
    }
    
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-gray-50 flex';
    
    container.innerHTML = `
      <!-- Navigation Sidebar -->
      <div
        id="nav-sidebar"
        class="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 sidebar sidebar-collapsed"
      >
        <nav class="py-3">
          ${this.navItems.map(item => `
            <div
              id="nav-item-${item.id}"
              class="nav-item ${(item.path === this.currentSection) || 
                              (item.path === '' && this.currentSection === '') ? 'active' : ''}"
            >
              <div class="relative group">
                ${icons[item.icon]({ class: 'w-6 h-6' })}
                <div class="tooltip">
                  ${item.label}
                </div>
              </div>
              <span class="nav-label ml-3 text-sm font-medium" style="display: none;">${item.label}</span>
            </div>
          `).join('')}
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 pl-16">
        <header class="bg-white border-b border-gray-200">
          <div class="w-full px-4 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <a href="/" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  ${icons.home({ class: 'w-8 h-8 text-blue-600' })}
                </a>
                <div>
                  <h1 class="text-xl font-semibold text-gray-900">${this.workspace.name}</h1>
                  <div class="flex items-center mt-1">
                    <span class="text-sm text-gray-500">${this.getCurrentSectionLabel()}</span>
                  </div>
                </div>
              </div>

              <!-- User Profile Menu -->
              <div class="relative">
                <button
                  id="user-menu-button"
                  class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-700">${this.user.avatar}</span>
                  </div>
                  <span class="text-sm font-medium">${this.user.name}</span>
                </button>

                <div id="user-menu-container"></div>
              </div>
            </div>
          </div>
        </header>

        <main class="w-full px-4 py-6">
          <div id="content-container"></div>
        </main>
      </div>
    `;
    
    return container;
  }
  
  getCurrentSectionLabel() {
    const item = this.navItems.find(item => 
      (item.path === this.currentSection) || 
      (item.path === '' && this.currentSection === '')
    );
    
    return item ? item.label : 'Home';
  }
}