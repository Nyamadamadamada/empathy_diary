import { EMOTION } from '~/config/emotion';

export interface NodeType {
  id: string | number;
  label: string;
  shape: string;
  image?: string;
  size: number;
  borderWidth: number;
  color: {
    background: string;
    border: string;
    highlight: {
      background: string;
      border: string;
    };
  };
}

export interface EdgeType {
  from: string | number;
  to: string | number;
}

export type GraphData = { nodes: []; edges: [] };

export interface NodeEdgeDataSet {
  nodes: NodeType[];
  edges: EdgeType[];
}

export type EMOTION_TYPE = (typeof EMOTION)[keyof typeof EMOTION];

export type Emotion = {
  emotion: EMOTION_TYPE;
  title: string;
  description: string[]; // ← 配列に変更
  image: string;
};
