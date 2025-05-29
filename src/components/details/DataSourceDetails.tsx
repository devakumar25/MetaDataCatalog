import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Overview } from './sections/Overview';
import { SyncHistory } from './sections/SyncHistory';
import { DownstreamAssets } from './sections/DownstreamAssets';
import { DataClusters } from './sections/DataClusters';
import { Users } from './sections/Users';
import { AuditHistory } from './sections/AuditHistory';
import { RecommendedActions } from './sections/RecommendedActions';
import { InvolvedTables } from './sections/InvolvedTables';
import { DataSource } from '../../types/assets';

interface DataSourceDetailsProps {
  dataSource: DataSource;
  onClose: () => void;
  path?: string[];
  onPathChange?: (newPath: string[]) => void;
}

export const DataSourceDetails: React.FC<DataSourceDetailsProps> = ({ 
  dataSource, 
  onClose,
  path = [],
  onPathChange
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.Layout },
    { id: 'linked-tables', label: 'Linked Tables', icon: Icons.Table },
    { id: 'sync-history', label: 'Sync History', icon: Icons.History },
    { id: 'downstream-assets', label: 'Downstream Assets', icon: Icons.GitBranch },
    { id: 'data-clusters', label: 'Data Clusters', icon: Icons.Network },
    { id: 'users', label: 'Users', icon: Icons.Users },
    { id: 'audit-history', label: 'Audit History', icon: Icons.ClipboardList },
    { id: 'recommended-actions', label: 'Recommended Actions', icon: Icons.AlertTriangle },
  ];

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
              <Icons.Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{dataSource.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">Data Source</span>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  dataSource.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {dataSource.status}
                </span>
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
        <div className="grid grid-cols-4 gap-4 p-4">
          {[
            { label: 'Tables', count: dataSource.tablesCount, icon: Icons.Table },
            { label: 'Query Tables', count: dataSource.queryTablesCount, icon: Icons.TableProperties },
            { label: 'Reports', count: dataSource.reportsCount, icon: Icons.BarChart },
            { label: 'Dashboards', count: dataSource.dashboardsCount, icon: Icons.LayoutDashboard },
          ].map((stat) => (
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
            {activeTab === 'overview' && <Overview dataSource={dataSource} />}
            {activeTab === 'linked-tables' && <InvolvedTables />}
            {activeTab === 'sync-history' && <SyncHistory initialDate={new Date().toISOString().split('T')[0]} />}
            {activeTab === 'downstream-assets' && (
              <DownstreamAssets 
                path={path}
                onPathChange={onPathChange}
              />
            )}
            {activeTab === 'data-clusters' && <DataClusters />}
            {activeTab === 'users' && <Users />}
            {activeTab === 'audit-history' && <AuditHistory />}
            {activeTab === 'recommended-actions' && <RecommendedActions />}
          </div>
        </div>
      </div>
    </div>
  );
};