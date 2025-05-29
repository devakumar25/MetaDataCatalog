// Add DataCluster interface
export interface DataCluster {
  id: string;
  name: string;
  tablesCount: number;
  lookupsCount: number;
  isActive: boolean;
  tags: string[];
}

// Add SearchAsset interface
export interface SearchAsset {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  createdBy: string;
  sharedUsersCount: number;
  dataSourcesCount: number;
  downstreamAssetsCount: number;
  tags: string[];
  icon: string;
}

// Add DataSource interface
export interface DataSource {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  host?: string;
  port?: number;
  database?: string;
  syncFrequency: string;
  lastSync: string;
  nextSync: string;
  tablesCount: number;
  queryTablesCount: number;
  reportsCount: number;
  dashboardsCount: number;
  createdBy: string;
  createdAt: string;
  lastModifiedBy: string;
  lastModifiedAt: string;
}

// Add AssetCount interface
export interface AssetCount {
  name: string;
  count: number;
  icon: string;
}

// Add RecentAsset interface
export interface RecentAsset {
  id: string;
  name: string;
  type: 'Table' | 'QueryTable' | 'Report' | 'Dashboard';
  lastAccessed: string;
  icon: string;
}

// Add DataFreshnessIssue interface
export interface DataFreshnessIssue {
  id: string;
  name: string;
  type: 'Table' | 'QueryTable';
  lastFailedAt: string;
  failureCount: number;
  icon: string;
}

// Add UserActionable interface
export interface UserActionable {
  id: string;
  type: string;
  message: string;
  assetName: string;
  assetType: string;
  icon: string;
  metadata: {
    failureCount?: number;
    timeWindow?: string;
    duration?: string;
  };
}
interface RecentDataChange {
  id: string;
  type: string;
  message: string;
  assetName: string;
  assetType: string;
  changedBy: string;
  timestamp: string;
  affectedAssets: number;
}

// Add RecommendedAction interface
export interface RecommendedAction {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
}