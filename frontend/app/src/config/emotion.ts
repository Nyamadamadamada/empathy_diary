import { EMOTION_TYPE, NodeEdgeDataSet, NodeType } from '../types/emotion';

export const EMOTION = {
  HAPPY: 'HAPPY',
  LOVE: 'LOVE',
  FEAR: 'FEAR',
  ANGRY: 'ANGRY',
  DISGUSTED: 'DISGUSTED',
  INTEREST: 'INTEREST',
  SURPRISED: 'SURPRISED',
  SAD: 'SAD',
  NEUTRAL: 'NEUTRAL',
};

export function isEmotion(value: string): value is EMOTION_TYPE {
  return Object.values(EMOTION).includes(value as EMOTION_TYPE);
}
export const moodMap: Record<string, 'happy' | 'meh' | 'frown'> = {
  喜び: 'happy',
  愛: 'happy',
  恐怖: 'frown',
  驚き: 'meh',
  悲しみ: 'frown',
  嫌い: 'frown',
  怒り: 'frown',
  関心: 'meh',
  ふつう: 'meh',
  安心: 'happy',
  楽しい: 'happy',
  スッキリ: 'happy',
  穏やか: 'happy',
  信頼: 'happy',
  認める: 'happy',
  許す: 'happy',
  キュン: 'happy',
  好き: 'happy',

  不安: 'frown',
  ざわざわ: 'frown',
  心配: 'frown',

  意外: 'meh',
  パニック: 'frown',
  戸惑う: 'meh',

  切ない: 'frown',
  泣ける: 'frown',
  悲壮: 'frown',

  うんざり: 'frown',
  めんどう: 'frown',
  敵視: 'frown',

  イライラ: 'frown',
  モヤモヤ: 'frown',
  ぶちギレ: 'frown',

  期待: 'happy',
  わくわく: 'happy',
  ドキドキ: 'meh',

  退屈: 'meh',
  何とも思わない: 'meh',
};

export const idLabelMap: Record<string, string> = {
  // 第一階層（感情）
  HAPPY: '喜び',
  LOVE: '愛',
  FEAR: '恐怖',
  SURPRISED: '驚き',
  SAD: '悲しみ',
  DISGUSTED: '嫌い',
  ANGRY: '怒り',
  INTEREST: '関心',
  NEUTRAL: 'ふつう',

  // 第二階層（サブノード）
  HAPPY_1: '安心',
  HAPPY_2: '楽しい',
  HAPPY_3: 'スッキリ',
  HAPPY_4: '穏やか',

  LOVE_1: '信頼',
  LOVE_2: '認める',
  LOVE_3: '許す',
  LOVE_4: 'キュン',
  LOVE_5: '好き',

  FEAR_1: '不安',
  FEAR_2: 'ざわざわ',
  FEAR_3: '心配',

  SURPRISED_1: '意外',
  SURPRISED_2: 'パニック',
  SURPRISED_3: '戸惑う',

  SAD_1: '切ない',
  SAD_2: '泣ける',
  SAD_3: '悲壮',

  DISGUSTED_1: 'うんざり',
  DISGUSTED_2: 'めんどう',
  DISGUSTED_3: '敵視',

  ANGRY_1: 'イライラ',
  ANGRY_2: 'モヤモヤ',
  ANGRY_3: 'ぶちギレ',

  INTEREST_1: '期待',
  INTEREST_2: 'わくわく',
  INTEREST_3: 'ドキドキ',

  NEUTRAL_1: '退屈',
  NEUTRAL_2: '何とも思わない',
};

interface EmotionMeta {
  emotion: EMOTION_TYPE;
  title: string;
  image: string;
  borderColor: string;
  highlightColor: string;
}

export const emotionMetaMap: Record<EMOTION_TYPE, EmotionMeta> = {
  HAPPY: {
    emotion: 'HAPPY',
    title: '喜び',
    image: '/img/emotions/happy.png',
    borderColor: '#fbbf24',
    highlightColor: '#fde68a',
  },
  LOVE: {
    emotion: 'LOVE',
    title: '愛',
    image: '/img/emotions/love.png',
    borderColor: '#65a30d',
    highlightColor: '#a3e635',
  },
  FEAR: {
    emotion: 'FEAR',
    title: '恐怖',
    image: '/img/emotions/fear.png',
    borderColor: '#059669',
    highlightColor: '#34d399',
  },
  SURPRISED: {
    emotion: 'SURPRISED',
    title: '驚き',
    image: '/img/emotions/surprised.png',
    borderColor: '#06b6d4',
    highlightColor: '#a5f3fc',
  },
  SAD: {
    emotion: 'SAD',
    title: '悲しみ',
    image: '/img/emotions/sad.png',
    borderColor: '#1e40af',
    highlightColor: '#60a5fa',
  },
  DISGUSTED: {
    emotion: 'DISGUSTED',
    title: '嫌い',
    image: '/img/emotions/disgusted.png',
    borderColor: '#5b21b6',
    highlightColor: '#a78bfa',
  },
  ANGRY: {
    emotion: 'ANGRY',
    title: '怒り',
    image: '/img/emotions/angry.png',
    borderColor: '#dc2626',
    highlightColor: '#fca5a5',
  },
  INTEREST: {
    emotion: 'INTEREST',
    title: '関心',
    image: '/img/emotions/interest.png',
    borderColor: '#ea580c',
    highlightColor: '#fb923c',
  },
  NEUTRAL: {
    emotion: 'NEUTRAL',
    title: 'ふつう',
    image: '/img/emotions/neutral.png',
    borderColor: '#4b5563',
    highlightColor: '#94a3b8',
  },
};

export const controlNodes = Object.values(emotionMetaMap).map((meta) => ({
  id: meta.emotion,
  label: meta.title,
  shape: 'circularImage',
  image: meta.image,
  size: 40,
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
  emotion: EMOTION_TYPE;
  idSuffix: string;
  label: string;
}

function createSubNode({ emotion, idSuffix, label }: SubNodeConfig) {
  const meta = emotionMetaMap[emotion];
  return {
    id: `${emotion}_${idSuffix}`,
    label,
    shape: 'dot',
    size: 25,
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

const happyNodes = ['安心', '楽しい', 'スッキリ', '穏やか'].map((label, idx) =>
  createSubNode({ emotion: 'HAPPY', idSuffix: `${idx + 1}`, label }),
);

const loveNodes = ['信頼', '認める', '許す', 'キュン', '好き'].map((label, idx) =>
  createSubNode({ emotion: 'LOVE', idSuffix: `${idx + 1}`, label }),
);

const fearNodes = ['不安', 'ざわざわ', '心配'].map((label, idx) =>
  createSubNode({ emotion: 'FEAR', idSuffix: `${idx + 1}`, label }),
);

const surprisedNodes = ['意外', 'パニック', '戸惑う'].map((label, idx) =>
  createSubNode({ emotion: 'SURPRISED', idSuffix: `${idx + 1}`, label }),
);

const sadNodes = ['切ない', '泣ける', '悲壮'].map((label, idx) =>
  createSubNode({ emotion: 'SAD', idSuffix: `${idx + 1}`, label }),
);

const disgustedNodes = ['うんざり', 'めんどう', '敵視'].map((label, idx) =>
  createSubNode({ emotion: 'DISGUSTED', idSuffix: `${idx + 1}`, label }),
);

const angryNodes = ['イライラ', 'モヤモヤ', 'ぶちギレ'].map((label, idx) =>
  createSubNode({ emotion: 'ANGRY', idSuffix: `${idx + 1}`, label }),
);

const interestNodes = ['期待', 'わくわく', 'ドキドキ'].map((label, idx) =>
  createSubNode({ emotion: 'INTEREST', idSuffix: `${idx + 1}`, label }),
);

const neutralNodes = ['退屈', '何とも思わない'].map((label, idx) =>
  createSubNode({ emotion: 'NEUTRAL', idSuffix: `${idx + 1}`, label }),
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
export const happyGraph = generateDataFromNodes(happyNodes, 'HAPPY');
export const loveGraph = generateDataFromNodes(loveNodes, 'LOVE');
export const fearGraph = generateDataFromNodes(fearNodes, 'FEAR');
export const surprisedGraph = generateDataFromNodes(surprisedNodes, 'SURPRISED');
export const sadGraph = generateDataFromNodes(sadNodes, 'SAD');
export const disgustedGraph = generateDataFromNodes(disgustedNodes, 'DISGUSTED');
export const angryGraph = generateDataFromNodes(angryNodes, 'ANGRY');
export const interestGraph = generateDataFromNodes(interestNodes, 'INTEREST');
export const neutralGraph = generateDataFromNodes(neutralNodes, 'NEUTRAL');

export const emotionGraphMap: Record<string, NodeEdgeDataSet> = {
  HAPPY: happyGraph,
  LOVE: loveGraph,
  ANGRY: angryGraph,
  FEAR: fearGraph,
  SAD: sadGraph,
  SURPRISED: surprisedGraph,
  DISGUSTED: disgustedGraph,
  INTEREST: interestGraph,
  NEUTRAL: neutralGraph,
};

export function getEmotionGraphData(nodeId: string): NodeEdgeDataSet | undefined {
  // nodeIdが１層目の感情の場合
  if (Object.values(EMOTION).includes(nodeId)) {
    return;
  }
  // nodeIdが2層目の感情の場合
  const parentEmotion = nodeId.split('_')[0];
  const graphData = emotionGraphMap[parentEmotion];
  if (!graphData) {
    return;
  }
  return graphData;
}
