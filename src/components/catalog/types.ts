import { DivideIcon as LucideIcon } from 'lucide-react';

export interface DataSourceTile {
  id: string;
  name: string;
  icon: string;
  type: string;
  tables?: { 
    name: string; 
    rowCount: number;
    lastSync?: string;
  }[];
  connections?: {
    name: string;
    dbType: string;
    lastSync?: string;
  }[];
  clients?: {
    name: string;
    lastSync?: string;
  }[];
  lastSync?: string;
  status: 'active' | 'inactive';
}

export interface DataSourceSectionProps {
  title: string;
  description: string;
  icon: string;
  sources: DataSourceTile[];
  onSourceSelect: (source: DataSourceTile, selectedItem?: any) => void;
  isTransformation?: boolean;
  searchQuery?: string;
}

export interface AssetViewProps {
  searchQuery: string;
  selectedDataSource?: string;
}