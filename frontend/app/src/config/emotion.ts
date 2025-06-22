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
};

export function isEmotion(value: string): value is EMOTION_TYPE {
  return Object.values(EMOTION).includes(value as EMOTION_TYPE);
}

export const idLabelMap: Record<string, string> = {
  HAPPY: '嬉しい',
  HAPPY_1: '安心',
  HAPPY_2: '穏やか',
  HAPPY_3: '楽しい',
  HAPPY_4: '至福',

  LOVE: '愛',
  LOVE_1: '共感',
  LOVE_2: '信じる',
  LOVE_3: '尊敬',

  FEAR: '恐怖',
  FEAR_1: '不安',
  FEAR_2: '心配',
  FEAR_3: '怖い',

  SURPRISED: '驚き',
  SURPRISED_1: '戸惑う',
  SURPRISED_2: '意外だ',
  SURPRISED_3: 'パニック',

  SAD: '悲しみ',
  SAD_1: 'しんみり',
  SAD_2: '残念',
  SAD_3: '寂しい',
  SAD_4: '悲観',

  DISGUSTED: '嫌い',
  DISGUSTED_1: '苦手',
  DISGUSTED_2: 'うんざり',
  DISGUSTED_3: '憎い',

  ANGRY: '怒り',
  ANGRY_1: 'イライラ',
  ANGRY_2: '不満',
  ANGRY_3: 'ブチギレ',

  INTEREST: '関心',
  INTEREST_1: '気になる',
  INTEREST_2: '期待',
  INTEREST_3: '熱中',
  INTEREST_4: '警戒',
};

export const labelIdMap = Object.fromEntries(Object.entries(idLabelMap).map(([key, value]) => [value, key]));

export function getParentEmotionId(label: string): string | undefined {
  const emotionId = labelIdMap[label];
  if (typeof emotionId === 'undefined') {
    return;
  }
  return emotionId.split('_')[0]; // 'FEAR_1' -> ['FEAR', '1'] -> 'FEAR'
}

export type Step = {
  title: string[];
  bgColor: string;
  textColor: string;
};

export type EmotionStep = {
  step1: Step;
  step2: Step;
  step3: Step;
};

export interface EmotionMeta {
  emotion: EMOTION_TYPE;
  title: string;
  image: string;
  borderColor: string;
  highlightColor: string;
  imageColor: string;
  description: string; // descritionをdescriptionに修正しました
  reverse: {
    img: string;
    title: string;
  };
  emotionStep: EmotionStep;
}

export const emotionMetaMap: Record<EMOTION_TYPE, EmotionMeta> = {
  HAPPY: {
    emotion: 'HAPPY',
    title: '嬉しい',
    image: '/img/emotions/happy.png',
    borderColor: '#fbbf24',
    highlightColor: '#fde68a',
    imageColor: 'shadow-yellow-500/50',
    description: `自分の欲求が満たされた時に起きる感情です。
    瞬間的に感じる「喜び」と持続する「幸福感」に分けられます。欲求が大きく、意外であるほど
    喜びは強くなります。
    `,
    reverse: {
      img: '/img/emotions/sad.png', // 喜びの反対は悲しみ
      title: '悲しみ',
    },
    emotionStep: {
      step1: {
        title: ['安心', '穏やか'],
        bgColor: 'bg-yellow-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['楽しい', '嬉しい'],
        bgColor: 'bg-yellow-300',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['至福'],
        bgColor: 'bg-yellow-500',
        textColor: 'text-white',
      },
    },
  },
  LOVE: {
    emotion: 'LOVE',
    title: '愛',
    image: '/img/emotions/love.png',
    borderColor: '#65a30d',
    highlightColor: '#a3e635',
    imageColor: 'shadow-lime-500/50',
    description: `特定の人やものを高く評価する時に乗じる「任せられる」という気持ちです。
    信頼は他者からの評価であり、短期間では築けません。信用される実績を積むことで、結果として信頼・愛につながります。
    `,
    reverse: {
      img: '/img/emotions/disgusted.png', // 愛の反対は嫌悪
      title: '嫌悪',
    },
    emotionStep: {
      step1: {
        title: ['共感'],
        bgColor: 'bg-lime-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['信じる'],
        bgColor: 'bg-lime-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['愛', '尊敬'],
        bgColor: 'bg-lime-700',
        textColor: 'text-white',
      },
    },
  },
  FEAR: {
    emotion: 'FEAR',
    title: '恐怖',
    image: '/img/emotions/fear.png',
    borderColor: '#059669',
    highlightColor: '#34d399',
    imageColor: 'shadow-emerald-700/50',
    description: `自分にとって大切なものが、脅かされていると感じた時に生じる感情です。
    日常の不安にはリスク対策を行い、自ら安心をつくり出すことが大切です。悪化すると思考力に影響するため、早めの対処が肝心です。
      `,
    reverse: {
      img: '/img/emotions/angry.png', // 恐怖の反対は怒り（より強い反応としての）
      title: '怒り',
    },
    emotionStep: {
      step1: {
        title: ['不安', '心配'],
        bgColor: 'bg-emerald-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['怖い'],
        bgColor: 'bg-emerald-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['恐怖'],
        bgColor: 'bg-emerald-700',
        textColor: 'text-white',
      },
    },
  },
  SURPRISED: {
    emotion: 'SURPRISED',
    title: '驚き',
    image: '/img/emotions/surprised.png',
    borderColor: '#06b6d4',
    highlightColor: '#a5f3fc',
    imageColor: 'shadow-cyan-500/50',
    description: `予想外の出来事が起きた時に感じる感情です。
    自分にとって好ましいか否かでポジティブにもネガティブにもなります。
    嫌な知らせは、事前にほのめかすと驚きを和らげることができます。
    `,
    reverse: {
      img: '/img/emotions/interest.png', // 驚きの反対は無関心/予測可能性
      title: '関心',
    },
    emotionStep: {
      step1: {
        title: ['戸惑う', '意外だ'],
        bgColor: 'bg-cyan-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['驚き'],
        bgColor: 'bg-cyan-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['パニック'],
        bgColor: 'bg-cyan-700',
        textColor: 'text-white',
      },
    },
  },
  SAD: {
    emotion: 'SAD',
    title: '悲しみ',
    image: '/img/emotions/sad.png',
    borderColor: '#1e40af',
    highlightColor: '#60a5fa',
    imageColor: 'shadow-blue-500/50',
    description: `自分にとって大切なものを失ったときに生じる感情です。
    涙を流すと脳から「セロトニン」が分泌され、精神安定をもたらします。
    悲しい時は泣いてしまった方が癒しに繋がります。
    `,
    reverse: {
      img: '/img/emotions/happy.png', // 悲しみの反対は喜び
      title: '喜び',
    },
    emotionStep: {
      step1: {
        title: ['しんみり', '残念'],
        bgColor: 'bg-blue-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['悲しい', '寂しい'],
        bgColor: 'bg-blue-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['悲観'],
        bgColor: 'bg-blue-700',
        textColor: 'text-white',
      },
    },
  },
  DISGUSTED: {
    emotion: 'DISGUSTED',
    title: '嫌い',
    image: '/img/emotions/disgusted.png',
    borderColor: '#5b21b6',
    highlightColor: '#a78bfa',
    imageColor: 'shadow-indigo-500/50',
    description: `特定の状況、人、モノに対する不快な感情です。
      自分を守るための防衛反応の一種です。「世の中にはいろんな人がいる」と多様性を認め、
      違いを楽しむ心を持つと嫌悪感を緩和させることができます。`,
    reverse: {
      img: '/img/emotions/love.png', // 嫌悪の反対は愛
      title: '愛',
    },
    emotionStep: {
      step1: {
        title: ['苦手', 'うんざり'],
        bgColor: 'bg-indigo-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['嫌い'],
        bgColor: 'bg-indigo-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['憎い'],
        bgColor: 'bg-indigo-700',
        textColor: 'text-white',
      },
    },
  },
  ANGRY: {
    emotion: 'ANGRY',
    title: '怒り',
    image: '/img/emotions/angry.png',
    borderColor: '#dc2626',
    highlightColor: '#fca5a5',
    imageColor: 'shadow-rose-500/50',
    description: `怒りは自分にとって大切なものが傷つけられたときに現れるパワフルな感情です。
      怒りをそのまま言動にすると、トラブルの原因になる一方で、我慢すると自分の心を壊しかねません。
      まずは自分が「なにに怒っているのか」を理解することが大切です。`,
    reverse: {
      img: '/img/emotions/fear.png', // 怒りの反対は恐怖（より弱い反応としての）
      title: '恐怖',
    },
    emotionStep: {
      step1: {
        title: ['イライラ', '不満'],
        bgColor: 'bg-red-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['怒り'],
        bgColor: 'bg-red-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['ブチギレ'],
        bgColor: 'bg-red-800',
        textColor: 'text-white',
      },
    },
  },
  INTEREST: {
    emotion: 'INTEREST',
    title: '関心',
    image: '/img/emotions/interest.png',
    borderColor: '#ea580c',
    highlightColor: '#fb923c',
    imageColor: 'shadow-orange-500/50',
    description: '好奇心や探求心を刺激される感情です。新しい情報や経験に対する前向きな気持ちです。',
    reverse: {
      img: '/img/emotions/surprised.png', // 関心の反対は驚き/無関心
      title: '驚き',
    },
    emotionStep: {
      step1: {
        title: ['関心', '気になる'],
        bgColor: 'bg-orange-100',
        textColor: 'text-gray-800',
      },
      step2: {
        title: ['期待'],
        bgColor: 'bg-orange-400',
        textColor: 'text-gray-800',
      },
      step3: {
        title: ['熱中', '警戒'],
        bgColor: 'bg-orange-700',
        textColor: 'text-white',
      },
    },
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

const happyNodes = ['安心', '穏やか', '楽しい', '至福'].map((label, idx) =>
  createSubNode({ emotion: 'HAPPY', idSuffix: `${idx + 1}`, label }),
);

const loveNodes = ['共感', '信じる', '尊敬'].map((label, idx) =>
  createSubNode({ emotion: 'LOVE', idSuffix: `${idx + 1}`, label }),
);

const fearNodes = ['不安', '心配', '怖い'].map((label, idx) =>
  createSubNode({ emotion: 'FEAR', idSuffix: `${idx + 1}`, label }),
);

const surprisedNodes = ['戸惑う', '意外だ', 'パニック'].map((label, idx) =>
  createSubNode({ emotion: 'SURPRISED', idSuffix: `${idx + 1}`, label }),
);

const sadNodes = ['しんみり', '残念', '寂しい', '悲観'].map((label, idx) =>
  createSubNode({ emotion: 'SAD', idSuffix: `${idx + 1}`, label }),
);

const disgustedNodes = ['苦手', 'うんざり', '憎い'].map((label, idx) =>
  createSubNode({ emotion: 'DISGUSTED', idSuffix: `${idx + 1}`, label }),
);

const angryNodes = ['イライラ', '不満', 'ブチギレ'].map((label, idx) =>
  createSubNode({ emotion: 'ANGRY', idSuffix: `${idx + 1}`, label }),
);

const interestNodes = ['気になる', '期待', '熱中', '警戒'].map((label, idx) =>
  createSubNode({ emotion: 'INTEREST', idSuffix: `${idx + 1}`, label }),
);

// const neutralNodes = ['退屈', '何とも思わない'].map((label, idx) =>
//   createSubNode({ emotion: 'NEUTRAL', idSuffix: `${idx + 1}`, label }),
// );

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
// export const neutralGraph = generateDataFromNodes(neutralNodes, 'NEUTRAL');

export const emotionGraphMap: Record<string, NodeEdgeDataSet> = {
  HAPPY: happyGraph,
  LOVE: loveGraph,
  FEAR: fearGraph,
  SURPRISED: surprisedGraph,
  DISGUSTED: disgustedGraph,
  SAD: sadGraph,
  INTEREST: interestGraph,
  ANGRY: angryGraph,
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
