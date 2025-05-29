import React, { useState } from 'react';
import * as Icons from 'lucide-react';

// Interfaces for each resource type
interface Alert {
  id: string;
  name: string;
  reportName: string;
  createdOn: string;
  lastRunTime: string;
  nextRunTime: string;
}

interface Schedule {
  id: string;
  name: string;
  scheduleTime: string;
  lastRun: string;
  nextRun: string;
  category: 'one-time' | 'cleanup' | 'deletion';
}

interface DFSFile {
  id: string;
  name: string;
  category: 'import' | 'integration' | 'temporary';
  size: number;
}

// Mock data
const mockAlerts: Alert[] = Array.from({ length: 15 }, (_, i) => ({
  id: `alert-${i + 1}`,
  name: `Alert ${i + 1}`,
  reportName: `Report ${Math.floor(Math.random() * 10) + 1}`,
  createdOn: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  lastRunTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
  nextRunTime: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
}));

const mockSchedules: Schedule[] = Array.from({ length: 15 }, (_, i) => ({
  id: `schedule-${i + 1}`,
  name: `Schedule ${i + 1}`,
  scheduleTime: '0 0 * * *', // Cron expression
  lastRun: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
  nextRun: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
  category: ['one-time', 'cleanup', 'deletion'][Math.floor(Math.random() * 3)] as Schedule['category'],
}));

const mockFiles: DFSFile[] = Array.from({ length: 15 }, (_, i) => ({
  id: `file-${i + 1}`,
  name: `file_${i + 1}.csv`,
  category: ['import', 'integration', 'temporary'][Math.floor(Math.random() * 3)] as DFSFile['category'],
  size: Math.floor(Math.random() * 1000000000), // Random size up to 1GB
}));

export const ResourcesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'schedules' | 'files'>('alerts');
  const [searchQuery, setSearchQuery] = useState('');

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const getTotalFileSize = () => {
    return formatFileSize(mockFiles.reduce((acc, file) => acc + file.size, 0));
  };

  const getScheduleColor = (category: Schedule['category']) => {
    switch (category) {
      case 'one-time':
        return 'bg-blue-100 text-blue-800';
      case 'cleanup':
        return 'bg-yellow-100 text-yellow-800';
      case 'deletion':
        return 'bg-red-100 text-red-800';
    }
  };

  const getFileCategoryColor = (category: DFSFile['category']) => {
    switch (category) {
      case 'import':
        return 'bg-green-100 text-green-800';
      case 'integration':
        return 'bg-blue-100 text-blue-800';
      case 'temporary':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'alerts'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab('schedules')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'schedules'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Schedules
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${activeTab === 'files'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
            `}
          >
            Files
          </button>
        </div>
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Files Summary (only shown for files tab) */}
      {activeTab === 'files' && (
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Files</div>
            <div className="text-2xl font-semibold">{mockFiles.length}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500">Total Size</div>
            <div className="text-2xl font-semibold">{getTotalFileSize()}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {activeTab === 'alerts' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                </>
              )}
              {activeTab === 'schedules' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                </>
              )}
              {activeTab === 'files' && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activeTab === 'alerts' &&
              mockAlerts
                .filter(alert => 
                  alert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  alert.reportName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(alert => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.reportName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(alert.createdOn).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(alert.lastRunTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(alert.nextRunTime).toLocaleString()}
                    </td>
                  </tr>
                ))}

            {activeTab === 'schedules' &&
              mockSchedules
                .filter(schedule => 
                  schedule.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(schedule => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.scheduleTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(schedule.lastRun).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(schedule.nextRun).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getScheduleColor(schedule.category)}`}>
                        {schedule.category}
                      </span>
                    </td>
                  </tr>
                ))}

            {activeTab === 'files' &&
              mockFiles
                .filter(file => 
                  file.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(file => (
                  <tr key={file.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{file.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getFileCategoryColor(file.category)}`}>
                        {file.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.size)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};