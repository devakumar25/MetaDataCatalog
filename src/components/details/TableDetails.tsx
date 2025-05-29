import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Overview } from './sections/Overview';
import { SyncHistory } from './sections/SyncHistory';
import { Columns } from './sections/Columns';
import { FormulasAndBuckets } from './sections/FormulasAndBuckets';
import { Lookups } from './sections/Lookups';
import { Aggregates } from './sections/Aggregates';
import { Assets } from './sections/Assets';
import { DataClusters } from './sections/DataClusters';
import { Users } from './sections/Users';
import { AuditHistory } from './sections/AuditHistory';
import { RecommendedActions } from './sections/RecommendedActions';
import { SearchAsset } from '../../types/assets';
import { VersionHistory } from './sections/VersionHistory';

interface TableDetailsProps {
  asset: SearchAsset;
  onClose: () => void;
  path?: string[];
  onPathChange?: (newPath: string[]) => void;
}

export const TableDetails: React.FC<TableDetailsProps> = ({ 
  asset, 
  onClose,
  path = [],
  onPathChange
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Icons.Layout },
    { id: 'sync-history', label: 'Sync History', icon: Icons.History },
    { id: 'columns', label: 'Columns', icon: Icons.Table },
    { id: 'formulas', label: 'Formulas & Buckets', icon: Icons.Calculator },
    { id: 'lookups', label: 'Lookups', icon: Icons.GitMerge },
    { id: 'aggregates', label: 'Aggregates', icon: Icons.Calculator },
    { id: 'assets', label: 'Assets', icon: Icons.GitBranch },
    { id: 'clusters', label: 'Data Clusters', icon: Icons.Network },
    { id: 'users', label: 'Users', icon: Icons.Users },
    { id: 'audit', label: 'Audit History', icon: Icons.ClipboardList },
    { id: 'version', label: 'Version History', icon: Icons.GitCommit },
    { id: 'actions', label: 'Recommended Actions', icon: Icons.AlertTriangle },
  ];

  const stats = [
    { label: 'Columns', count: 24, icon: Icons.Table },
    { label: 'Query Tables', count: 8, icon: Icons.TableProperties },
    { label: 'Reports', count: 15, icon: Icons.BarChart },
    { label: 'Dashboards', count: 6, icon: Icons.LayoutDashboard },
  ];

  // Mock data for demonstration
  const mockColumns = [
    {
      id: '1',
      name: 'id',
      dataType: 'number',
      defaultValue: null,
      tags: [],
      description: 'Primary key'
    },
    {
      id: '2',
      name: 'email',
      dataType: 'string',
      defaultValue: null,
      tags: ['pii'],
      description: 'User email address'
    },
    {
      id: '3',
      name: 'created_at',
      dataType: 'date',
      defaultValue: 'CURRENT_TIMESTAMP',
      tags: [],
      description: 'Record creation timestamp'
    }
  ];

  const mockFormulas = [
    {
      id: '1',
      name: 'full_name',
      createdBy: 'John Doe',
      description: 'Combines first and last name',
      expression: 'CONCAT(first_name, \' \', last_name)',
      dataType: 'string',
      createdAt: '2024-03-14T10:30:00Z'
    }
  ];

  const mockLookups = [
    {
      id: '1',
      fromTable: 'orders',
      toTable: 'customers',
      fromColumn: 'customer_id',
      toColumn: 'id',
      relationshipType: 'many-to-one' as const,
      usageCount: 15,
      tags: ['used']
    }
  ];

  const mockAggregates = {
    singleTableAggregates: [
      {
        id: '1',
        name: 'total_amount',
        createdBy: 'John Doe',
        description: 'Sum of order amounts',
        expression: 'SUM(amount)',
        dataType: 'number',
        createdAt: '2024-03-14T10:30:00Z'
      }
    ],
    multiTableAggregates: [
      {
        id: '2',
        name: 'customer_lifetime_value',
        createdBy: 'Jane Smith',
        description: 'Total value of all customer orders',
        expression: 'SUM(orders.amount)',
        dataType: 'number',
        createdAt: '2024-03-14T11:30:00Z',
        sourceTables: ['customers', 'orders']
      }
    ]
  };

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
              <Icons.Table className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{asset.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">{asset.type}</span>
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
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.count}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            );
          })}
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
            {activeTab === 'overview' && <Overview dataSource={asset} />}
            {activeTab === 'sync-history' && <SyncHistory initialDate={new Date().toISOString().split('T')[0]} />}
            {activeTab === 'columns' && (
              <Columns columns={mockColumns} onViewDetails={() => {}} />
            )}
            {activeTab === 'formulas' && (
              <FormulasAndBuckets formulas={mockFormulas} />
            )}
            {activeTab === 'lookups' && <Lookups lookups={mockLookups} />}
            {activeTab === 'aggregates' && (
              <Aggregates
                singleTableAggregates={mockAggregates.singleTableAggregates}
                multiTableAggregates={mockAggregates.multiTableAggregates}
              />
            )}
            {activeTab === 'assets' && (
              <Assets 
                path={path}
                onPathChange={onPathChange}
              />
            )}
            {activeTab === 'clusters' && <DataClusters />}
            {activeTab === 'users' && <Users />}
            {activeTab === 'audit' && <AuditHistory />}
            {activeTab === 'version' && <VersionHistory assetType={asset.type} />}
            {activeTab === 'actions' && <RecommendedActions />}
          </div>
        </div>
      </div>
    </div>
  );
};