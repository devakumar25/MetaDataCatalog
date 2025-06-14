export const assetCounts = [
  {
    group: 'Data',
    assets: [
      { name: 'Data Sources', count: 12, icon: 'database', path: 'data-sources' },
      { name: 'Tables', count: 156, icon: 'table', path: 'tables'  },
      { name: 'Query Tables', count: 84, icon: 'tableProperties', path: 'query-tables' },
    ]
  },
  {
    group: 'Modeling',
    assets: [
      { name: 'Table Data Columns', count: 1245, icon: 'gitBranch', path: 'columns'  },
      { name: 'Relationships', count: 89, icon: 'gitMerge', path: 'relationships' },
      { name: 'Formula Columns', count: 234, icon: 'calculator', path: 'custom-formulas' },
      { name: 'Variables', count: 56, icon: 'variable', path: 'variables' },
      { name: 'Filters', count: 178, icon: 'filter', path: 'filter-criteria' },
      { name: 'Aggregate Formula Columns', count: 92, icon: 'calculator', path: 'aggregate-formulas' },
      { name: 'ML Models', count: 6, icon: 'brain', path: 'ml-models' },
      { name: 'Custom Code Functions', count: 15, icon: 'settings', path: 'custom-functions' },
      { name: 'Formatting', count: 36, icon: 'textCursor', path: 'formatting' },
    ]
  },
  {
    group: 'Performance',
    assets: [
      { name: 'Data Cache Tables', count: 45, icon: 'database', path: 'data-cache-tables' },
    ]
  },
  {
    group: 'Analytics',
    assets: [
      { name: 'Reports', count: 67, icon: 'barChart', path: 'reports' },
      { name: 'Dashboards', count: 23, icon: 'layoutDashboard', path: 'dashboards' },
      { name: 'Slideshows', count: 15, icon: 'presentation', path: 'slideshows' },
      { name: 'Portals', count: 8, icon: 'layout', path: 'portals' },
    ]
  },
  {
    group: 'AI & Automation',
    assets: [
      { name: 'Scheduled Actions', count: 156, icon: 'clock', path: 'schedules' },
      { name: 'AI Agents', count: 142, icon: 'bot', path: 'actions' },
      { name: 'Channels', count: 4, icon: 'rss', path: 'channels' },      
    ]
  },
  {
    group: 'User Management',
    assets: [
      { name: 'Users', count: 138, icon: 'users', path: 'users' },
      { name: 'Groups', count: 24, icon: 'share2', path: 'groups' },
      { name: 'Roles & Permissions', count: 456, icon: 'shield', path: 'roles' },
    ]
  },
  {
    group: 'Additional Insights',
    assets: [
      { name: 'Data Clusters', count: 5, icon: 'box', path: 'relationships' },
    ]
  }
];

export const computationalResourcesCount = [
  {
    group: 'Storage Metrics',
    assets: [
      { name: 'Table Rows', count: '256 Million', icon: 'table', path: 'tables' },
      { name: 'Query Table Rows', count: '1.3 Billion', icon: 'tableProperties', path: 'query-tables' },
      { name: 'Data Cache Table Rows', count: '50 Million', icon: 'table', path: 'data-cache-tables' },
      { name: 'Archived Table Rows', count: '2 Million', icon: 'tableProperties', path: 'tables' },
      { name: 'Storage Used', count: '10 TB', icon: 'hardDrive', path: 'tables' },
    ]
  }
];

export const recentAssets = Array.from({ length: 20 }, (_, i) => ({
  id: `asset-${i + 1}`,
  name: [
    'Sales Analysis',
    'Customer Demographics',
    'Product Inventory',
    'Marketing Campaign Results',
    'Financial Metrics',
    'User Engagement Dashboard',
    'Revenue Report',
    'Operations Overview',
    'Supply Chain Analytics',
    'HR Dashboard',
    'Customer Satisfaction Report',
    'Inventory Tracking',
    'Employee Performance',
    'Market Analysis',
    'Budget Overview'
  ][Math.floor(Math.random() * 15)],
  type: ['Table', 'QueryTable', 'Report', 'Dashboard'][Math.floor(Math.random() * 4)],
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 7200000)).toISOString(),
  icon: ['table', 'tableProperties', 'barChart', 'layoutDashboard'][Math.floor(Math.random() * 4)],
}));

export const dataFreshnessIssues = Array.from({ length: 12 }, (_, i) => ({
  id: `issue-${i + 1}`,
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
  type: ['Table', 'QueryTable', 'Schedule', 'Alert', 'Workspace Backup', 'Import'][Math.floor(Math.random() * 6)],
  lastFailedAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
  failureCount: Math.floor(Math.random() * 5) + 1,
  icon: ['table', 'clock', 'zap', 'bot', 'databaseBackup', 'import'][Math.floor(Math.random() * 6)],
}));

export const userActionables = [
  {
    id: 'action-1',
    type: 'DataSourceFailure',
    message: 'has failed multiple times in the last two days',
    assetName: 'Sales Database',
    assetType: 'Data Source',
    icon: 'database',
    metadata: {
      failureCount: 3,
      timeWindow: '2 days',
    },
  },
  {
    id: 'action-2',
    type: 'LongRunningQuery',
    message: 'is taking longer than usual to execute',
    assetName: 'Customer Analytics',
    assetType: 'Query Table',
    icon: 'tableProperties',
    metadata: {
      duration: '15 minutes',
    },
  },
  {
    id: 'action-3',
    type: 'DataQualityIssue',
    message: 'has missing values in critical columns',
    assetName: 'Product Inventory',
    assetType: 'Table',
    icon: 'table',
    metadata: {
      failureCount: 145,
    },
  },
  {
    id: 'action-4',
    type: 'LongRunningQuery',
    message: 'needs optimization for better performance',
    assetName: 'Revenue Analysis',
    assetType: 'Query Table',
    icon: 'tableProperties',
    metadata: {
      duration: '12 minutes',
    },
  },
  {
    id: 'action-5',
    type: 'PermissionIssue',
    message: 'has inconsistent access permissions',
    assetName: 'HR Analytics',
    assetType: 'Dashboard',
    icon: 'shield',
    metadata: {
      timeWindow: '24 hours',
    },
  },
  {
    id: 'action-6',
    type: 'PerformanceIssue',
    message: 'is experiencing slow refresh rates',
    assetName: 'Sales Dashboard',
    assetType: 'Dashboard',
    icon: 'gauge',
    metadata: {
      duration: '8 minutes',
    },
  },
  {
    id: 'action-7',
    type: 'SecurityAlert',
    message: 'requires security review due to unusual access patterns',
    assetName: 'Financial Data',
    assetType: 'Data Source',
    icon: 'shieldAlert',
    metadata: {
      timeWindow: '12 hours',
    },
  },
  {
    id: 'action-8',
    type: 'DataDrift',
    message: 'shows significant deviation from historical patterns',
    assetName: 'Customer Behavior Analysis',
    assetType: 'Report',
    icon: 'arrowUpDown',
    metadata: {
      timeWindow: '7 days',
    },
  },
  {
    id: 'action-9',
    type: 'SystemAlert',
    message: 'requires attention due to system resource constraints',
    assetName: 'Data Warehouse',
    assetType: 'Data Source',
    icon: 'bell',
    metadata: {
      timeWindow: '1 hour',
    },
  }
];

export const recentDataChanges = [
  { id: 'change-1', type: 'ColumnAdded', message: 'New column "Revenue" added', assetName: 'Sales Data', assetType: 'Table', changedBy: 'John Doe', timestamp: '2025-02-19 10:45 AM', affectedAssets: 3 },
  { id: 'change-6', type: 'AggregateModified', message: 'Aggregate function changed for "Total Sales"', assetName: 'Sales Summary', assetType: 'Aggregate', changedBy: 'Charlie Green', timestamp: '2025-02-15 11:10 AM', affectedAssets: 6 },
  { id: 'change-7', type: 'ColumnRemoved', message: 'Column "Discount Rate" removed', assetName: 'Product Pricing', assetType: 'Table', changedBy: 'Dave Wilson', timestamp: '2025-02-14 09:30 AM', affectedAssets: 2 },
  { id: 'change-8', type: 'LookupAdded', message: 'Lookup field added for "Customer ID"', assetName: 'Customer Orders', assetType: 'Lookup', changedBy: 'Emma Davis', timestamp: '2025-02-13 07:45 AM', affectedAssets: 3 },
  { id: 'change-9', type: 'ImportUpdated', message: 'Data import updated with new source file', assetName: 'Monthly Sales', assetType: 'Import', changedBy: 'Frank White', timestamp: '2025-02-12 02:15 PM', affectedAssets: 8 },
  { id: 'change-2', type: 'DataUpdated', message: 'Customer details updated', assetName: 'Customer Records', assetType: 'Table', changedBy: 'Jane Smith', timestamp: '2025-02-19 09:30 AM', affectedAssets: 5 },
  { id: 'change-3', type: 'PermissionChanged', message: 'Access level modified', assetName: 'Marketing Reports', assetType: 'Report', changedBy: 'Admin', timestamp: '2025-02-18 04:15 PM', affectedAssets: 2 },
  { id: 'change-4', type: 'TableCreated', message: 'New table "Employee Data" created', assetName: 'HR Database', assetType: 'Table', changedBy: 'Alice Johnson', timestamp: '2025-02-17 01:20 PM', affectedAssets: 4 },
  { id: 'change-5', type: 'TableDeleted', message: 'Table "Old Transactions" removed', assetName: 'Finance DB', assetType: 'Table', changedBy: 'Bob Brown', timestamp: '2025-02-16 03:50 PM', affectedAssets: 1 },
  { id: 'change-10', type: 'ColumnAdded', message: 'New column "Profit Margin" added', assetName: 'Business Metrics', assetType: 'Table', changedBy: 'Grace Lee', timestamp: '2025-02-11 05:30 PM', affectedAssets: 5 },
  { id: 'change-11', type: 'PermissionChanged', message: 'New user access granted', assetName: 'Project Reports', assetType: 'Report', changedBy: 'Admin', timestamp: '2025-02-10 04:10 PM', affectedAssets: 2 },
  { id: 'change-12', type: 'AggregateModified', message: 'Calculation logic updated', assetName: 'Financial Projections', assetType: 'Aggregate', changedBy: 'Hannah Scott', timestamp: '2025-02-09 10:05 AM', affectedAssets: 4 }
];