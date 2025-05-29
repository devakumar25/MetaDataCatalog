import React from 'react';
import * as Icons from 'lucide-react';

export const RolesNPermissionsView: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg mb-4">
          <Icons.Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Roles & Permissions</h2>
        <p className="text-gray-500">This feature is not yet implemented.</p>
      </div>
    </div>
  );
};