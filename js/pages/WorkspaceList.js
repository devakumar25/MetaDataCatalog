import { getWorkspaces } from '../data/mockData.js';
import { WorkspaceTile } from '../components/WorkspaceTile.js';
import { icons } from '../utils/icons.js';

export class WorkspaceListPage {
  constructor() {
    this.workspaces = getWorkspaces();
    this.searchQuery = '';
    this.sortOption = 'Most Recent';
    this.showUserMenu = false;
    
    // User data
    this.user = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'JD'
    };
  }
  
  mount() {
    // Add event listeners
    this.setupEventListeners();
  }
  
  unmount() {
    // Clean up event listeners
    this.cleanupEventListeners();
  }
  
  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('workspace-search');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearchInput.bind(this));
    }
    
    // Sort select
    const sortSelect = document.getElementById('workspace-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', this.handleSortChange.bind(this));
    }
    
    // User menu toggle
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
      userMenuButton.addEventListener('click', this.toggleUserMenu.bind(this));
    }
    
    // Document click to close user menu
    document.addEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  cleanupEventListeners() {
    const searchInput = document.getElementById('workspace-search');
    if (searchInput) {
      searchInput.removeEventListener('input', this.handleSearchInput.bind(this));
    }
    
    const sortSelect = document.getElementById('workspace-sort');
    if (sortSelect) {
      sortSelect.removeEventListener('change', this.handleSortChange.bind(this));
    }
    
    const userMenuButton = document.getElementById('user-menu-button');
    if (userMenuButton) {
      userMenuButton.removeEventListener('click', this.toggleUserMenu.bind(this));
    }
    
    document.removeEventListener('click', this.handleDocumentClick.bind(this));
  }
  
  handleSearchInput(e) {
    this.searchQuery = e.target.value;
    this.updateWorkspacesList();
  }
  
  handleSortChange(e) {
    this.sortOption = e.target.value;
    this.updateWorkspacesList();
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
  
  updateWorkspacesList() {
    const workspacesContainer = document.getElementById('workspaces-container');
    if (!workspacesContainer) return;
    
    const filteredAndSortedWorkspaces = this.getFilteredAndSortedWorkspaces();
    
    workspacesContainer.innerHTML = '';
    
    filteredAndSortedWorkspaces.forEach(workspace => {
      const workspaceElement = document.createElement('div');
      workspaceElement.className = 'workspace-item';
      workspaceElement.innerHTML = WorkspaceTile(workspace, this.handleToggleFavorite.bind(this));
      
      workspaceElement.addEventListener('click', () => {
        window.location.href = `/workspace/${workspace.id}`;
      });
      
      workspacesContainer.appendChild(workspaceElement);
    });
  }
  
  getFilteredAndSortedWorkspaces() {
    let filtered = this.workspaces.filter(workspace =>
      workspace.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      workspace.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      switch (this.sortOption) {
        case 'Most Recent':
          return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
        case 'Created Time':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'Assets':
          return b.assetsCount - a.assetsCount;
        default:
          return 0;
      }
    });
  }
  
  handleToggleFavorite(id, e) {
    if (e) {
      e.stopPropagation();
    }
    
    this.workspaces = this.workspaces.map(workspace =>
      workspace.id === id
        ? { ...workspace, isFavorite: !workspace.isFavorite }
        : workspace
    );
    
    this.updateWorkspacesList();
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
  
  render() {
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-gray-50';
    
    container.innerHTML = `
      <header class="bg-white border-b border-gray-200">
        <div class="w-full px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-8">
              <div class="flex items-center space-x-3">
                ${icons.database({ class: 'w-6 h-6 text-blue-600' })}
                <h1 class="text-xl font-semibold text-gray-900">Metadata Catalog</h1>
              </div>
            </div>
            
            <div class="flex items-center space-x-8">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  ${icons.search({ class: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' })}
                  <input
                    id="workspace-search"
                    type="text"
                    placeholder="Search workspaces..."
                    class="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div class="flex items-center space-x-2">
                  ${icons.sortDesc({ class: 'w-4 h-4 text-gray-500' })}
                  <select
                    id="workspace-sort"
                    class="text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Most Recent</option>
                    <option>Created Time</option>
                    <option>Assets</option>
                  </select>
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
        </div>
      </header>

      <main class="w-full px-6 py-6">
        <div class="mb-4">
          <h2 class="text-lg font-medium text-gray-900">All Workspaces</h2>
          <p class="text-sm text-gray-500">Browse and manage your analytics workspaces</p>
        </div>
        <div id="workspaces-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <!-- Workspaces will be rendered here -->
        </div>
      </main>
    `;
    
    return container;
  }
}