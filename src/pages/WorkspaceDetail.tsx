{/* Add workspace name to the component state */}
import React, { useState } from 'react';
import { useParams, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home, Database, Search, User } from 'lucide-react';
import { getWorkspaces } from '../data/mockData';
import { AssetStatistics } from '../components/home/AssetStatistics';
import { ComputationalResources } from '../components/home/ComputationalResources';
import { RecentAssets } from '../components/home/RecentAssets';
import { DataFreshness } from '../components/home/DataFreshness';
import { RecentDataChanges } from '../components/home/RecentDataChanges';
import { assetCounts, computationalResourcesCount, recentAssets, dataFreshnessIssues, recentDataChanges } from '../data/homeData';
import SearchPage from './Search';
import CatalogPage from './Catalog';
import * as Icons from 'lucide-react';

// Add workspace context
export const WorkspaceContext = React.createContext<{ name: string }>({ name: '' });

function HomePage() {
  const [actions, setActions] = useState('');

  const handleActionComplete = (id: string, action: 'done' | 'ignore') => {
    setActions(actions.filter(a => a.id !== id));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4 px-4 overflow-hidden">
      <div className="h-[30%] min-h-[300px]">
        <AssetStatistics statistics={assetCounts} />
      </div>
      <div className="h-[10%] min-h-[120px]">
        <ComputationalResources statistics={computationalResourcesCount} />
      </div>
      <div className="h-[60%] grid grid-cols-3 gap-4">
        <div className="overflow-hidden">
          <RecentAssets assets={recentAssets} />
        </div>
        <div className="overflow-hidden">
          <RecentDataChanges
            changes={recentDataChanges}
          />       
        </div>
        <div className="overflow-hidden">
          <DataFreshness />

        </div>
      </div>
    </div>
  );
}

const navItems = [
  { id: 'home', icon: Home, label: 'Home', path: '' },
  { id: 'catalog', icon: Database, label: 'Catalog', path: 'catalog' },
  { id: 'search', icon: Search, label: 'Search', path: 'search' },
];

function WorkspaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const workspace = getWorkspaces().find(w => w.id === id);
  const currentSection = navItems.find(item => 
    location.pathname === `/workspace/${id}/${item.path}` || 
    (item.path === '' && location.pathname === `/workspace/${id}`)
  )?.label || 'Home';

  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD'
  };

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return (
    <WorkspaceContext.Provider value={{ name: workspace.name }}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Navigation Sidebar */}
        <div
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50"
          onMouseEnter={() => setIsNavExpanded(true)}
          onMouseLeave={() => setIsNavExpanded(false)}
        >
          <div className={`
            bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out
            ${isNavExpanded ? 'w-48' : 'w-12'}
            overflow-hidden
          `}>
            <nav className="py-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === `/workspace/${id}/${item.path}` || 
                               (item.path === '' && location.pathname === `/workspace/${id}`);
                
                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/workspace/${id}/${item.path}`)}
                    className={`
                      flex items-center px-3 py-2 cursor-pointer transition-colors
                      ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <div className="relative group">
                      <Icon className="w-6 h-6" />
                      {!isNavExpanded && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded 
                                      opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.label}
                        </div>
                      )}
                    </div>
                    {isNavExpanded && (
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pl-16">
          <header className="bg-white border-b border-gray-200">
            <div className="w-full px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <Icons.Home className="w-8 h-8 text-blue-600" />
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">{workspace.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500">{currentSection}</span>
                    </div>
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
          </header>

          <main className="w-full px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="catalog/*" element={<CatalogPage />} />
              <Route path="search" element={<SearchPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}

export default WorkspaceDetail;