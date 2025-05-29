{/* Update the header section */}
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SortDesc, Database, Home, User } from 'lucide-react';
import { WorkspaceTile } from '../components/WorkspaceTile';
import { getWorkspaces } from '../data/mockData';
import { Workspace, SortOption } from '../types/workspace';

function WorkspaceList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('Most Recent');
  const [workspaces, setWorkspaces] = useState(getWorkspaces());
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD'
  };

  const filteredAndSortedWorkspaces = useMemo(() => {
    let filtered = workspaces.filter(workspace =>
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workspace.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
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
  }, [workspaces, searchQuery, sortOption]);

  const handleToggleFavorite = (id: string) => {
    setWorkspaces(workspaces.map(workspace =>
      workspace.id === id
        ? { ...workspace, isFavorite: !workspace.isFavorite }
        : workspace
    ));
  };

  const handleWorkspaceClick = (id: string) => {
    navigate(`/workspace/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <Database className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Metadata Catalog</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search workspaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <SortDesc className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="text-sm border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option>Most Recent</option>
                    <option>Created Time</option>
                    <option>Assets</option>
                  </select>
                </div>
              </div>

              {/* User Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">{user.avatar}</span>
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        // Handle sign out
                        console.log('Sign out');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-900">All Workspaces</h2>
          <p className="text-sm text-gray-500">Browse and manage your analytics workspaces</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAndSortedWorkspaces.map((workspace) => (
            <div key={workspace.id} onClick={() => handleWorkspaceClick(workspace.id)}>
              <WorkspaceTile
                workspace={workspace}
                onToggleFavorite={(id) => {
                  handleToggleFavorite(id);
                  event?.stopPropagation();
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default WorkspaceList;