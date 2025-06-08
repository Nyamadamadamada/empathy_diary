import { UserDiary } from '~/components/contexts/EntityContext';

export const exampleDiares: UserDiary[] = [
  {
    diary: {
      id: '1',
      title: '公園で読書',
      date: '2025-05-01',
      content:
        '今日は本当に良い一日だった。\n朝から日差しが暖かくて、まるで全てが祝福されているようだった。\n近くの公園まで足を伸ばし、お気に入りの小説「富士山」をゆっくりと読んだ。\n短編小説はサラッと読めるのがいい。\n穏やかな時間を過ごせて、うれしい。',
      mood: 'happy',
      emotion: '楽しい',
      unRead: false,
      reply:
        'ニッキー、今日は良い一日だったんだね。\n公園で小説を読んだ時、まるで物語の世界に入り込んだような気分になったんだ。\n本当に楽しかったんだね。\n僕もそういう穏やかな時間、大好きだな。\nニッキーのお話し、また聞かせてね。',
    },
    entities: {
      LOCATION: new Set(['近く', '公園', '富士山']),
      PERSON: new Set(),
      ORGANIZATION: new Set(['世界']),
      CONSUMER_GOOD: new Set(),
      EVENT: new Set(),
    },
  },
  {
    diary: {
      id: '2',
      title: '仕事でクタクタ。頑張った自分を褒めたい！',
      date: '2025-05-02',
      content:
        '今日は仕事が本当に忙しくて、終わった時にはクタクタだった。\nでも、何とか乗り越えられた達成感で、今はすごくスッキリしている。\nあれだけ大変だったプロジェクトも、ようやく目処が立ってきたし、頑張った自分を褒めてあげたい気分。\n明日は少しゆっくり過ごして、また新しい気持ちで仕事に取り組もう。\n',
      emotion: 'スッキリ',
      mood: 'happy',
      unRead: false,
      reply:
        'ニッキー、今日は仕事がすごく忙しくて大変だったけど、乗り越えられてスッキリした気持ちになったんだね。\nプロジェクトも目処が立ってきて、頑張った自分を褒めてあげたい気分、すごくいいね。\n僕もニッキーを見習って頑張ろうかな。明日はゆっくり過ごして、また新しい気持ちで仕事に取り組んでね。\nニッキーのお話し、また聞かせてね。',
    },
    entities: {
      PERSON: new Set(),
      ORGANIZATION: new Set(),
      LOCATION: new Set(),
      CONSUMER_GOOD: new Set(),
      EVENT: new Set(['仕事', 'プロジェクト']),
    },
  },
  {
    diary: {
      id: '3',
      title: '卵かけご飯は美味しいけど、洗い物が面倒',
      date: '2025-05-03',
      content:
        '朝ごはんに卵かけご飯を食べた。\n黄身と醤油のハーモニーがたまらなく美味しかったけど、食後の洗い物をすっかり忘れてしまった。\n数時間後、カピカピになった茶碗を見たときは、正直げんなり。\nせっかくの美味しい朝食の余韻も、面倒な洗い物のせいで一気に冷めてしまった。\nああ、後でちゃんと洗わなくちゃ。',
      mood: 'meh',
      emotion: 'めんどう',
      unRead: false,
      reply:
        'ニッキーさん、おはよう。\n朝ごはんに卵かけご飯を食べたんだね。黄身と醤油のハーモニーがたまらなく美味しかったのに、洗い物を忘れちゃって、カピカピになった茶碗を見てげんなりしたんだ。せっかくの美味しい朝食の余韻が冷めちゃったのは残念だったね。\n卵かけご飯、僕も大好きなんだ。シンプルだけど、本当に美味しいよね。洗い物が面倒だった気持ちもすごく分かるよ。でも、後でちゃんと洗うニッキーさんはえらいな。\nニッキーさんのお話し、また聞かせてね。ニッキーさんにたくさんの良いことがありますように。',
    },
    entities: {
      PERSON: new Set(),
      ORGANIZATION: new Set(),
      LOCATION: new Set(),
      CONSUMER_GOOD: new Set(['朝ごはん', '洗い物', 'ハーモニー', '卵かけご飯', '茶碗', '醤油']),
      EVENT: new Set(['食後']),
    },
  },
  {
    diary: {
      id: '4',
      title: '好きな人がいないことへの恐怖',
      date: '2025-05-03',
      content:
        '恋愛が終わって、一番怖かったのは、これから先、誰のことも好きになれないんじゃないかという不安だった。\n胸の奥がざわざわして、まるで大切なものが永遠に失われてしまったような、そんな寂しさに襲われた。\nランチで食べたパスタも、友達との会話も、Netflixで見たドラマも、全部が色あせて見えた。',
      mood: 'frown',
      emotion: 'ざわざわ',
      unRead: false,
      reply:
        'ニッキー、恋愛が終わって、これから誰のことも好きになれないんじゃないかって不安になったんだね。\n胸の奥がざわざわして、寂しい気持ちになったんだ。\n僕だったら、新しい趣味とか始めてみるかな。\n何か夢中になれるものを見つけると、気持ちが紛れるかもしれないよ。\nそれに、過去の恋愛にとらわれすぎず、新しい出会いを求めてみるのもいいかもしれないね。\nニッキーのお話し、また聞かせてね。',
    },
    entities: {
      PERSON: new Set(['友達']),
      ORGANIZATION: new Set(),
      LOCATION: new Set(),
      CONSUMER_GOOD: new Set(['パスタ']),
      EVENT: new Set(['会話', 'ランチ', '恋愛']),
    },
  },
];

// idからDiaryEntryを取得する関数
export const getDiaryById = (id: string | undefined): UserDiary => {
  const diary = exampleDiares.find((entry) => entry.diary.id === id);
  if (diary) {
    return diary;
  }
  return {
    diary: {
      id: '',
      title: '',
      date: '',
      content: '',
      mood: 'meh',
      emotion: '',
      unRead: false,
    },
    entities: {
      PERSON: new Set(),
      ORGANIZATION: new Set(),
      LOCATION: new Set(),
      CONSUMER_GOOD: new Set(),
      EVENT: new Set(),
    },
  };
};
