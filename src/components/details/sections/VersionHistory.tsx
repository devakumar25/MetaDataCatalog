import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Version {
  id: string;
  version: string;
  timestamp: string;
  author: string;
  changes: {
    type: 'added' | 'modified' | 'removed';
    description: string;
    metadata?: Record<string, any>;
  }[];
  comment?: string;
  branchName?: string;
  environment?: 'development' | 'staging' | 'production';
  status?: 'deployed' | 'pending' | 'failed';
}

interface VersionHistoryProps {
  assetType: string;
  versions?: Version[];
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ 
  assetType,
  versions = getMockVersions(assetType)
}) => {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [showDiff, setShowDiff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getChangeIcon = (type: 'added' | 'modified' | 'removed') => {
    switch (type) {
      case 'added':
        return <Icons.Plus className="w-4 h-4 text-green-600" />;
      case 'modified':
        return <Icons.Edit className="w-4 h-4 text-blue-600" />;
      case 'removed':
        return <Icons.Minus className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEnvironmentColor = (env?: string) => {
    switch (env) {
      case 'production':
        return 'bg-purple-100 text-purple-800';
      case 'staging':
        return 'bg-orange-100 text-orange-800';
      case 'development':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVersions = versions.filter(version => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      version.version.toLowerCase().includes(searchLower) ||
      version.author.toLowerCase().includes(searchLower) ||
      version.changes.some(change => 
        change.description.toLowerCase().includes(searchLower)
      ) ||
      version.comment?.toLowerCase().includes(searchLower) ||
      version.branchName?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search versions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className={`
            px-3 py-2 text-sm font-medium rounded-lg transition-colors
            ${showDiff
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          <div className="flex items-center space-x-2">
            <Icons.GitCompare className="w-4 h-4" />
            <span>Show Diff</span>
          </div>
        </button>
      </div>

      {/* Version Timeline */}
      <div className="relative">
        {filteredVersions.map((version, index) => (
          <div key={version.id} className="relative">
            {/* Timeline connector */}
            {index < filteredVersions.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
            )}
            
            <div className="flex space-x-4 mb-6">
              {/* Version marker */}
              <div className="relative">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icons.GitCommit className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              {/* Version content */}
              <div className="flex-1">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  {/* Version header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium text-gray-900">Version {version.version}</h4>
                        {/*} {version.status && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(version.status)}`}>
                            {version.status}
                          </span>
                        )}
                        {version.environment && (
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getEnvironmentColor(version.environment)}`}>
                            {version.environment}
                          </span>
                        )}*/}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        by {version.author} • {new Date(version.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {/*} <div className="flex items-center space-x-2">
                      {version.branchName && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded text-xs">
                          <Icons.GitBranch className="w-3 h-3" />
                          <span>{version.branchName}</span>
                        </div>
                      )}
                      <button 
                        onClick={() => setSelectedVersion(selectedVersion === version.id ? null : version.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Icons.ChevronDown 
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            selectedVersion === version.id ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button> 
                    </div> */}
                  </div>

                  {/* Version comment */}
                  {version.comment && (
                    <div className="mb-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {version.comment}
                    </div>
                  )}

                  {/* Changes */}
                  <div className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start space-x-2">
                        <div className="mt-1">
                          {getChangeIcon(change.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600">{change.description}</p>
                          {change.metadata && showDiff && (
                            <pre className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono overflow-x-auto">
                              {JSON.stringify(change.metadata, null, 2)}
                            </pre>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Version actions */}
                  {selectedVersion === version.id && (
                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end space-x-2">
                      <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">
                        Restore Version
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getMockVersions(assetType: string): Version[] {
  const versions: Version[] = [];
  const authors = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'];
  const environments = ['development', 'staging', 'production'] as const;
  
  // Generate type-specific changes
  const getChanges = (version: number) => {
    switch (assetType) {
      case 'Data Sources':
        return [
          {
            type: 'modified',
            description: 'Updated connection string and credentials',
            metadata: {
              host: 'new-db.example.com',
              port: 5432
            }
          },
          {
            type: 'added',
            description: 'Added new tables to sync configuration',
            metadata: {
              tables: ['orders', 'customers']
            }
          },
          {
            type: 'modified',
            description: 'Changed sync schedule to every 4 hours',
            metadata: {
              schedule: '0 */4 * * *'
            }
          }
        ];
      
      case 'Tables':
      case 'Query Tables':
        return [
          {
            type: 'modified',
            description: 'Added new columns for order tracking',
            metadata: {
              columns: [
                { name: 'tracking_id', type: 'VARCHAR(50)' },
                { name: 'shipping_status', type: 'VARCHAR(20)' }
              ]
            }
          },
          {
            type: 'added',
            description: 'Created new indexes for performance',
            metadata: {
              indexes: ['idx_tracking_id', 'idx_shipping_status']
            }
          },
          {
            type: 'removed',
            description: 'Removed deprecated columns',
            metadata: {
              columns: ['old_status', 'legacy_id']
            }
          }
        ];
      
      case 'Columns':
        return [
          {
            type: 'modified',
            description: 'Changed data type and constraints',
            metadata: {
              from: { type: 'VARCHAR(50)', nullable: true },
              to: { type: 'VARCHAR(100)', nullable: false }
            }
          },
          {
            type: 'added',
            description: 'Added new validation rules',
            metadata: {
              rules: ['NOT NULL', 'CHECK (length > 0)']
            }
          }
        ];
      
      case 'Custom Formulas':
      case 'Aggregate Formulas':
        return [
          {
            type: 'modified',
            description: 'Updated calculation logic',
            metadata: {
              oldFormula: 'SUM(amount)',
              newFormula: 'SUM(amount) FILTER (WHERE status = \'completed\')'
            }
          },
          {
            type: 'added',
            description: 'Added error handling conditions',
            metadata: {
              conditions: ['NULLIF', 'COALESCE']
            }
          }
        ];
      
      case 'Reports':
        return [
          {
            type: 'modified',
            description: 'Updated chart configurations',
            metadata: {
              changes: {
                type: 'line to area',
                colors: ['#2563eb', '#60a5fa']
              }
            }
          },
          {
            type: 'added',
            description: 'Added new data series',
            metadata: {
              series: ['Revenue YoY', 'Growth Rate']
            }
          }
        ];
      
      case 'Dashboards':
        return [
          {
            type: 'modified',
            description: 'Reorganized dashboard layout',
            metadata: {
              layout: {
                rows: 3,
                columns: 4
              }
            }
          },
          {
            type: 'added',
            description: 'Added new KPI widgets',
            metadata: {
              widgets: ['Revenue', 'Users', 'Conversion']
            }
          }
        ];
      
      default:
        return [
          {
            type: 'modified',
            description: 'General updates',
            metadata: {
              changes: ['configuration', 'settings']
            }
          }
        ];
    }
  };

  // Generate versions with realistic progression
  for (let i = 0; i < 5; i++) {
    const versionNumber = 5 - i;
    const daysAgo = i * 3; // Each version is 3 days apart
    const env = environments[Math.floor(Math.random() * environments.length)];
    
    versions.push({
      id: `v${versionNumber}`,
      version: `${versionNumber}.0`,
      timestamp: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      author: authors[Math.floor(Math.random() * authors.length)],
      changes: getChanges(versionNumber).slice(0, Math.floor(Math.random() * 2) + 1),
      comment: Math.random() > 0.5 ? 'Regular maintenance update and improvements' : undefined,
      branchName: Math.random() > 0.5 ? `feature/v${versionNumber}` : undefined,
      environment: env,
      status: env === 'production' ? 'deployed' : Math.random() > 0.5 ? 'pending' : 'failed'
    });
  }

  return versions;
}