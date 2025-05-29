import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { DashboardDetails } from '../details/DashboardDetails';
import { LineageView } from '../lineage/LineageView';

interface DashboardData {
  id: string;
  name: string;
  description: string;
  views: {
    total: number;
    byType: {
      charts: number;
      tables: number;
      kpis: number;
    };
  };
  dataSources: string[];
  refreshSchedule: {
    frequency: 'Real-time' | 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
    lastRefresh: string;
    nextRefresh: string;
    status: 'success' | 'failed' | 'running';
  };
  usageCount: number;
  lastAccessed: string;
  owner: string;
  tags: string[];
}

// Mock data for dashboards
const mockDashboards: DashboardData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `dashboard-${i + 1}`,
  name: [
    'Executive Overview',
    'Sales Performance',
    'Marketing Analytics',
    'Customer Insights',
    'Product Metrics',
    'Financial Dashboard',
    'Operations KPIs',
    'Support Analytics',
    'User Engagement',
    'Team Performance'
  ][Math.floor(Math.random() * 10)],
  description: 'Comprehensive view of key business metrics and performance indicators',
  views: {
    total: Math.floor(Math.random() * 15) + 5,
    byType: {
      charts: Math.floor(Math.random() * 8) + 2,
      tables: Math.floor(Math.random() * 5) + 1,
      kpis: Math.floor(Math.random() * 6) + 2
    }
  },
  dataSources: [
    ['Sales Database'],
    ['Customer Database', 'Orders Database'],
    ['Product Database', 'Inventory Database'],
    ['Marketing Database', 'Analytics Database'],
    ['Financial Database', 'Accounting Database']
  ][Math.floor(Math.random() * 5)],
  usageCount: Math.floor(Math.random() * 1000),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  owner: [
    'John Smith',
    'Sarah Johnson',
    'Michael Chen',
    'Emily Rodriguez',
    'David Kim'
  ][Math.floor(Math.random() * 5)],
  tags: [
    ...(Math.random() > 0.7 ? ['slow'] : []),
    ...(Math.random() > 0.8 ? ['popular'] : []),
    ...(Math.random() > 0.9 ? ['inactive'] : [])
  ]
}));

interface Column {
  key: keyof DashboardData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof DashboardData;
  direction: 'asc' | 'desc';
} | null;

export const DashboardsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
     const [showLineage, setShowLineage] = useState(false);
   const [assetName, setAssetName] = useState<string>('');


  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Dashboard Name', visible: true, sortable: true },
    { key: 'views', label: 'Views', visible: true, sortable: true },
    { key: 'dataSources', label: 'Data Sources', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'owner', label: 'Owner', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockDashboards.reduce((acc: Record<string, number>, dashboard) => {
    dashboard.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof DashboardData) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });
  };

  const getSortedDashboards = (dashboards: DashboardData[]) => {
    if (!sortConfig) return dashboards;

    return [...dashboards].sort((a, b) => {
      if (sortConfig.key === 'refreshSchedule') {
        const aDate = new Date(a.refreshSchedule.lastRefresh).getTime();
        const bDate = new Date(b.refreshSchedule.lastRefresh).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      if (sortConfig.key === 'views') {
        return sortConfig.direction === 'asc'
          ? a.views.total - b.views.total
          : b.views.total - a.views.total;
      }

      if (sortConfig.key === 'layout') {
        return sortConfig.direction === 'asc'
          ? a.layout.type.localeCompare(b.layout.type)
          : b.layout.type.localeCompare(a.layout.type);
      }

      if (sortConfig.key === 'theme') {
        return sortConfig.direction === 'asc'
          ? a.theme.name.localeCompare(b.theme.name)
          : b.theme.name.localeCompare(a.theme.name);
      }

      if (Array.isArray(a[sortConfig.key]) && Array.isArray(b[sortConfig.key])) {
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key].length - b[sortConfig.key].length
          : b[sortConfig.key].length - a[sortConfig.key].length;
      }

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (sortConfig.key === 'lastAccessed') {
        const aDate = new Date(a.lastAccessed).getTime();
        const bDate = new Date(b.lastAccessed).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }

      return 0;
    });
  };

  const filteredAndSortedDashboards = useMemo(() => {
    const filtered = mockDashboards.filter(dashboard => {
      const matchesSearch = 
        dashboard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dashboard.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dashboard.owner.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => dashboard.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedDashboards(filtered);
  }, [searchQuery, selectedTags, sortConfig]);

  const renderSortIcon = (column: Column) => {
    if (!column.sortable) return null;

    const isCurrentSort = sortConfig?.key === column.key;
    const direction = sortConfig?.direction;

    return (
      <span className="ml-2 inline-flex">
        {isCurrentSort ? (
          direction === 'asc' ? (
            <Icons.ArrowUp className="w-4 h-4" />
          ) : (
            <Icons.ArrowDown className="w-4 h-4" />
          )
        ) : (
          <Icons.ArrowUpDown className="w-4 h-4 text-gray-300" />
        )}
      </span>
    );
  };

  const getLayoutTypeIcon = (type: DashboardData['layout']['type']) => {
    switch (type) {
      case 'Grid':
        return <Icons.LayoutGrid className="w-4 h-4" />;
      case 'Free':
        return <Icons.Layout className="w-4 h-4" />;
      case 'Tabs':
        return <Icons.Columns className="w-4 h-4" />;
    }
  };

  const getLayoutTypeColor = (type: DashboardData['layout']['type']) => {
    switch (type) {
      case 'Grid':
        return 'bg-blue-100 text-blue-800';
      case 'Free':
        return 'bg-green-100 text-green-800';
      case 'Tabs':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getRefreshStatusColor = (status: 'success' | 'failed' | 'running') => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'running':
        return 'text-blue-600 bg-blue-50';
    }
  };

  const getRefreshStatusIcon = (status: 'success' | 'failed' | 'running') => {
    switch (status) {
      case 'success':
        return <Icons.CheckCircle className="w-4 h-4" />;
      case 'failed':
        return <Icons.XCircle className="w-4 h-4" />;
      case 'running':
        return <Icons.RefreshCw className="w-4 h-4 animate-spin" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (dashboardId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', dashboardId);
  };

  return (
    <div className="p-4">
      {/* Header Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dashboards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              ref={(el) => {
                if (el && !columnSelectorAnchor) setColumnSelectorAnchor(el);
              }}
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center space-x-2">
                <Icons.Columns className="w-4 h-4" />
                <span>Show/Hide Columns</span>
              </div>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTags(prev => 
                  prev.includes(tag) 
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                ${selectedTags.includes(tag)
                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {tag.replace('-', ' ')} ({count})
            </button>
          ))}
        </div>

        {/* Column Selector Dropdown */}
        {showColumnSelector && columnSelectorAnchor && (
          <div 
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-50 w-64"
            style={{
              top: columnSelectorAnchor.getBoundingClientRect().bottom + 4,
              left: columnSelectorAnchor.getBoundingClientRect().left
            }}
          >
            <div className="p-2">
              {columns.map((column) => (
                <label
                  key={column.key}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={column.visible}
                    onChange={() => {
                      setColumns(columns.map(col => 
                        col.key === column.key 
                          ? { ...col, visible: !col.visible }
                          : col
                      ));
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{column.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.filter(col => col.visible).map((column) => (
                  <th
                    key={column.key}
                    className={`
                      px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                      ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    `}
                    onClick={() => column.sortable && handleSort(column.key as keyof DashboardData)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedDashboards.map((dashboard) => (
                <tr key={dashboard.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.LayoutDashboard className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {dashboard.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {dashboard.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'slow' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        ${tag === 'popular' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${tag === 'inactive' ? 'bg-red-100 text-red-800' : ''}
                                      `}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'layout':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getLayoutTypeColor(dashboard.layout.type)}`}>
                                {getLayoutTypeIcon(dashboard.layout.type)}
                                <span>{dashboard.layout.type}</span>
                              </span>
                              {dashboard.layout.type === 'Grid' && (
                                <div className="text-xs text-gray-500">
                                  {dashboard.layout.columns}x{dashboard.layout.rows} grid
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      case 'theme':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                              <div className="text-sm font-medium text-gray-900">
                                {dashboard.theme.name}
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: dashboard.theme.primaryColor }}
                                  />
                                  <span className="text-xs text-gray-500">Primary</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: dashboard.theme.accentColor }}
                                  />
                                  <span className="text-xs text-gray-500">Accent</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'views':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                {dashboard.views.total} views
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{dashboard.views.byType.charts} charts</span>
                                <span>•</span>
                                <span>{dashboard.views.byType.tables} tables</span>
                                <span>•</span>
                                <span>{dashboard.views.byType.kpis} KPIs</span>
                              </div>
                            </div>
                          </td>
                        );
                      case 'dataSources':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {dashboard.dataSources.map((source, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {source}
                                </span>
                              ))}
                            </div>
                          </td>
                        );
                      case 'refreshSchedule':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className={`p-1 rounded-full ${getRefreshStatusColor(dashboard.refreshSchedule.status)}`}>
                                  {getRefreshStatusIcon(dashboard.refreshSchedule.status)}
                                </span>
                                <span className="text-sm font-medium">
                                  {dashboard.refreshSchedule.frequency}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Last: {formatDate(dashboard.refreshSchedule.lastRefresh)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Next: {formatDate(dashboard.refreshSchedule.nextRefresh)}
                              </div>
                            </div>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {dashboard.usageCount}
                            </div>
                          </td>
                        );
                      case 'owner':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {dashboard.owner}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(dashboard.lastAccessed)}
                            </div>
                          </td>
                        );
                      case 'actions':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
 onClick={() => {
    setShowLineage(true);
    setAssetName(dashboard.name);
}}                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: dashboard.id,
                                    name: dashboard.name,
                                    type: 'Dashboards',
                                    createdAt: new Date().toISOString(),
                                    createdBy: dashboard.owner,
                                    sharedUsersCount: 0,
                                    dataSourcesCount: dashboard.dataSources.length,
                                    downstreamAssetsCount: dashboard.usageCount,
                                    tags: dashboard.tags,
                                    icon: 'layout-dashboard'
                                  };
                                  setSelectedAsset(searchAsset);
                                }}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Info className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        );
                      default:
                        return null;
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <DashboardDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Dashboards', selectedAsset.name, 'Details']}
        />
      )}

      {showLineage && (
    <LineageView
      assetId={assetName}
      onClose={() => setShowLineage(false)}
    />
)}
    </div>
  );
};