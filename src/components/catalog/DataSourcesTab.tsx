import React from 'react';
import * as Icons from 'lucide-react';
import { DataSourceSection } from './DataSourceSection';
import { mockDataSources } from './mockData';

interface DataSourcesTabProps {
  onSourceSelect: (source: any, selectedItem?: any) => void;
}

export const DataSourcesTab: React.FC<DataSourcesTabProps> = ({ onSourceSelect }) => {
  return (
    <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
      <DataSourceSection
        title="Files and Feeds"
        description="Connect to files and data feeds"
        icon="FileText"
        sources={mockDataSources['files-and-feeds']}
        onSourceSelect={onSourceSelect}
      />
      <DataSourceSection
        title="Cloud Data Sources"
        description="Connect to cloud databases and storage"
        icon="Cloud"
        sources={mockDataSources['cloud-sources']}
        onSourceSelect={onSourceSelect}
      />
      <DataSourceSection
        title="Business Applications"
        description="Connect to business tools and apps"
        icon="Briefcase"
        sources={mockDataSources['business-apps']}
        onSourceSelect={onSourceSelect}
      />
    </div>
  );
};