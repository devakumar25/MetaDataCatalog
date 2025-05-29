import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  lastAccess: string;
}

interface Group {
  id: number;
  name: string;
  usersCount: number;
  permission: 'Read' | 'Write' | 'Admin';
  description: string;
}

interface UsersProps {
  users?: User[];
  groups?: Group[];
}

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', lastAccess: '2024-03-14 10:30 AM' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', lastAccess: '2024-03-14 09:15 AM' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', lastAccess: '2024-03-14 08:45 AM' },
];

const mockGroups = [
  {
    id: 1,
    name: 'Analytics Team',
    usersCount: 15,
    permission: 'Admin' as const,
    description: 'Data analytics and reporting team'
  },
  {
    id: 2,
    name: 'Sales Department',
    usersCount: 25,
    permission: 'Write' as const,
    description: 'Sales team members'
  },
  {
    id: 3,
    name: 'Marketing Team',
    usersCount: 12,
    permission: 'Read' as const,
    description: 'Marketing and communications team'
  }
];

export const Users: React.FC<UsersProps> = ({ 
  users = mockUsers,
  groups = mockGroups
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'groups'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPermissionColor = (permission: Group['permission']) => {
    switch (permission) {
      case 'Admin':
        return 'bg-purple-100 text-purple-800';
      case 'Write':
        return 'bg-blue-100 text-blue-800';
      case 'Read':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'users'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'groups'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Groups
          </button>
        </div>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'users' ? (
          // Users List
          filteredUsers.map(user => (
            <div key={user.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icons.User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {user.role}
                  </span>
                  <span className="text-sm text-gray-500">
                    Last access: {user.lastAccess}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Groups List
          filteredGroups.map(group => (
            <div key={group.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icons.Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{group.name}</h4>
                    <p className="text-xs text-gray-500">{group.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {group.usersCount} users
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPermissionColor(group.permission)}`}>
                    {group.permission}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};