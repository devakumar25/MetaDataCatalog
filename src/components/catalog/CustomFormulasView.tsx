
import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../types/assets';
import { FormulaDetails } from '../details/FormulaDetails';
import { LineageView } from '../lineage/LineageView';

interface FormulaData {
  id: string;
  name: string;
  expression: string;
  returnType: string;
  tables: string[];
  usageCount: number;
  lastAccessed: string;
  tags: string[];
}

// Mock data for formulas
const mockFormulas: FormulaData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `formula-${i + 1}`,
  name: [
    'Total Revenue',
    'Customer Lifetime Value',
    'Product Margin',
    'Order Discount',
    'Shipping Cost',
    'Tax Amount',
    'Net Profit',
    'Average Order Value',
    'Conversion Rate',
    'Return Rate'
  ][Math.floor(Math.random() * 10)],
  expression: [
    'sale_price - cost_price',
    'CASE WHEN order_amount > 100 THEN 0.1 ELSE 0.05 END',
    'weight * shipping_rate',
    'price * tax_rate',
    'revenue - costs',
    'total_revenue / order_count',
    'converted_users / total_users',
    'returned_items / total_items',
    '2 * price * tax_rate',
    'price - 3 * tax_rate',
    'price / tax_rate',
  ][Math.floor(Math.random() * 10)],
  returnType: ['number', 'decimal', 'integer', 'percentage'][Math.floor(Math.random() * 4)],
  tables: [
    ['orders'],
    ['customers', 'orders'],
    ['products', 'inventory'],
    ['orders', 'shipments'],
    ['sales', 'costs']
  ][Math.floor(Math.random() * 5)],
  usageCount: Math.floor(Math.random() * 100),
  lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 30)).toISOString(),
  tags: [
    ...(Math.random() > 0.6 ? ['no dependents'] : []),
    ...(Math.random() > 0.7 ? ['multi-table'] : ['single-table']),
    ...(Math.random() > 0.8 ? ['pii'] : []),
    ...(Math.random() > 0.9 ? ['lookup'] : [])
  ]
}));

interface Column {
  key: keyof FormulaData | 'actions';
  label: string;
  visible: boolean;
  sortable?: boolean;
}

type SortConfig = {
  key: keyof FormulaData;
  direction: 'asc' | 'desc';
} | null;

export const CustomFormulasView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<SearchAsset | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [columnSelectorAnchor, setColumnSelectorAnchor] = useState<HTMLButtonElement | null>(null);
  const [showLineage, setShowLineage] = useState(false);
  const [assetName, setAssetName] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([
    { key: 'name', label: 'Formula Name', visible: true, sortable: true },
    { key: 'expression', label: 'Expression', visible: true, sortable: true },
    { key: 'returnType', label: 'Return Type', visible: true, sortable: true },
    { key: 'tables', label: 'Source Tables', visible: true, sortable: true },
    { key: 'usageCount', label: 'Usage Count', visible: true, sortable: true },
    { key: 'lastAccessed', label: 'Last Accessed', visible: true, sortable: true },
    { key: 'actions', label: 'Actions', visible: true, sortable: false }
  ]);

  const tagCounts = mockFormulas.reduce((acc: Record<string, number>, formula) => {
    formula.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const handleSort = (key: keyof FormulaData) => {
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

  const getSortedFormulas = (formulas: FormulaData[]) => {
    if (!sortConfig) return formulas;

    return [...formulas].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (Array.isArray(aValue) && Array.isArray(bValue)) {
        return sortConfig.direction === 'asc'
          ? aValue.length - bValue.length
          : bValue.length - aValue.length;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortConfig.direction === 'asc'
          ? (aValue === bValue ? 0 : aValue ? 1 : -1)
          : (aValue === bValue ? 0 : aValue ? -1 : 1);
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

  const filteredAndSortedFormulas = useMemo(() => {
    const filtered = mockFormulas.filter(formula => {
      const matchesSearch = 
        formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.expression.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formula.tables.some(table => table.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => formula.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });

    return getSortedFormulas(filtered);
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

  const getComplexityColor = (complexity: FormulaData['complexity']) => {
    switch (complexity) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleShowLineage = (formulaId: string) => {
    // Implement lineage view
    console.log('Show lineage for:', formulaId);
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
                placeholder="Search formulas..."
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
                    onClick={() => column.sortable && handleSort(column.key as keyof FormulaData)}
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
              {filteredAndSortedFormulas.map((formula) => (
                <tr key={formula.id} className="hover:bg-gray-50">
                  {columns.filter(col => col.visible).map((col) => {
                    switch (col.key) {
                      case 'name':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-blue-50 rounded-lg">
                                <Icons.Calculator className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {formula.name}
                                </div>
                                <div className="flex gap-1 mt-1">
                                  {formula.tags.map(tag => (
                                    <span
                                      key={tag}
                                      className={`
                                        inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                                        ${tag === 'multi-table' ? 'bg-blue-100 text-blue-800' : ''}
                                        ${tag === 'pii' ? 'bg-yellow-100 text-yellow-800' : ''}
                                        ${tag === 'single-table' ? 'bg-stone-100 text-green-800' : ''}
                                        ${tag === 'no dependents' ? 'bg-stone-100 text-red-800' : ''}
                                      `}
                                    >
                                      {tag.replace('-', ' ')}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      case 'expression':
                        return (
                          <td key={col.key} className="px-6 py-4">
                            <div className="text-sm text-gray-900 font-mono">
                              {formula.expression}
                            </div>
                          </td>
                        );
                      case 'returnType':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{formula.returnType}</div>
                          </td>
                        );
                      case 'tables':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {formula.tables.map((table, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                                >
                                  {table}
                                </span>
                              ))}
                            </div>
                          </td>
                        );
                      case 'complexity':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(formula.complexity)}`}>
                              {formula.complexity}
                            </span>
                          </td>
                        );
                      case 'isCached':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              formula.isCached 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {formula.isCached ? 'Yes' : 'No'}
                            </span>
                          </td>
                        );
                      case 'usageCount':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formula.usageCount}
                            </div>
                          </td>
                        );
                      case 'lastAccessed':
                        return (
                          <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(formula.lastAccessed)}
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
                                      setAssetName(formula.name);
                                 }}
                                className="text-gray-400 hover:text-blue-600"
                              >
                                <Icons.Network className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  const searchAsset: SearchAsset = {
                                    id: formula.id,
                                    name: formula.name,
                                    type: 'Custom Formulas',
                                    createdAt: new Date().toISOString(),
                                    createdBy: 'System',
                                    sharedUsersCount: 0,
                                    dataSourcesCount: formula.tables.length,
                                    downstreamAssetsCount: formula.usageCount,
                                    tags: formula.tags,
                                    icon: 'calculator'
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
        <FormulaDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          path={['Catalog', 'Custom Formulas', selectedAsset.name, 'Details']}
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
