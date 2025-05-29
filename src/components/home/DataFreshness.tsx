import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { DataFreshnessIssue } from '../../types/assets';
import { formatDistanceToNow } from '../../utils/dateUtils';

export interface DataFreshnessIssue {
  id: string;
  name: string;
  type: 'Table' | 'QueryTable' | 'Schedule' | 'Alert' | 'Workspace Backup' | 'Import';
  lastFailedAt?: string;
  failureCount?: number;
  syncTime?: string;
  lastAccessed?: string;
  category: 'Failures' | 'Performance' | 'Inactivity';
  qName?: string;
  suggestion?: string;
}

interface DataFreshnessProps {
  issues: DataFreshnessIssue[];
}

const TABS = ['Failures', 'Performance', 'Inactivity'];

export const DataFreshness: React.FC<DataFreshnessProps> = () => {
  const [activeTab, setActiveTab] = useState('Failures');

  const failures = Array.from({ length: 12 }, (_, i) => ({
    id: `failure-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i],
    type: (['Table', 'QueryTable', 'Schedule', 'Alert', 'Workspace Backup', 'Import'] as const)[Math.floor(Math.random() * 6)],
    lastFailedAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
    failureCount: Math.floor(Math.random() * 5) + 1,
    category: 'Failures'
  }));

  const performance = Array.from({ length: 10 }, (_, i) => ({
    id: `performance-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i],    type: 'QueryTable',
    syncTime: `${Math.floor(Math.random() * 20) + 10} mins`,
    suggestion: i % 2 === 0 ? 'Please remove the duplicate join condition' : 'Consider archiving unwanted base table rows',
    category: 'Performance'
  }));

  const inactivity = Array.from({ length: 10 }, (_, i) => ({
    id: `inactivity-${i + 1}`,
    name: [
      'Workspace Analytics',
      'Custom Table Activity',
      'Inventory Status',
      'Action Insights',
      'User Activity',
      'Product Catalog',
      'Supplier Data',
      'Employee Records',
      'Marketing Data',
      'Financial Transactions',
      'Customer Feedback',
      'Order Processing'
    ][i], 
    type: i % 4 === 0 ? 'Data Cluster' : 'Report',
    lastAccessed: `${Math.floor(Math.random() * 100) + 10} days`,
    suggestion: i % 4 === 0 ? `Review this inactive data cluster and remove ${Math.floor(Math.random() * 100) + 10} dependent views` : 'This report is inactive, consider removing it',
    category: 'Inactivity'
  }));

  const issues = [...failures, ...performance, ...inactivity];

  const getIcon = (type: string) => {
    const Icon = {
      Table: Icons.Table,
      'Query Table': Icons.Table,
      Schedule: Icons.Zap,
      Alert: Icons.Zap,
      'Workspace Backup': Icons.DatabaseBackup,
      Import: Icons.Import,
      Report:  Icons.BarChart,
      'Data Cluster': Icons.Box
    }[type] || Icons.Table;
    return <Icon className="w-4 h-4 text-red-600" />;
  };

  const filteredIssues = issues.filter((issue) => issue.category === activeTab);

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Observation & Recommendations</h2>

      {/* Tabs */}
      <div className="flex border-b mb-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        <div className="space-y-1">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1 bg-red-50 rounded-md flex-shrink-0">
                  {getIcon(issue.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {issue.name}                   
                     { activeTab !== 'Failures' && <span className="text-xs text-gray-500 ml-1">({issue.type})</span> }
                  </div>
                  { activeTab === 'Failures' ? <div className="text-xs text-gray-500">{issue.type}</div> :
                                  issue.suggestion && (
                  <div className="text-xs text-gray-600 italic">{issue.suggestion}</div>
                )
                  }
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                {issue.failureCount !== undefined && (
                  <div className="text-xs text-red-600">Failed {issue.failureCount} times</div>
                )}
                {issue.lastFailedAt && (
                  <div className="text-xs text-gray-500">
                    Last failed {formatDistanceToNow(new Date(issue.lastFailedAt))}
                  </div>
                )}
                {issue.syncTime && (
                  <div className="text-xs text-gray-500">Refresh Time: {issue.syncTime}</div>
                )}
                {issue.lastAccessed && (
                  <div className="text-xs text-gray-500">Last accessed {issue.lastAccessed} ago</div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
