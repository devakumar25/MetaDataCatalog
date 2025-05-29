import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { DataSourceTile as DataSourceTileType } from './types';
import { DataSourceDetails } from '../details/DataSourceDetails';
import { getMockDataSource } from '../../data/mockData';

interface DataSourceTileProps {
  source: DataSourceTileType;
  onSelect: (source: DataSourceTileType, selectedItem?: any) => void;
}

export const DataSourceTile: React.FC<DataSourceTileProps> = ({ source, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const IconComponent = (Icons as any)[source.icon];

  const itemCount = source.tables?.length || source.connections?.length || source.clients?.length || 0;
  const hasMultipleItems = itemCount > 1;

  const handleInfoClick = (e: React.MouseEvent, itemData?: any) => {
    e.stopPropagation();
    setShowDetails(true);
  };

  const renderItems = () => {
    if (!isExpanded) return null;

    if (source.tables) {
      return source.tables.map((table, index) => (
        <div 
          key={index} 
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(source, table)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{table.name}</p>
              <div className="flex items-center space-x-4">
                <p className="text-xs text-gray-500">{table.rowCount.toLocaleString()} rows</p>
                <p className="text-xs text-gray-500">
                  Last synced: {new Date(table.lastSync!).toLocaleString()}
                </p>
              </div>
            </div>
            <button 
              className="p-1 hover:bg-gray-200 rounded-md"
              onClick={(e) => handleInfoClick(e, table)}
            >
              <Icons.Info className="w-4 h-4 text-gray-400 hover:text-blue-600" />
            </button>
          </div>
        </div>
      ));
    }

    if (source.connections) {
      return source.connections.map((conn, index) => (
        <div 
          key={index} 
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(source, conn)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{conn.name}</p>
              <div className="flex items-center space-x-4">
                <p className="text-xs text-gray-500">{conn.dbType}</p>
                <p className="text-xs text-gray-500">
                  Last synced: {new Date(conn.lastSync!).toLocaleString()}
                </p>
              </div>
            </div>
            <button 
              className="p-1 hover:bg-gray-200 rounded-md"
              onClick={(e) => handleInfoClick(e, conn)}
            >
              <Icons.Info className="w-4 h-4 text-gray-400 hover:text-blue-600" />
            </button>
          </div>
        </div>
      ));
    }

    if (source.clients) {
      return source.clients.map((client, index) => (
        <div 
          key={index} 
          className="p-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
          onClick={() => onSelect(source, client)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{client.name}</p>
              <p className="text-xs text-gray-500">
                Last synced: {new Date(client.lastSync!).toLocaleString()}
              </p>
            </div>
            <button 
              className="p-1 hover:bg-gray-200 rounded-md"
              onClick={(e) => handleInfoClick(e, client)}
            >
              <Icons.Info className="w-4 h-4 text-gray-400 hover:text-blue-600" />
            </button>
          </div>
        </div>
      ));
    }

    return null;
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
        <div 
          className="p-4 cursor-pointer"
          onClick={() => !hasMultipleItems && onSelect(source)}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                {IconComponent && <IconComponent className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{source.name}</h3>
                <p className="pt-1 text-xs text-gray-500">
                  {source.type}
                  {hasMultipleItems && (
                    <span className="ml-2 text-blue-600">
                      {source.tables ? `${itemCount} connections` : 
                       source.connections ? `${itemCount} connections` :
                       `${itemCount} connections`}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!hasMultipleItems && (
                <button
                  onClick={(e) => handleInfoClick(e)}
                  className="p-1 hover:bg-gray-100 rounded-md"
                >
                  <Icons.Info className="w-4 h-4 text-gray-400 hover:text-blue-600" />
                </button>
              )}
              {hasMultipleItems && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="p-1 hover:bg-gray-100 rounded-md"
                >
                  <Icons.ChevronDown className={`w-4 h-4 transition-transform ${
                    isExpanded ? 'transform rotate-180' : ''
                  }`} />
                </button>
              )}
            </div>
          </div>
          {!hasMultipleItems && source.lastSync && (
            <p className="text-xs text-gray-500 mt-1">
              Last synced: {new Date(source.lastSync).toLocaleString()}
            </p>
          )}
        </div>
        {isExpanded && (
          <div className="border-t border-gray-200 divide-y divide-gray-200">
            {renderItems()}
          </div>
        )}
      </div>

      {showDetails && (
        <DataSourceDetails
          dataSource={getMockDataSource(source.id)}
          onClose={() => setShowDetails(false)}
          path={['Catalog', source.name, 'Details']}
        />
      )}
    </>
  );
};