export const mockDataSources = {
  'files-and-feeds': [
    {
      id: '1',
      name: 'Google Drive',
      icon: 'fileText',
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
      icon: 'cloud',
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
      icon: 'fileText',
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
      icon: 'cloud',
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
      icon: 'server',
      type: 'File Transfer',
      tables: [
        { name: 'Vendor Data', rowCount: 7500, lastSync: '2024-03-14T09:45:00Z' },
        { name: 'Partner Feeds', rowCount: 4200, lastSync: '2024-03-14T11:15:00Z' }
      ],
      status: 'active'
    }
  ],
  'cloud-sources': [
    {
      id: '11',
      name: 'Snowflake',
      icon: 'database',
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
      icon: 'cloud',
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
      icon: 'database',
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
      icon: 'database',
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
      icon: 'database',
      type: 'NoSQL Database',
      connections: [
        { name: 'User Data', dbType: 'MongoDB', lastSync: '2024-03-14T10:30:00Z' },
        { name: 'Events DB', dbType: 'MongoDB', lastSync: '2024-03-14T09:15:00Z' }
      ],
      tags: ['MongoDB']
    }
  ],
  'business-apps': [
    {
      id: '21',
      name: 'Salesforce',
      icon: 'cloud',
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
      icon: 'barChart',
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
      icon: 'headphones',
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
      icon: 'briefcase',
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
      icon: 'dollarSign',
      type: 'ERP',
      clients: [
        { name: 'Finance Team', lastSync: '2024-03-14T11:15:00Z' },
        { name: 'Accounting', lastSync: '2024-03-14T10:00:00Z' }
      ],
      status: 'active'
    }
  ]
};