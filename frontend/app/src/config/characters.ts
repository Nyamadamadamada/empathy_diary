import { NodeEdgeDataSet, NodeType } from '../types/emotion';

export const CHARA = {
  FAMILY: 'FAMILY',
  WORK: 'WORK',
  FRIENDS: 'FRIENDS',
  SERVICE: 'SERVICE',
  OTHER: 'OTHER',
};

export type CHARA_TYPE = (typeof CHARA)[keyof typeof CHARA];

export type CharaDetail = {
  name: string;
  relation: string;
};

interface CharaMeta {
  chara: string;
  title: string;
  image: string;
  borderColor: string;
  highlightColor: string;
}

export const charaMetaMap: Record<CHARA_TYPE, CharaMeta> = {
  FAMILY: {
    chara: 'FAMILY',
    title: '家族',
    image: '/img/chara/house.svg', // イメージに合わせたパスに変更
    borderColor: '#FECD80', // 淡いオレンジ
    highlightColor: '#FDBA74', // 明るいオレンジ
  },
  WORK: {
    chara: 'WORK',
    title: '職場',
    image: '/img/chara/code-xml.svg', // イメージに合わせたパスに変更
    borderColor: '#A8D7FF', // 淡い青
    highlightColor: '#60A5FA', // 明るい青
  },
  FRIENDS: {
    chara: 'FRIENDS',
    title: '友人・趣味',
    image: '/img/chara/music.svg', // イメージに合わせたパスに変更
    borderColor: '#B0E8D7', // 淡い緑
    highlightColor: '#6EE7B7', // 明るい緑
  },
  SERVICE: {
    chara: 'SERVICE',
    title: '娯楽・サービス関係',
    image: '/img/chara/japanese-yen.svg', // イメージに合わせたパスに変更
    borderColor: '#DDC9FF', // 淡い紫
    highlightColor: '#C4B5FD', // 明るい紫
  },
  OTHER: {
    chara: 'OTHER',
    title: 'その他',
    image: '/img/chara/apple.svg', // イメージに合わせたパスに変更
    borderColor: '#D4D4D8', // 淡いグレー
    highlightColor: '#A1A1AA', // 明るいグレー
  },
};

export const controlNodes = Object.values(charaMetaMap).map((meta) => ({
  id: meta.chara,
  label: meta.title,
  shape: 'circularImage',
  imagePadding: 10,
  image: meta.image,
  size: 30,
  borderWidth: 2,
  color: {
    background: 'white',
    border: meta.borderColor,
    highlight: {
      background: meta.highlightColor,
      border: meta.borderColor,
    },
  },
}));

interface SubNodeConfig {
  category: CHARA_TYPE;
  idSuffix: string;
  label: string;
}

function createSubNode({ category, idSuffix, label }: SubNodeConfig) {
  const meta = charaMetaMap[category];
  return {
    id: label,
    label,
    shape: 'dot',
    size: 20,
    borderWidth: 2,
    color: {
      background: meta.highlightColor,
      border: 'white',
      highlight: {
        background: meta.highlightColor,
        border: meta.borderColor,
      },
    },
  };
}

// FAMILY カテゴリ
const familyNodes = ['妻', 'のぞみ', 'かなた', '父ちゃん', '母ちゃん'].map((label, idx) =>
  createSubNode({ category: 'FAMILY', idSuffix: `${idx + 1}`, label }),
);

// WORK カテゴリ
const workNodes = ['部長', 'ひねくれ先輩', '山本くん', '経理部のチャチさん'].map((label, idx) =>
  createSubNode({ category: 'WORK', idSuffix: `${idx + 1}`, label }),
);

// FRIENDS カテゴリ
const friendsNodes = ['あゆむ君', 'シャルさん', 'ねねさん'].map((label, idx) =>
  createSubNode({ category: 'FRIENDS', idSuffix: `${idx + 1}`, label }),
);

// SERVICE カテゴリ
const serviceNodes = ['マスター', 'かかりつけ医', '宅配便の人', '河口さん'].map((label, idx) =>
  createSubNode({ category: 'SERVICE', idSuffix: `${idx + 1}`, label }),
);

// OTHER カテゴリ
const otherNodes = ['保育園の先生', 'フレンドリーゴースト'].map((label, idx) =>
  createSubNode({ category: 'OTHER', idSuffix: `${idx + 1}`, label }),
);

/** NOTE: generateDataFromNodes() で Nodes から Data を生成する */
const generateDataFromNodes = (nodes: NodeType[], parentNodeId: string | number): NodeEdgeDataSet => ({
  nodes: nodes,
  /** from 親・Node => to 子・Node に向かって、Edges(枝)を伸ばす */
  edges: nodes.map((node: NodeType) => ({ from: parentNodeId, to: node.id })),
});
/** 中央に表示する 第一階層の Nodes & Edges */
export const initialData = generateDataFromNodes(controlNodes, 'rootNode');

/** 第二階層以降の Nodes & Edges */
export const familyGraph = generateDataFromNodes(familyNodes, 'FAMILY');
export const workGraph = generateDataFromNodes(workNodes, 'WORK');
export const friendsGraph = generateDataFromNodes(friendsNodes, 'FRIENDS');
export const serviceGraph = generateDataFromNodes(serviceNodes, 'SERVICE');
export const otherGraph = generateDataFromNodes(otherNodes, 'OTHER');

export const graphMap: Record<string, NodeEdgeDataSet> = {
  [CHARA.FAMILY]: familyGraph,
  [CHARA.WORK]: workGraph,
  [CHARA.FRIENDS]: friendsGraph,
  [CHARA.SERVICE]: serviceGraph,
  [CHARA.OTHER]: otherGraph,
};
