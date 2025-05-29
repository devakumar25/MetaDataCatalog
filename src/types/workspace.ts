export interface Workspace {
  id: string;
  name: string;
  description: string;
  lastAccessed: string;
  createdAt: string;
  createdBy: string;
  assetsCount: number;
  isFavorite: boolean;
}

export type SortOption = 'Most Recent' | 'Created Time' | 'Assets';