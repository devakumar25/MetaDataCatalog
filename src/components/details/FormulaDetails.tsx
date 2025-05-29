import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Overview } from './sections/formula/Overview';
import { Assets } from './sections/Assets';
import { Users } from './sections/Users';
import { AuditHistory } from './sections/AuditHistory';
import { VariableDetails } from './VariableDetails';
import { SearchAsset } from '../../types/assets';
import { VersionHistory } from './sections/VersionHistory';

interface FormulaDetailsProps {
  asset: SearchAsset;
  onClose: () => void;
  path?: string[];
  onPathChange?: (newPath: string[]) => void;
}

export const FormulaDetails: React.FC<FormulaDetailsProps> = ({ 
  asset, 
  onClose,
  path = [],
  onPathChange
}) => {
  // If this is a Variable type, render the VariableDetails component instead
  if (asset.type === 'Variables') {
    return <VariableDetails asset={asset} onClose={onClose} path={path} onPathChange={onPathChange} />;
  }

  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.Layout },
    { id: 'assets', label: 'Assets', icon: Icons.GitBranch },
    { id: 'users', label: 'Users', icon: Icons.Users },
    { id: 'audit', label: 'Audit History', icon: Icons.ClipboardList },
    { id: 'version', label: 'Version History', icon: Icons.GitCommit },
  ];

  // Mock stats for the header
  const stats = [
    { label: 'Custom Formulas', count: 24, icon: Icons.Calculator },
    { label: 'Aggregates', count: 12, icon: Icons.Calculator },
    { label: 'Reports', count: 8, icon: Icons.BarChart },
  ];

  // Only show Multi Table tag for Custom Formulas
  const showMultiTableTag = asset.type === 'Custom Formulas' && asset.tags.includes('multi-table');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-lg w-[90vw] h-[90vh] flex flex-col">
        {/* Navigation */}
        <div className="bg-white px-4 py-2 border-b border-gray-200">
          <div className="flex items-center text-sm">
            {path.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Icons.ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                )}
                <span className={index === path.length - 1 ? "text-blue-600 font-medium" : "text-gray-500"}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icons.Calculator className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-semibold text-gray-900">{asset.name}</h2>
                {showMultiTableTag && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Multi Table
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">{asset.type}</span>
                {asset.tags.map(tag => tag !== 'multi-table' && (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.count}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="px-4 border-b border-gray-200">
          <div className="flex items-start space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center space-x-1 px-3 py-2 text-sm font-medium border-b-2 
                  transition-colors relative -mb-px whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {activeTab === 'overview' && <Overview asset={asset} />}
            {activeTab === 'assets' && (
              <Assets 
                path={path}
                onPathChange={onPathChange}
              />
            )}
            {activeTab === 'users' && <Users />}
            {activeTab === 'audit' && <AuditHistory />}
            {activeTab === 'version' && <VersionHistory assetType={asset.type} />}
          </div>
        </div>
      </div>
    </div>
  );
};