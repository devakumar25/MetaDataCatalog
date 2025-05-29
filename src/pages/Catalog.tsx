import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { CatalogDetails } from '../components/catalog/CatalogDetails';
import { TablesView } from '../components/catalog/TablesView';
import { QueryTablesView } from '../components/catalog/QueryTablesView';
import { PipeLineTablesView } from '../components/catalog/PipeLineTablesView';
import { SnapshotTablesView } from '../components/catalog/SnapshotTablesView';
import { CustomTransformationTablesView } from '../components/catalog/CustomTransformationTablesView';
import { ColumnsView } from '../components/catalog/ColumnsView';
import { RelationsView } from '../components/catalog/RelationsView';
import { CustomFormulasView } from '../components/catalog/CustomFormulasView';
import { VariablesView } from '../components/catalog/VariablesView';
import { AggregatesView } from '../components/catalog/AggregatesView';
import { FormattingView } from '../components/catalog/FormattingView';
import { FilterCriteriaView } from '../components/catalog/FilterCriteriaView';
import { ReportsView } from '../components/catalog/ReportsView';
import { DashboardsView } from '../components/catalog/DashboardsView';
import { SlideshowsView } from '../components/catalog/SlideshowsView';
import { PortalsView } from '../components/catalog/PortalsView';
import { MLModelsView } from '../components/catalog/MLModelsView';
import { AgentStudioView } from '../components/catalog/AgentStudioView';
import { DataCacheTablesView } from '../components/catalog/DataCacheTablesView';
import { ResourcesView } from '../components/catalog/ResourcesView';
import { UsersView } from '../components/catalog/UsersView';
import { GroupsView } from '../components/catalog/GroupsView';
import { RolesNPermissionsView } from '../components/catalog/RolesNPermissionsView';
import { SchedulesView } from '../components/catalog/SchedulesView';
import { ActionsView } from '../components/catalog/ActionsView';
import { AskZiaNAgents } from '../components/catalog/AskZiaNAgents';
import { ChannelsView } from '../components/catalog/ChannelsView';
import { CustomFunctionsView } from '../components/catalog/CustomFunctionsView';

interface CategoryItem {
  id: string;
  name: string;
  icon: keyof typeof Icons;
  path: string;
  items?: CategoryItem[];
}

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Icons;
  items?: CategoryItem[];
}

const catalogStructure: Category[] = [
  {
    id: 'data',
    name: 'Data',
    icon: 'Database',
    items: [
      { id: 'data-sources', name: 'Data Sources', icon: 'Database', path: 'data-sources' },
      { id: 'tables', name: 'Tables', icon: 'Table', path: 'tables' },
      { id: 'query-tables', name: 'Query Tables', icon: 'TableProperties', path: 'query-tables' },
     // { id: 'pipeline-tables', name: 'Pipeline Tables', icon: 'TableProperties', path: 'pipeline-tables' },
     // { id: 'snapshot-tables', name: 'Snapshot Tables', icon: 'TableProperties', path: 'snapshot-tables' },
     // { id: 'custom-transformation-tables', name: 'Transformation Tables', icon: 'TableProperties', path: 'custom-transformation-tables' },
    ],
  },
  {
    id: 'modeling',
    name: 'Modeling',
    icon: 'GitBranch',
    items: [
      { id: 'columns', name: 'Table Data Columns', icon: 'GitBranch', path: 'columns' },
      { 
        id: 'relationships', 
        name: 'Relationships', 
        icon: 'GitMerge', 
        path: 'relationships'
      },
      { id: 'custom-formulas', name: 'Formula Columns', icon: 'Calculator', path: 'custom-formulas' },
      { id: 'variables', name: 'Variables', icon: 'Variable', path: 'variables' },
      { id: 'filter-criteria', name: 'Filters', icon: 'Filter', path: 'filter-criteria' },
      { id: 'aggregate-formulas', name: 'Aggregate Formula Columns', icon: 'Calculator', path: 'aggregate-formulas' },
      { id: 'ml-models', name: 'ML Models', icon: 'Brain', path: 'ml-models' },
      { id: 'custom-functions', name: 'Custom Code Functions', icon: 'Settings', path: 'custom-functions' },
      { id: 'formatting', name: 'Formatting', icon: 'TextCursor', path: 'formatting' },
    ],
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: 'Zap',
    items: [
      { id: 'data-cache-tables', name: 'Data Cache Tables', icon: 'Database', path: 'data-cache-tables' },
    ],
  },
  {
    id: 'visualization',
    name: 'Analytics',
    icon: 'BarChart',
    items: [
      { id: 'reports', name: 'Reports', icon: 'BarChart', path: 'reports' },
      { id: 'dashboards', name: 'Dashboards', icon: 'LayoutDashboard', path: 'dashboards' },
      { id: 'slideshows', name: 'Slideshows', icon: 'Presentation', path: 'slideshows' },
      { id: 'portals', name: 'Portals', icon: 'Layout', path: 'portals' },
    ],
  },
  {
    id: 'aiml',
    name: 'AI & Automation',
    icon: 'Cpu',
    items: [
      { id: 'schedules', name: 'Scheduled Actions', icon: 'Clock', path: 'schedules' },
      { id: 'askzia', name: 'Ask Zia', icon: 'Zap', path: 'askzia' },
      { id: 'actions', name: 'AI Agents', icon: 'Bot', path: 'actions' },
      { id: 'channels', name: 'Channels', icon: 'Rss', path: 'channels' },
    ],
  },
  {
    id: 'users-groups',
    name: 'User Management',
    icon: 'UserCheck',
    items: [
      { id: 'users', name: 'Users', icon: 'Users', path: 'users' },
      { id: 'groups', name: 'Groups', icon: 'Share2', path: 'groups' },
      { id: 'roles', name: 'Roles & Permissions', icon: 'Shield', path: 'roles' },
    ],
  },
  {
    id: 'complaince',
    name: 'Complaince',
    icon: 'ShieldCheck',
  },
  /*{
    id: 'others',
    name: 'Others',
    icon: 'MoreHorizontal',
    items: [
      { id: 'resources', name: 'Resources', icon: 'FolderTree', path: 'resources' },
    ],
  },*/
];

interface CategoryNodeProps {
  category: Category | CategoryItem;
  level: number;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onSelect: (path: string) => void;
  isCollapsed: boolean;
  isLastItem?: boolean;
  activePath?: string;
}

const CategoryNode: React.FC<CategoryNodeProps> = ({
  category,
  level,
  expanded,
  onToggle,
  onSelect,
  isCollapsed,
  isLastItem = false,
  activePath
}) => {
  const Icon = Icons[category.icon];
  const hasChildren = category.items?.length > 0;
  const isExpanded = expanded[category.id];
  const isActive = 'path' in category && activePath === category.path;

  return (
    <div className="relative">
      {/* Vertical line for indentation */}
      {level > 0 && !isCollapsed && (
        <div
          className={`absolute left-0 w-px bg-gray-200 ${isLastItem ? 'h-1/2' : 'h-full'}`}
          style={{
            left: `${(level - 1) * 1.5 + 0.5}rem`,
          }}
        />
      )}

      <div
        className={`
          flex items-center py-1.5 px-2 rounded-md cursor-pointer
          hover:bg-gray-100 transition-colors group relative
          ${level === 0 ? 'font-medium' : ''}
          ${isActive ? 'bg-blue-50 text-blue-600' : ''}
        `}
        style={{ 
          paddingLeft: isCollapsed ? '0.5rem' : `${level * 1.5 + 0.5}rem`,
          marginLeft: level > 0 && !isCollapsed ? '0.5rem' : '0'
        }}
        onClick={() => 'path' in category && onSelect(category.path)}
      >
        {/* Horizontal line for indentation */}
        {level > 0 && !isCollapsed && (
          <div
            className="absolute h-px bg-gray-200"
            style={{
              left: `${(level - 1) * 1.5 + 0.5}rem`,
              width: '1rem',
              top: '50%',
            }}
          />
        )}

        <div className="flex items-center flex-1 min-w-0">
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(category.id);
              }}
              className="p-0.5 hover:bg-gray-200 rounded mr-1 flex-shrink-0"
            >
              {isExpanded ? (
                <Icons.ChevronDown className="w-4 h-4" />
              ) : (
                <Icons.ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          {(!isCollapsed || !hasChildren) && (
            <div className="relative flex-shrink-0">
              <Icon className={`w-4 h-4 ${isCollapsed ? '' : 'mr-2'}`} />
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded 
                              opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {category.name}
                </div>
              )}
            </div>
          )}
          {!isCollapsed && <span className="truncate">{category.name}</span>}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className="relative">
          {category.items?.map((item, index, array) => (
            <CategoryNode
              key={item.id}
              category={item}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
              onSelect={onSelect}
              isCollapsed={isCollapsed}
              isLastItem={index === array.length - 1}
              activePath={activePath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CatalogSidebar: React.FC<{
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}> = ({ isCollapsed, onToggleCollapse }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initialExpanded: Record<string, boolean> = {};
    const expandCategory = (category: Category | CategoryItem) => {
      initialExpanded[category.id] = true;
      category.items?.forEach(expandCategory);
    };
    catalogStructure.forEach(expandCategory);
    return initialExpanded;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleToggle = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (path: string) => {
    navigate(path);
  };

  return (


      <div
  className={`
    bg-white border-r border-gray-200 h-full transition-all duration-300
    ${isCollapsed ? 'w-12' : 'w-68'}
    overflow-y-auto 
    max-h-screen asset-view-scroll
  `}
>
        
      <div className="p-2 space-y-1">
        {catalogStructure.map((category, index) => (
          <React.Fragment key={category.id}>
            {index > 0 && isCollapsed && <hr className="my-2" />}
            <CategoryNode
              category={category}
              level={0}
              expanded={expanded}
              onToggle={handleToggle}
              onSelect={handleSelect}
              isCollapsed={isCollapsed}
              isLastItem={index === catalogStructure.length - 1}
              activePath={currentPath}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const CatalogPage: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/workspace/5/catalog') {
      navigate('data-sources');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex h-[calc(100vh-8rem)] -mt-6 w-full">
      <CatalogSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<CatalogDetails />} />
          <Route path="data-sources" element={<CatalogDetails />} />
          <Route path="tables" element={<TablesView />} />
          <Route path="query-tables" element={<QueryTablesView />} />
          <Route path="pipeline-tables" element={<PipeLineTablesView />} />
          <Route path="snapshot-tables" element={<SnapshotTablesView />} />
          <Route path="custom-transformation-tables" element={<CustomTransformationTablesView />} />
          <Route path="columns" element={<ColumnsView />} />
          <Route path="relationships" element={<RelationsView />} />
          <Route path="custom-formulas" element={<CustomFormulasView />} />
          <Route path="variables" element={<VariablesView />} />
          <Route path="aggregate-formulas" element={<AggregatesView />} />
          <Route path="ml-models" element={<MLModelsView />} />
          <Route path="custom-functions" element={<CustomFunctionsView />} />
          <Route path="formatting" element={<FormattingView />} />
          <Route path="filter-criteria" element={<FilterCriteriaView />} />
          <Route path="reports" element={<ReportsView />} />
          <Route path="dashboards" element={<DashboardsView />} />
          <Route path="data-cache-tables" element={<DataCacheTablesView />} />
          <Route path="slideshows" element={<SlideshowsView />} />
          <Route path="portals" element={<PortalsView />} />
          <Route path="schedules" element={<SchedulesView />} />
          <Route path="actions" element={<ActionsView />} />
          <Route path="askzia" element={<AskZiaNAgents />} />
          <Route path="channels" element={<ChannelsView />} />
          <Route path="users" element={<UsersView />} />
          <Route path="groups" element={<GroupsView />} />
          <Route path="roles" element={<RolesNPermissionsView />} />
          <Route path="resources" element={<ResourcesView />} />
          <Route path=":category" element={<CatalogDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default CatalogPage;