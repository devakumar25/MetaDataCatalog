export function getWorkspaces() {
  return [
    {
      id: '1',
      name: 'Sales Analytics',
      description: 'Comprehensive sales performance metrics and KPI tracking workspace',
      lastAccessed: '2024-03-10T15:30:00Z',
      createdAt: '2024-02-15T10:00:00Z',
      createdBy: 'Sarah Johnson',
      assetsCount: 24,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Marketing Dashboard',
      description: 'Campaign performance and ROI analysis workspace',
      lastAccessed: '2024-03-09T10:15:00Z',
      createdAt: '2024-02-20T14:30:00Z',
      createdBy: 'Michael Chen',
      assetsCount: 18,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Customer Insights',
      description: 'Customer behavior and engagement analytics workspace',
      lastAccessed: '2024-03-08T14:20:00Z',
      createdAt: '2024-02-25T09:15:00Z',
      createdBy: 'Emily Rodriguez',
      assetsCount: 31,
      isFavorite: true
    },
    {
      id: '4',
      name: 'Financial Metrics',
      description: 'Revenue tracking and financial performance analytics',
      lastAccessed: '2024-03-07T09:45:00Z',
      createdAt: '2024-03-01T11:45:00Z',
      createdBy: 'David Kim',
      assetsCount: 42,
      isFavorite: false
    },
    {
      id: '5',
      name: 'Operations Monitor',
      description: 'Operational efficiency and process analytics workspace',
      lastAccessed: '2024-03-06T16:50:00Z',
      createdAt: '2024-03-05T13:20:00Z',
      createdBy: 'Lisa Thompson',
      assetsCount: 15,
      isFavorite: false
    }
  ];
}

export function getMockDataSource(id) {
  return {
    id,
    name: 'Salesforce',
    type: 'PostgreSQL',
    status: 'active',
    host: 'db.example.com',
    port: 5432,
    database: 'salesforce_prod',
    syncFrequency: 'Every 6 hours',
    lastSync: new Date(Date.now() - 3600000).toISOString(),
    nextSync: new Date(Date.now() + 18000000).toISOString(),
    tablesCount: 31,
    queryTablesCount: 29,
    reportsCount: 10,
    dashboardsCount: 6,
    createdBy: 'John Doe',
    createdAt: '2024-01-15T09:30:00Z',
    lastModifiedBy: 'Jane Smith',
    lastModifiedAt: '2024-03-14T14:45:00Z'
  };
}

export function getMockRecommendedActions() {
  return [
    {
      id: '1',
      type: 'warning',
      title: 'High Query Execution Time',
      description: 'Several queries are taking longer than usual to execute. Consider optimizing the most frequent queries.',
      priority: 'high',
      createdAt: '2024-03-14T10:30:00Z',
      status: 'pending',
      category: 'performance'
    },
    {
      id: '2',
      type: 'error',
      title: 'Missing Index Detection',
      description: 'Frequently accessed columns lack proper indexing, which may impact query performance.',
      priority: 'high',
      createdAt: '2024-03-14T09:15:00Z',
      status: 'in_progress',
      category: 'performance'
    },
    {
      id: '3',
      type: 'info',
      title: 'Schema Documentation Update',
      description: 'Some tables are missing column descriptions. Consider updating the documentation.',
      priority: 'low',
      createdAt: '2024-03-13T15:45:00Z',
      status: 'pending',
      category: 'maintenance'
    }
  ];
}