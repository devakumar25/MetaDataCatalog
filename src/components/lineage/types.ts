export interface AssetNode {
  id: string;
  name: string;
  type: string;
  tags: string[];
  description?: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export interface Edge {
  source: string;
  target: string;
}

export interface LineageData {
  nodes: AssetNode[];
  edges: Edge[];
}

export interface NodeAction {
  label: string;
  icon: string;
  onClick: () => void;
}