import React from 'react';
import * as Icons from 'lucide-react';

interface UserAssociation {
  email: string;
  value: string;
  lastModified: string;
  modifiedBy: string;
}

export const UserAssociations: React.FC = () => {
  // Mock user associations
  const associations: UserAssociation[] = [
    {
      email: 'john.doe@example.com',
      value: '["Electronics", "Books"]',
      lastModified: '2024-03-14T10:30:00Z',
      modifiedBy: 'John Doe'
    },
    {
      email: 'jane.smith@example.com',
      value: '["Clothing", "Sports"]',
      lastModified: '2024-03-14T09:15:00Z',
      modifiedBy: 'Jane Smith'
    }
  ];

  return (
    <div className="space-y-4">
      {associations.map((association, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Icons.User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{association.email}</h4>
                <p className="text-xs text-gray-500">
                  Modified by {association.modifiedBy} on{' '}
                  {new Date(association.lastModified).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 bg-gray-50 rounded p-3">
            <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
              {association.value}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};