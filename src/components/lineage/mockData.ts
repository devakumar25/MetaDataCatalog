import { LineageData } from './types';

// Generate more realistic mock data with 20+ nodes
export const mockLineageData: LineageData = {
  nodes: [
    // Data Sources
    {
      id: 'ds1',
      name: 'Sales Database',
      type: 'Data Source',
      tags: ['active', 'primary'],
      description: 'Main sales transaction database'
    },
    {
      id: 'ds2',
      name: 'Customer Database',
      type: 'Data Source',
      tags: ['active'],
      description: 'Customer information and profiles'
    },
    
    // Base Tables
    {
      id: 'table1',
      name: 'Orders',
      type: 'Table',
      tags: ['core', 'high-volume'],
      description: 'Raw order transactions'
    },
    {
      id: 'table2',
      name: 'Products',
      type: 'Table',
      tags: ['core', 'reference'],
      description: 'Product catalog and details'
    },
    {
      id: 'table3',
      name: 'Customers',
      type: 'Table',
      tags: ['core', 'pii'],
      description: 'Customer master data'
    },
    {
      id: 'table4',
      name: 'Categories',
      type: 'Table',
      tags: ['reference'],
      description: 'Product categories'
    },
    
    // Query Tables
    {
      id: 'qt1',
      name: 'Daily Sales',
      type: 'Query Table',
      tags: ['aggregated', 'cached'],
      description: 'Daily sales aggregations'
    },
    {
      id: 'qt2',
      name: 'Customer Metrics',
      type: 'Query Table',
      tags: ['aggregated', 'cached'],
      description: 'Customer-level metrics'
    },
    {
      id: 'qt3',
      name: 'Product Performance',
      type: 'Query Table',
      tags: ['aggregated'],
      description: 'Product performance metrics'
    },
    
    // Custom Formulas
    {
      id: 'cf1',
      name: 'Revenue Calculation',
      type: 'Custom Formula',
      tags: ['finance'],
      description: 'Complex revenue calculations'
    },
    {
      id: 'cf2',
      name: 'Customer Segments',
      type: 'Custom Formula',
      tags: ['marketing'],
      description: 'Customer segmentation logic'
    },
    
    // Reports
    {
      id: 'report1',
      name: 'Sales Performance',
      type: 'Report',
      tags: ['dashboard', 'featured'],
      description: 'Daily sales performance report'
    },
    {
      id: 'report2',
      name: 'Customer Analysis',
      type: 'Report',
      tags: ['dashboard'],
      description: 'Customer behavior analysis'
    },
    {
      id: 'report3',
      name: 'Product Insights',
      type: 'Report',
      tags: ['operational'],
      description: 'Product performance insights'
    },
    
    // Dashboards
    {
      id: 'dashboard1',
      name: 'Executive Overview',
      type: 'Dashboard',
      tags: ['featured'],
      description: 'Executive KPI dashboard'
    },
    {
      id: 'dashboard2',
      name: 'Sales Operations',
      type: 'Dashboard',
      tags: ['operational'],
      description: 'Sales operations monitoring'
    },
    
    // ML Models
    {
      id: 'ml1',
      name: 'Churn Prediction',
      type: 'ML Model',
      tags: ['active'],
      description: 'Customer churn prediction model'
    },
    {
      id: 'ml2',
      name: 'Product Recommendations',
      type: 'ML Model',
      tags: ['active'],
      description: 'Product recommendation engine'
    }
  ],
  edges: [
    // Data Source connections
    { source: 'ds1', target: 'table1' },
    { source: 'ds1', target: 'table2' },
    { source: 'ds2', target: 'table3' },
    { source: 'ds1', target: 'table4' },
    
    // Table relationships
    { source: 'table1', target: 'qt1' },
    { source: 'table2', target: 'qt1' },
    { source: 'table3', target: 'qt2' },
    { source: 'table2', target: 'qt3' },
    { source: 'table4', target: 'qt3' },
    
    // Query Table usage
    { source: 'qt1', target: 'cf1' },
    { source: 'qt2', target: 'cf2' },
    { source: 'qt3', target: 'report3' },
    
    // Formula usage
    { source: 'cf1', target: 'report1' },
    { source: 'cf2', target: 'report2' },
    
    // Report to Dashboard
    { source: 'report1', target: 'dashboard1' },
    { source: 'report2', target: 'dashboard1' },
    { source: 'report3', target: 'dashboard2' },
    
    // ML Model connections
    { source: 'qt2', target: 'ml1' },
    { source: 'qt3', target: 'ml2' }
  ]
};