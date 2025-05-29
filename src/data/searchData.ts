import { SearchAsset } from '../types/assets';
import { assetCounts } from '../data/homeData';

const generateMockAssets = (): SearchAsset[] => {
  // Flatten all asset types from assetCounts
  const assetTypes = assetCounts.flatMap(group => 
    group.assets.map(asset => asset.name)
  );

  const names = [
    'Customer Orders',
    'Product Inventory',
    'Sales Analytics',
    'User Activity',
    'Revenue Metrics',
    'Marketing Campaign',
    'Order Processing',
    'Customer Segmentation',
    'Inventory Status',
    'Financial Reports',
    'Employee Data',
    'Supplier Management',
    'Shipping Logistics',
    'Product Categories',
    'Customer Support',
    'Website Analytics',
    'Social Media Metrics',
    'Email Campaigns',
    'Payment Processing',
    'Vendor Relations'
  ];

  const prefixes = [
    'Daily',
    'Monthly',
    'Annual',
    'Global',
    'Regional',
    'Department',
    'Team',
    'Project',
    'Client',
    'Partner'
  ];

  const suffixes = [
    'Summary',
    'Details',
    'Analysis',
    'Report',
    'Dashboard',
    'Metrics',
    'Statistics',
    'Overview',
    'Insights',
    'Trends'
  ];

  const users = [
    'John Smith',
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Kim',
    'Lisa Thompson',
    'James Wilson',
    'Maria Garcia',
    'Robert Taylor',
    'Jennifer Lee'
  ];

  const getTags = (type: string): string[] => {
    const tags: string[] = [];
    
    if (Math.random() > 0.8) tags.push('inactive');
    if (Math.random() > 0.9) tags.push('no-dependents');

    switch (type) {
      case 'Columns':
        if (Math.random() > 0.7) tags.push('pii');
        if (Math.random() > 0.8) tags.push('lookup');
        break;
      case 'Tables':
      case 'Query Tables':
        if (Math.random() > 0.8) tags.push('sync-failed');
        if (Math.random() > 0.8) tags.push('long-running');
        break;
      case 'Data Sources':
        if (Math.random() > 0.8) tags.push('sync-failed');
        break;
    }

    return tags;
  };

  // First, create one asset for each type
  const guaranteedAssets: SearchAsset[] = assetTypes.map((type, index) => ({
    id: `asset-${index + 1}`,
    name: `Primary ${type} ${names[index % names.length]}`,
    type,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
    createdBy: users[Math.floor(Math.random() * users.length)],
    sharedUsersCount: Math.floor(Math.random() * 50),
    dataSourcesCount: Math.floor(Math.random() * 10),
    downstreamAssetsCount: Math.floor(Math.random() * 100),
    tags: getTags(type),
    icon: type.toLowerCase().replace(/ /g, '-')
  }));

  // Then generate additional random assets
  const randomAssets: SearchAsset[] = Array.from({ length: 180 }, (_, i) => {
    const type = assetTypes[Math.floor(Math.random() * assetTypes.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const fullName = `${prefix} ${name} ${suffix}`;

    return {
      id: `asset-${guaranteedAssets.length + i + 1}`,
      name: fullName,
      type,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
      createdBy: users[Math.floor(Math.random() * users.length)],
      sharedUsersCount: Math.floor(Math.random() * 50),
      dataSourcesCount: Math.floor(Math.random() * 10),
      downstreamAssetsCount: Math.floor(Math.random() * 100),
      tags: getTags(type),
      icon: type.toLowerCase().replace(/ /g, '-')
    };
  });

  // Combine and shuffle the arrays
  const allAssets = [...guaranteedAssets, ...randomAssets];
  for (let i = allAssets.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAssets[i], allAssets[j]] = [allAssets[j], allAssets[i]];
  }

  return allAssets;
};

export const mockAssets = generateMockAssets();