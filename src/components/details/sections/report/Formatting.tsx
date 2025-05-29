import React from 'react';
import * as Icons from 'lucide-react';
import { SearchAsset } from '../../../../types/assets';

interface FormattingProps {
  asset: SearchAsset;
}

export const Formatting: React.FC<FormattingProps> = ({ asset }) => {
  // Mock formatting details
  const formattingDetails = {
    chartType: 'Line Chart',
    chartOptions: {
      showLegend: true,
      legendPosition: 'bottom',
      showGridLines: true,
      showDataLabels: true,
      enableAnimation: true,
      aspectRatio: '16:9'
    },
    colors: {
      palette: 'Default',
      primary: '#2563eb',
      secondary: '#60a5fa',
      accent: '#93c5fd',
      customColors: [
        { label: 'Revenue', color: '#2563eb' },
        { label: 'Expenses', color: '#dc2626' },
        { label: 'Profit', color: '#16a34a' }
      ]
    },
    axes: {
      xAxis: {
        title: 'Date',
        format: 'MMM YYYY',
        rotation: 0,
        showLabels: true
      },
      yAxis: {
        title: 'Amount',
        format: '$#,##0.00',
        showLabels: true,
        startFromZero: true
      }
    },
    conditionalFormatting: [
      {
        condition: 'value > 1000000',
        style: { color: '#16a34a', bold: true }
      },
      {
        condition: 'value < 0',
        style: { color: '#dc2626', bold: true }
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Chart Type and Basic Options */}
      <div>
        <h3 className="text-lg font-medium mb-4">Chart Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Icons.BarChart className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Chart Type</h4>
            </div>
            <p className="text-sm text-gray-600">{formattingDetails.chartType}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Icons.Settings className="w-5 h-5 text-blue-600" />
              <h4 className="text-sm font-medium text-gray-900">Display Options</h4>
            </div>
            <div className="space-y-2">
              {Object.entries(formattingDetails.chartOptions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4">Color Configuration</h3>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Color Palette</p>
              <p className="text-sm font-medium">{formattingDetails.colors.palette}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Primary Color</p>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: formattingDetails.colors.primary }}
                />
                <span className="text-sm font-medium">{formattingDetails.colors.primary}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900 mb-2">Series Colors</p>
            {formattingDetails.colors.customColors.map((color, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{color.label}</span>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: color.color }}
                  />
                  <span className="text-sm font-medium">{color.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Axes Configuration */}
      <div>
        <h3 className="text-lg font-medium mb-4">Axes Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">X-Axis</h4>
            <div className="space-y-2">
              {Object.entries(formattingDetails.axes.xAxis).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Y-Axis</h4>
            <div className="space-y-2">
              {Object.entries(formattingDetails.axes.yAxis).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-sm font-medium">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Formatting */}
      <div>
        <h3 className="text-lg font-medium mb-4">Conditional Formatting</h3>
        <div className="space-y-3">
          {formattingDetails.conditionalFormatting.map((rule, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Condition {index + 1}</p>
                  <p className="text-sm text-gray-600 mt-1">{rule.condition}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Color:</span>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: rule.style.color }}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Bold:</span>
                    <Icons.Check className={`w-4 h-4 ${rule.style.bold ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};