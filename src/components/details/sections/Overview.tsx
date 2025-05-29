import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../types/assets';

interface OverviewProps {
  dataSource: SearchAsset;
}

export const Overview: React.FC<OverviewProps> = ({ dataSource }) => {
  // Mock table/query table details
  const tableDetails = {
    name: dataSource.name,
    type: dataSource.type,
    rowCount: 1234567,
    description: 'Contains customer transaction data with detailed order information',
    query: dataSource.type === 'Query Tables' ? `
SELECT 
  o.order_id,
  o.order_date,
  c.customer_name,
  c.email,
  p.product_name,
  p.category,
  o.quantity,
  o.unit_price,
  (o.quantity * o.unit_price) as total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
WHERE o.order_date >= DATEADD(month, -3, GETDATE())
  AND o.status = 'completed'
ORDER BY o.order_date DESC
    `.trim() : null,
    sourceDataSource: dataSource.type === 'Query Tables' ? [
      {
        name: 'Sales Database',
        type: 'PostgreSQL',
        status: 'active'
      },
      {
        name: 'Product Catalog',
        type: 'MySQL',
        status: 'active'
      }
    ] : [
      {
        name: 'Sales Database',
        type: 'PostgreSQL',
        status: 'active'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Table Information</h3>
        <dl className="grid grid-cols-3 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900">{tableDetails.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Type</dt>
            <dd className="mt-1 text-sm text-gray-900">{tableDetails.type}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Row Count</dt>
            <dd className="mt-1 text-sm text-gray-900">{tableDetails.rowCount.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created By</dt>
            <dd className="mt-1 text-sm text-gray-900">{dataSource.createdBy}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(dataSource.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Shared Users</dt>
            <dd className="mt-1 text-sm text-gray-900">{dataSource.sharedUsersCount}</dd>
          </div>
        </dl>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium mb-4">Description</h3>
        <p className="text-sm text-gray-600">{tableDetails.description}</p>
      </div>

      {/* Query (for Query Tables only) */}
      {tableDetails.query && (
        <div>
          <h3 className="text-lg font-medium mb-4">Query Definition</h3>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm relative group">
            <pre className="whitespace-pre-wrap text-gray-800">{tableDetails.query}</pre>
            <button 
              className="absolute top-2 right-2 p-2 bg-white rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => navigator.clipboard.writeText(tableDetails.query || '')}
            >
              <Icons.Copy className="w-4 h-4 text-gray-500 hover:text-blue-600" />
            </button>
          </div>
        </div>
      )}

      {/* Source Data Sources */}
      <div>
        <h3 className="text-lg font-medium mb-4">Source Data Sources</h3>
        <div className="space-y-4">
          {tableDetails.sourceDataSource.map((source, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Icons.Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{source.name}</h4>
                    <p className="text-xs text-gray-500">{source.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  source.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {source.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};