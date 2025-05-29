 
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { ReportDetails } from '../details/ReportDetails';
import { LineageView } from '../lineage/LineageView';

interface ReportData {
  id: string;
  name: string;
  description: string;
  type: 'Table' | 'Chart' | 'Pivot' | 'KPI' | 'Summary';
  dimensions: number;
  metrics: number;
  filters: number;
  usageCount: number;
  lastAccessed: string;
  owner: string;
  tags: string[];
}

// Mock data for reports
const mockReports: ReportData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `report-${i + 1}`,
  name: [
    'Sales Performance Dashboard',
    'Customer Analytics Report',
    'Product Inventory Summary',
    'Marketing Campaign Results',
    'Financial Metrics Overview',
    'User Engagement Analysis',
    'Support Tickets Summary',
    'Revenue Trends Report',
    'Operational KPIs',
    'Employee Performance Metrics'
  ][Math.floor(Math.random() * 10)],
  description: 'Comprehensive analysis of key business metrics and performance indicators',
  type: ['Table', 'Chart', 'Pivot', 'KPI', 'Summary'][Math.floor(Math.random() * 5)] as ReportData['type'],
  dimensions: Math.floor(Math.random() * 10) + 1,
  metrics: Math.floor(Math.random() * 15) + 1,
  filters: Math.floor(Math.random() * 8) + 1,
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
  key: keyof ReportData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof ReportData;
  direction: 'asc' | 'desc';
} | null;

export const ReportsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
     const [showLineage, setShowLineage] = useState(false);
   const [assetName, setAssetName] = useState<string>('');


  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Report Name', visible: true, sortable: true },
    { key: 'type', label: 'Type', visible: true, sortable: true },
    { key: 'dimensions', label: 'Dimensions', visible: true, sortable: true },
    { key: 'metrics', label: 'Metrics', visible: true, sortable: true },
    { key: 'filters', label: 'Filters', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'owner', label: 'Owner', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockReports.reduce((acc: Record<string, number>, report) => {
    report.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof ReportData) => {
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

  const getSortedReports = (reports: ReportData[]) => {
    if (!sortConfig) return reports;

    return [...reports].sort((a, b) => {
      if (sortConfig.key === 'refreshSchedule') {
        const aDate = new Date(a.refreshSchedule.lastRefresh).getTime();
        const bDate = new Date(b.refreshSchedule.lastRefresh).getTime();
        return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
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

  const filteredAndSortedReports = useMemo(() => {
    const filtered = mockReports.filter(report => {
      const matchesSearch = 
        report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.owner.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => report.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedReports(filtered);
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

  const getReportTypeIcon = (type: ReportData['type']) => {
    switch (type) {
      case 'Table':
        return <Icons.Table className="w-4 h-4" />;
      case 'Chart':
        return <Icons.BarChart className="w-4 h-4" />;
      case 'Pivot':
        return <Icons.Grid className="w-4 h-4" />;
      case 'KPI':
        return <Icons.Target className="w-4 h-4" />;
      case 'Custom':
        return <Icons.Settings className="w-4 h-4" />;
    }
  };

  const getReportTypeColor = (type: ReportData['type']) => {
    switch (type) {
      case 'Table':
        return 'bg-blue-100 text-blue-800';
      case 'Chart':
        return 'bg-green-100 text-green-800';
      case 'Pivot':
        return 'bg-purple-100 text-purple-800';
      case 'KPI':
        return 'bg-orange-100 text-orange-800';
      case 'Custom':
        return 'bg-gray-100 text-gray-800';
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

  const handleShowLineage = (reportId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', reportId);
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
                placeholder="Search reports..."
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
                    onClick={() => column.sortable && handleSort(column.key as keyof ReportData)}
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
              {filteredAndSortedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.BarChart className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {report.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {report.tags.map(tag => (
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
                      case 'type':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getReportTypeColor(report.type)}`}>
                              {getReportTypeIcon(report.type)}
                              <span>{report.type}</span>
                            </span>
                          </td>
                        );
                      case 'chartType':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.chartType || '-'}
                            </div>
                          </td>
                        );
                      case 'dataSources':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {report.dataSources.map((source, index) => (
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
                                <span className={`p-1 rounded-full ${getRefreshStatusColor(report.refreshSchedule.status)}`}>
                                  {getRefreshStatusIcon(report.refreshSchedule.status)}
                                </span>
                                <span className="text-sm font-medium">
                                  {report.refreshSchedule.frequency}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Last: {formatDate(report.refreshSchedule.lastRefresh)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Next: {formatDate(report.refreshSchedule.nextRefresh)}
                              </div>
                            </div>
                          </td>
                        );
                      case 'dimensions':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.dimensions}
                            </div>
                          </td>
                        );
                      case 'metrics':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.metrics}
                            </div>
                          </td>
                        );
                      case 'filters':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.filters}
                            </div>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.usageCount}
                            </div>
                          </td>
                        );
                      case 'owner':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {report.owner}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(report.lastAccessed)}
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
    setAssetName(report.name);
}}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: report.id,
                                    name: report.name,
                                    type: 'Reports',
                                    createdAt: new Date().toISOString(),
                                    createdBy: report.owner,
                                    sharedUsersCount: 0,
                                    dataSourcesCount: report.dataSources?.length || 0,
                                    downstreamAssetsCount: report.usageCount,
                                    tags: report.tags,
                                    icon: 'bar-chart'
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
        <ReportDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Reports', selectedAsset.name, 'Details']}
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
