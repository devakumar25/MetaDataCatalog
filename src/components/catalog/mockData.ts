// Mock data for transformations
export const mockTransformations = {
  pipelines: [
    {
      id: 'pipeline-1',
      name: 'Customer Data Integration',
      sourceTablesCount: 3,
      sourceTables: ['customers', 'orders', 'products'],
      lastSync: new Date(Date.now() - 1800000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-2',
      name: 'Sales Analytics ETL',
      sourceTablesCount: 4,
      sourceTables: ['sales', 'products', 'regions', 'employees'],
      lastSync: new Date(Date.now() - 3600000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-3',
      name: 'Inventory Management',
      sourceTablesCount: 2,
      sourceTables: ['inventory', 'warehouses'],
      lastSync: new Date(Date.now() - 7200000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-4',
      name: 'Marketing Campaign Analysis',
      sourceTablesCount: 3,
      sourceTables: ['campaigns', 'leads', 'conversions'],
      lastSync: new Date(Date.now() - 10800000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-5',
      name: 'Financial Reporting',
      sourceTablesCount: 5,
      sourceTables: ['transactions', 'accounts', 'budgets', 'expenses', 'revenue'],
      lastSync: new Date(Date.now() - 14400000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-6',
      name: 'HR Data Integration',
      sourceTablesCount: 3,
      sourceTables: ['employees', 'departments', 'positions'],
      lastSync: new Date(Date.now() - 18000000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-7',
      name: 'Supply Chain Analytics',
      sourceTablesCount: 4,
      sourceTables: ['suppliers', 'purchases', 'shipments', 'inventory'],
      lastSync: new Date(Date.now() - 21600000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-8',
      name: 'Customer Support Metrics',
      sourceTablesCount: 3,
      sourceTables: ['tickets', 'agents', 'satisfaction_scores'],
      lastSync: new Date(Date.now() - 25200000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-9',
      name: 'Product Performance',
      sourceTablesCount: 4,
      sourceTables: ['products', 'sales', 'returns', 'reviews'],
      lastSync: new Date(Date.now() - 28800000).toISOString(),
      status: 'active',
      type: 'pipeline'
    },
    {
      id: 'pipeline-10',
      name: 'Website Analytics',
      sourceTablesCount: 3,
      sourceTables: ['page_views', 'user_sessions', 'conversions'],
      lastSync: new Date(Date.now() - 32400000).toISOString(),
      status: 'active',
      type: 'pipeline'
    }
  ],
  
  codeStudio: [
    {
      id: 'code-1',
      name: 'Customer Segmentation Logic',
      description: 'Custom segmentation rules for customer analysis',
      lastSync: new Date(Date.now() - 1800000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-2',
      name: 'Revenue Calculation',
      description: 'Complex revenue calculations with adjustments',
      lastSync: new Date(Date.now() - 3600000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-3',
      name: 'Product Categorization',
      description: 'Automated product category assignment',
      lastSync: new Date(Date.now() - 7200000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-4',
      name: 'Lead Scoring Model',
      description: 'Custom lead scoring algorithm',
      lastSync: new Date(Date.now() - 10800000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-5',
      name: 'Churn Risk Calculator',
      description: 'Customer churn risk assessment',
      lastSync: new Date(Date.now() - 14400000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-6',
      name: 'Inventory Optimization',
      description: 'Stock level optimization logic',
      lastSync: new Date(Date.now() - 18000000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-7',
      name: 'Sales Territory Mapping',
      description: 'Geographic sales territory assignment',
      lastSync: new Date(Date.now() - 21600000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-8',
      name: 'Commission Calculator',
      description: 'Sales commission calculation rules',
      lastSync: new Date(Date.now() - 25200000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-9',
      name: 'Price Optimization',
      description: 'Dynamic pricing optimization logic',
      lastSync: new Date(Date.now() - 28800000).toISOString(),
      status: 'active',
      type: 'code'
    },
    {
      id: 'code-10',
      name: 'Marketing Attribution',
      description: 'Multi-touch attribution modeling',
      lastSync: new Date(Date.now() - 32400000).toISOString(),
      status: 'active',
      type: 'code'
    }
  ],
  
  snapshots: [
    {
      id: 'snapshot-1',
      name: 'Monthly Sales Summary',
      sourceTable: 'Sales Data',
      sourceReport: 'Sales Performance',
      lastSync: new Date(Date.now() - 1800000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-2',
      name: 'Customer Metrics',
      sourceTable: 'Customer Data',
      sourceReport: 'Customer Analytics',
      lastSync: new Date(Date.now() - 3600000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-3',
      name: 'Inventory Status',
      sourceTable: 'Inventory',
      sourceReport: 'Stock Levels',
      lastSync: new Date(Date.now() - 7200000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-4',
      name: 'Marketing Campaign Results',
      sourceTable: 'Campaign Data',
      sourceReport: 'Campaign Performance',
      lastSync: new Date(Date.now() - 10800000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-5',
      name: 'Financial Statements',
      sourceTable: 'Financial Data',
      sourceReport: 'Financial Reports',
      lastSync: new Date(Date.now() - 14400000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-6',
      name: 'Employee Performance',
      sourceTable: 'HR Data',
      sourceReport: 'Performance Reviews',
      lastSync: new Date(Date.now() - 18000000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-7',
      name: 'Product Analytics',
      sourceTable: 'Product Data',
      sourceReport: 'Product Performance',
      lastSync: new Date(Date.now() - 21600000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-8',
      name: 'Support Metrics',
      sourceTable: 'Support Data',
      sourceReport: 'Support Analytics',
      lastSync: new Date(Date.now() - 25200000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-9',
      name: 'Website Analytics',
      sourceTable: 'Web Data',
      sourceReport: 'Web Performance',
      lastSync: new Date(Date.now() - 28800000).toISOString(),
      status: 'active',
      type: 'snapshot'
    },
    {
      id: 'snapshot-10',
      name: 'Supply Chain Metrics',
      sourceTable: 'Supply Chain Data',
      sourceReport: 'Supply Chain Analytics',
      lastSync: new Date(Date.now() - 32400000).toISOString(),
      status: 'active',
      type: 'snapshot'
    }
  ]
};

export const mockDataSources = {
  'files-and-feeds': [
    {
      id: '1',
      name: 'Google Drive',
      icon: 'FileText',
      type: 'File Storage',
      tables: [
        { name: 'Sales Data 2024', rowCount: 15000, lastSync: '2024-03-14T10:30:00Z' },
        { name: 'Customer Feedback', rowCount: 8500, lastSync: '2024-03-14T09:15:00Z' },
        { name: 'Product Catalog', rowCount: 2300, lastSync: '2024-03-14T11:45:00Z' }
      ],
      status: 'active'
    },
    {
      id: '2',
      name: 'OneDrive',
      icon: 'Cloud',
      type: 'File Storage',
      tables: [
        { name: 'Financial Reports', rowCount: 5000, lastSync: '2024-03-14T09:15:00Z' },
        { name: 'Employee Data', rowCount: 1200, lastSync: '2024-03-14T10:00:00Z' }
      ],
      status: 'active'
    },
    {
      id: '3',
      name: 'Dropbox',
      icon: 'FileText',
      type: 'File Storage',
      tables: [
        { name: 'Marketing Assets', rowCount: 3500, lastSync: '2024-03-14T11:00:00Z' },
        { name: 'Campaign Data', rowCount: 2800, lastSync: '2024-03-14T10:45:00Z' }
      ],
      status: 'active'
    },
    {
      id: '4',
      name: 'AWS S3',
      icon: 'Cloud',
      type: 'Object Storage',
      tables: [
        { name: 'Log Analytics', rowCount: 50000, lastSync: '2024-03-14T11:30:00Z' },
        { name: 'Backup Data', rowCount: 25000, lastSync: '2024-03-14T10:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '5',
      name: 'FTP Server',
      icon: 'Server',
      type: 'File Transfer',
      tables: [
        { name: 'Vendor Data', rowCount: 7500, lastSync: '2024-03-14T09:45:00Z' },
        { name: 'Partner Feeds', rowCount: 4200, lastSync: '2024-03-14T11:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '6',
      name: 'SharePoint',
      icon: 'FileText',
      type: 'Document Management',
      tables: [
        { name: 'Project Documents', rowCount: 6300, lastSync: '2024-03-14T10:30:00Z' },
        { name: 'Team Reports', rowCount: 3100, lastSync: '2024-03-14T09:45:00Z' }
      ],
      status: 'active'
    },
    {
      id: '7',
      name: 'Box',
      icon: 'Box',
      type: 'File Storage',
      tables: [
        { name: 'Legal Documents', rowCount: 4500, lastSync: '2024-03-14T11:00:00Z' },
        { name: 'Compliance Data', rowCount: 2900, lastSync: '2024-03-14T10:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '8',
      name: 'SFTP Server',
      icon: 'Server',
      type: 'Secure File Transfer',
      tables: [
        { name: 'Financial Feeds', rowCount: 8900, lastSync: '2024-03-14T09:30:00Z' },
        { name: 'Audit Logs', rowCount: 12000, lastSync: '2024-03-14T11:45:00Z' }
      ],
      status: 'active'
    },
    {
      id: '9',
      name: 'Azure Blob Storage',
      icon: 'Cloud',
      type: 'Object Storage',
      tables: [
        { name: 'Archive Data', rowCount: 35000, lastSync: '2024-03-14T10:45:00Z' },
        { name: 'Media Assets', rowCount: 18000, lastSync: '2024-03-14T09:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '10',
      name: 'RSS Feeds',
      icon: 'Rss',
      type: 'Data Feed',
      tables: [
        { name: 'News Updates', rowCount: 15000, lastSync: '2024-03-14T11:30:00Z' },
        { name: 'Market Data', rowCount: 9500, lastSync: '2024-03-14T10:00:00Z' }
      ],
      status: 'active'
    }
  ],
  'cloud-sources': [
    {
      id: '11',
      name: 'Snowflake',
      icon: 'Database',
      type: 'Data Warehouse',
      connections: [
        { name: 'Production DB', dbType: 'PostgreSQL', lastSync: '2024-03-14T10:00:00Z' },
        { name: 'Analytics DB', dbType: 'MySQL', lastSync: '2024-03-14T09:30:00Z' },
        { name: 'Staging DB', dbType: 'PostgreSQL', lastSync: '2024-03-14T11:15:00Z' }
      ],
      tags: ['PostgreSQL', 'MySQL']
    },
    {
      id: '12',
      name: 'Amazon RDS',
      icon: 'Cloud',
      type: 'Database',
      connections: [
        { name: 'Customer DB', dbType: 'MySQL', lastSync: '2024-03-14T09:30:00Z' },
        { name: 'Orders DB', dbType: 'PostgreSQL', lastSync: '2024-03-14T10:45:00Z' }
      ],
      tags: ['MySQL', 'PostgreSQL']
    },
    {
      id: '13',
      name: 'Azure SQL',
      icon: 'Database',
      type: 'Cloud Database',
      connections: [
        { name: 'Enterprise DB', dbType: 'SQL Server', lastSync: '2024-03-14T11:00:00Z' },
        { name: 'Reporting DB', dbType: 'SQL Server', lastSync: '2024-03-14T10:15:00Z' }
      ],
      tags: ['SQL Server']
    },
    {
      id: '14',
      name: 'Google BigQuery',
      icon: 'Database',
      type: 'Data Warehouse',
      connections: [
        { name: 'Analytics Data', dbType: 'BigQuery', lastSync: '2024-03-14T09:45:00Z' },
        { name: 'ML Data', dbType: 'BigQuery', lastSync: '2024-03-14T11:30:00Z' }
      ],
      tags: ['BigQuery']
    },
    {
      id: '15',
      name: 'MongoDB Atlas',
      icon: 'Database',
      type: 'NoSQL Database',
      connections: [
        { name: 'User Data', dbType: 'MongoDB', lastSync: '2024-03-14T10:30:00Z' },
        { name: 'Events DB', dbType: 'MongoDB', lastSync: '2024-03-14T09:15:00Z' }
      ],
      tags: ['MongoDB']
    },
    {
      id: '16',
      name: 'Redshift',
      icon: 'Database',
      type: 'Data Warehouse',
      connections: [
        { name: 'Business Intelligence', dbType: 'Redshift', lastSync: '2024-03-14T11:15:00Z' },
        { name: 'Data Lake', dbType: 'Redshift', lastSync: '2024-03-14T10:00:00Z' }
      ],
      tags: ['Redshift']
    },
    {
      id: '17',
      name: 'Cassandra',
      icon: 'Database',
      type: 'NoSQL Database',
      connections: [
        { name: 'Time Series Data', dbType: 'Cassandra', lastSync: '2024-03-14T09:30:00Z' },
        { name: 'Metrics DB', dbType: 'Cassandra', lastSync: '2024-03-14T11:45:00Z' }
      ],
      tags: ['Cassandra']
    },
    {
      id: '18',
      name: 'Elasticsearch',
      icon: 'Search',
      type: 'Search Engine',
      connections: [
        { name: 'Search Index', dbType: 'Elasticsearch', lastSync: '2024-03-14T10:45:00Z' },
        { name: 'Logs Index', dbType: 'Elasticsearch', lastSync: '2024-03-14T09:00:00Z' }
      ],
      tags: ['Elasticsearch']
    },
    {
      id: '19',
      name: 'Databricks',
      icon: 'Database',
      type: 'Data Lake',
      connections: [
        { name: 'Delta Lake', dbType: 'Spark SQL', lastSync: '2024-03-14T11:30:00Z' },
        { name: 'ML Workspace', dbType: 'Spark SQL', lastSync: '2024-03-14T10:15:00Z' }
      ],
      tags: ['Spark SQL']
    },
    {
      id: '20',
      name: 'Couchbase',
      icon: 'Database',
      type: 'NoSQL Database',
      connections: [
        { name: 'Cache DB', dbType: 'Couchbase', lastSync: '2024-03-14T09:45:00Z' },
        { name: 'Session DB', dbType: 'Couchbase', lastSync: '2024-03-14T11:00:00Z' }
      ],
      tags: ['Couchbase']
    }
  ],
  'business-apps': [
    {
      id: '21',
      name: 'Salesforce',
      icon: 'Cloud',
      type: 'CRM',
      clients: [
        { name: 'Sales Department', lastSync: '2024-03-14T10:45:00Z' },
        { name: 'Customer Success', lastSync: '2024-03-14T09:30:00Z' }
      ],
      status: 'active'
    },
    {
      id: '22',
      name: 'HubSpot',
      icon: 'BarChart',
      type: 'Marketing Platform',
      clients: [
        { name: 'Marketing Team', lastSync: '2024-03-14T11:00:00Z' },
        { name: 'Lead Generation', lastSync: '2024-03-14T10:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '23',
      name: 'Zendesk',
      icon: 'Headphones',
      type: 'Customer Support',
      clients: [
        { name: 'Support Team', lastSync: '2024-03-14T09:45:00Z' },
        { name: 'Customer Service', lastSync: '2024-03-14T11:30:00Z' }
      ],
      status: 'active'
    },
    {
      id: '24',
      name: 'Workday',
      icon: 'Briefcase',
      type: 'HR Management',
      clients: [
        { name: 'HR Department', lastSync: '2024-03-14T10:30:00Z' },
        { name: 'Payroll Team', lastSync: '2024-03-14T09:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '25',
      name: 'NetSuite',
      icon: 'DollarSign',
      type: 'ERP',
      clients: [
        { name: 'Finance Team', lastSync: '2024-03-14T11:15:00Z' },
        { name: 'Accounting', lastSync: '2024-03-14T10:00:00Z' }
      ],
      status: 'active'
    },
    {
      id: '26',
      name: 'Marketo',
      icon: 'Mail',
      type: 'Marketing Automation',
      clients: [
        { name: 'Digital Marketing', lastSync: '2024-03-14T09:30:00Z' },
        { name: 'Campaign Team', lastSync: '2024-03-14T11:45:00Z' }
      ],
      status: 'active'
    },
    {
      id: '27',
      name: 'ServiceNow',
      icon: 'Settings',
      type: 'IT Service Management',
      clients: [
        { name: 'IT Department', lastSync: '2024-03-14T10:45:00Z' },
        { name: 'Service Desk', lastSync: '2024-03-14T09:00:00Z' }
      ],
      status: 'active'
    },
    {
      id: '28',
      name: 'Jira',
      icon: 'Tool',
      type: 'Project Management',
      clients: [
        { name: 'Development Team', lastSync: '2024-03-14T11:30:00Z' },
        { name: 'Product Team', lastSync: '2024-03-14T10:15:00Z' }
      ],
      status: 'active'
    },
    {
      id: '29',
      name: 'QuickBooks',
      icon: 'BookOpen',
      type: 'Accounting',
      clients: [
        { name: 'Bookkeeping', lastSync: '2024-03-14T09:45:00Z' },
        { name: 'Tax Team', lastSync: '2024-03-14T11:00:00Z' }
      ],
      status: 'active'
    },
    {
      id: '30',
      name: 'Adobe Analytics',
      icon: 'PieChart',
      type: 'Analytics Platform',
      clients: [
        { name: 'Web Analytics', lastSync: '2024-03-14T10:30:00Z' },
        { name: 'UX Team', lastSync: '2024-03-14T09:15:00Z' }
      ],
      status: 'active'
    }
  ]
};