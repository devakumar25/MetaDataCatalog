import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface Formula {
  id: string;
  name: string;
  createdBy: string;
  description: string;
  expression: string;
  dataType: string;
  createdAt: string;
}

interface FormulasAndBucketsProps {
  formulas: Formula[];
}

export const FormulasAndBuckets: React.FC<FormulasAndBucketsProps> = ({ formulas }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType.toLowerCase()) {
      case 'string':
        return <Icons.Type className="w-4 h-4" />;
      case 'number':
        return <Icons.Hash className="w-4 h-4" />;
      case 'boolean':
        return <Icons.ToggleLeft className="w-4 h-4" />;
      case 'date':
        return <Icons.Calendar className="w-4 h-4" />;
      default:
        return <Icons.Circle className="w-4 h-4" />;
    }
  };

  const filteredFormulas = formulas.filter(formula =>
    formula.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formula.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    formula.expression.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
      </div>

      <div className="space-y-3">
        {filteredFormulas.map(formula => (
          <div
            key={formula.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {getDataTypeIcon(formula.dataType)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{formula.name}</h4>
                  <p className="text-xs text-gray-500">Created by {formula.createdBy}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(formula.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600">{formula.description}</p>
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                {formula.expression}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};