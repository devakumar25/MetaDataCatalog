import React from 'react';
import * as Icons from 'lucide-react';
import { mockTransformations } from './mockData';

interface TransformationTileProps {
  item: any;
}

const TransformationTile: React.FC<TransformationTileProps> = ({ item }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'pipeline':
        return <Icons.GitBranch className="w-5 h-5 text-blue-600" />;
      case 'code':
        return <Icons.Code className="w-5 h-5 text-blue-600" />;
      case 'snapshot':
        return <Icons.Camera className="w-5 h-5 text-blue-600" />;
      default:
        return <Icons.File className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
            {item.type === 'pipeline' && (
              <p className="text-xs text-gray-500">
                {item.sourceTablesCount} source tables
              </p>
            )}
            {item.type === 'snapshot' && (
                <p className="text-xs text-gray-500">Report: {item.sourceReport}</p>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Last synced: {new Date(item.lastSync).toLocaleString()}
      </p>
    </div>
  );
};

interface TransformationSectionProps {
  title: string;
  items: any[];
}

const TransformationSection: React.FC<TransformationSectionProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="grid gap-4">
        {items.map((item) => (
          <TransformationTile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export const TransformationsTab: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div>
        <TransformationSection 
          title="Pipelines" 
          items={mockTransformations.pipelines} 
        />
      </div>
      <div>
        <TransformationSection 
          title="Code Studio" 
          items={mockTransformations.codeStudio} 
        />
      </div>
      <div>
        <TransformationSection 
          title="Snapshots" 
          items={mockTransformations.snapshots} 
        />
      </div>
    </div>
  );
};