import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface AuditEvent {
  id: string;
  action: string;
  category: 'schema' | 'data' | 'security' | 'configuration' | 'access';
  user: string;
  timestamp: string;
  details: string;
  metadata?: Record<string, any>;
}

interface AuditHistoryProps {
  assetType?: string;
  events?: AuditEvent[];
}

export const AuditHistory: React.FC<AuditHistoryProps> = ({ 
  assetType,
  events = getMockAuditEvents(assetType)
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Events', icon: Icons.List },
    { id: 'schema', label: 'Schema Changes', icon: Icons.Table },
    { id: 'data', label: 'Data Changes', icon: Icons.Database },
    { id: 'security', label: 'Security', icon: Icons.Shield },
    { id: 'configuration', label: 'Configuration', icon: Icons.Settings },
    { id: 'access', label: 'Access', icon: Icons.Users }
  ];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = 
      event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'schema':
        return <Icons.Table className="w-4 h-4" />;
      case 'data':
        return <Icons.Database className="w-4 h-4" />;
      case 'security':
        return <Icons.Shield className="w-4 h-4" />;
      case 'configuration':
        return <Icons.Settings className="w-4 h-4" />;
      case 'access':
        return <Icons.Users className="w-4 h-4" />;
      default:
        return <Icons.Activity className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'schema':
        return 'bg-blue-50 text-blue-600';
      case 'data':
        return 'bg-green-50 text-green-600';
      case 'security':
        return 'bg-purple-50 text-purple-600';
      case 'configuration':
        return 'bg-orange-50 text-orange-600';
      case 'access':
        return 'bg-yellow-50 text-yellow-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search audit events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {filteredEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline connector */}
            {index < filteredEvents.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-px bg-gray-200" />
            )}
            
            <div className="flex space-x-4 mb-6">
              {/* Event marker */}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(event.category)}`}>
                  {getCategoryIcon(event.category)}
                </div>
              </div>

              {/* Event content */}
              <div className="flex-1">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{event.action}</h4>
                      <p className="text-xs text-gray-500">
                        by {event.user} • {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">{event.details}</p>

                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs font-mono space-y-1">
                        {Object.entries(event.metadata).map(([key, value]) => (
                          <div key={key} className="flex items-start">
                            <span className="text-gray-500 mr-2">{key}:</span>
                            <span className="text-gray-900">{JSON.stringify(value)}</span>
                          </div>
                        ))}
                      </div>
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

function getMockAuditEvents(assetType?: string): AuditEvent[] {
  const events: AuditEvent[] = [];
  const users = ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'];
  
  // Generate type-specific events
  const getEvents = () => {
    switch (assetType) {
      case 'Data Sources':
        return [
          {
            action: 'Updated connection settings',
            category: 'configuration',
            details: 'Modified database connection parameters',
            metadata: {
              host: 'db.example.com',
              port: 5432,
              database: 'production'
            }
          },
          {
            action: 'Changed sync schedule',
            category: 'configuration',
            details: 'Updated sync frequency to every 4 hours'
          },
          {
            action: 'Added new table',
            category: 'schema',
            details: 'Included "customer_orders" table in sync'
          }
        ];
      
      case 'Tables':
      case 'Query Tables':
        return [
          {
            action: 'Modified schema',
            category: 'schema',
            details: 'Added new column "status" to orders table',
            metadata: {
              column: 'status',
              type: 'VARCHAR(50)',
              nullable: false
            }
          },
          {
            action: 'Created index',
            category: 'schema',
            details: 'Added index on customer_id column',
            metadata: {
              index_name: 'idx_customer_id',
              columns: ['customer_id']
            }
          },
          {
            action: 'Updated permissions',
            category: 'security',
            details: 'Granted read access to Analytics team'
          }
        ];
      
      case 'Columns':
        return [
          {
            action: 'Modified data type',
            category: 'schema',
            details: 'Changed column type from VARCHAR(50) to VARCHAR(100)',
            metadata: {
              old_type: 'VARCHAR(50)',
              new_type: 'VARCHAR(100)'
            }
          },
          {
            action: 'Added constraint',
            category: 'schema',
            details: 'Added NOT NULL constraint'
          },
          {
            action: 'Updated description',
            category: 'configuration',
            details: 'Added column description and usage notes'
          }
        ];
      
      case 'Custom Formulas':
      case 'Aggregate Formulas':
        return [
          {
            action: 'Modified formula',
            category: 'configuration',
            details: 'Updated calculation logic',
            metadata: {
              old_formula: 'SUM(amount)',
              new_formula: 'SUM(amount) FILTER (WHERE status = \'completed\')'
            }
          },
          {
            action: 'Added validation',
            category: 'configuration',
            details: 'Added input validation rules'
          },
          {
            action: 'Updated dependencies',
            category: 'configuration',
            details: 'Added reference to new customer_segment column'
          }
        ];
      
      case 'Reports':
        return [
          {
            action: 'Modified layout',
            category: 'configuration',
            details: 'Updated chart arrangement and sizing'
          },
          {
            action: 'Added visualization',
            category: 'configuration',
            details: 'Added new trend chart for monthly sales'
          },
          {
            action: 'Updated filters',
            category: 'configuration',
            details: 'Modified date range filter configuration'
          }
        ];
      
      case 'Dashboards':
        return [
          {
            action: 'Added widget',
            category: 'configuration',
            details: 'Added new KPI cards section',
            metadata: {
              widget_type: 'KPI',
              position: { row: 1, col: 1 }
            }
          },
          {
            action: 'Modified layout',
            category: 'configuration',
            details: 'Rearranged dashboard components'
          },
          {
            action: 'Updated refresh settings',
            category: 'configuration',
            details: 'Changed auto-refresh interval to 15 minutes'
          }
        ];
      
      default:
        return [
          {
            action: 'Modified configuration',
            category: 'configuration',
            details: 'Updated general settings'
          },
          {
            action: 'Changed permissions',
            category: 'security',
            details: 'Modified access controls'
          }
        ];
    }
  };

  // Generate events with timestamps spread over the last 30 days
  const baseEvents = getEvents();
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;

  baseEvents.forEach((event, index) => {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    events.push({
      id: `event-${index + 1}`,
      timestamp: new Date(now - (daysAgo * dayInMs + hoursAgo * 3600000 + minutesAgo * 60000)).toISOString(),
      user: users[Math.floor(Math.random() * users.length)],
      ...event
    });
  });

  // Sort by timestamp descending
  return events.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}