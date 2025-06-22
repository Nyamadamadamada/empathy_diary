import { UserDiary } from '~/components/contexts/EntityContext';

export const exampleDiares: UserDiary[] = [
  {
    diary: {
      id: '1',
      title: '新しいコーヒー豆を購入',
      date: '2025/06/11',
      content:
        '金森さんに勧められて、ランチの後、\n三越前駅近くのYANAKAコーヒー店で、シングルオリジンの豆を買った。\n\n家に帰って早速豆を挽いてみたんだけど、部屋中に広がる香りがまた格別。\n明日からの朝が、また少し楽しみになったな。',
      mood: 'happy',
      emotion: '関心',
      unRead: false,
      reply:
        'ニッキーさん、こんにちは。\n金森さんに勧められたYANAKAコーヒー店のシングルオリジン豆、よかったね。\n部屋中に広がる香りは格別とのこと、関心という気持ち、すごくよくわかるよ。\n僕もこだわりのコーヒー豆で朝を迎えてみたいな。\n明日からの朝が楽しみになったみたいで、いいね。\nニッキーさんのお話し、また聞かせてね。',
    },
    entities: {
      LOCATION: new Set(['YANAKAコーヒー店', '部屋', '三越前駅', '近く', '家']),
      PERSON: new Set(['金森']),
      ORGANIZATION: new Set(['']),
      CONSUMER_GOOD: new Set(['豆', 'シングルオリジン']),
      EVENT: new Set(['ランチ']),
    },
    emotionScore: {
      score: 0.67,
      magnitude: 0.977,
    },
  },
  {
    diary: {
      id: '2',
      title: '仕事でクタクタ。頑張った自分を褒めたい！',
      date: '2025/06/02',
      content:
        '今日は仕事が本当に忙しくて、終わった時にはクタクタだった。\nでも、何とか乗り越えられた達成感で、今はすごくスッキリしている。\nあれだけ大変だったプロジェクトも、ようやく目処が立ってきたし、頑張った自分を褒めてあげたい気分。\n明日は少しゆっくり過ごして、また新しい気持ちで仕事に取り組もう。\n',
      emotion: '嬉しい',
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
    emotionScore: {
      score: 0.428,
      magnitude: 2.74,
    },
  },
  {
    diary: {
      id: '3',
      title: '卵かけご飯は美味しいけど、洗い物が面倒',
      date: '2025/05/20',
      content:
        '朝ごはんに卵かけご飯を食べた。\n黄身と醤油のハーモニーがたまらなく美味しかったけど、食後の洗い物をすっかり忘れてしまった。\n数時間後、カピカピになった茶碗を見たときは、正直げんなり。\nせっかくの美味しい朝食の余韻も、面倒な洗い物のせいで一気に冷めてしまった。\nああ、後でちゃんと洗わなくちゃ。',
      mood: 'meh',
      emotion: '残念',
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
    emotionScore: {
      score: -0.229,
      magnitude: 3.493,
    },
  },
  {
    diary: {
      id: '4',
      title: '好きな人がいないことへの恐怖',
      date: '2025/05/13',
      content:
        '恋愛が終わって、一番怖かったのは、これから先、誰のことも好きになれないんじゃないかという不安だった。\n胸の奥がざわざわして、まるで大切なものが永遠に失われてしまったような、そんな寂しさに襲われた。\nランチで食べたパスタも、友達との会話も、Netflixで見たドラマも、全部が色あせて見えた。',
      mood: 'frown',
      emotion: '寂しい',
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
    emotionScore: {
      score: -0.314,
      magnitude: 1.444,
    },
  },
  {
    diary: {
      id: '5',
      title: '実家で時計の値段にケチをつけられた',
      date: '2025/05/01',
      content:
        '久しぶりに実家に帰ったら、案の定、母に小言を言われてしまった。\n私が身につけていた少し高価な時計を見て、「そんな高いもの！」と非難された。\nもっとゆっくり過ごしたかったのに、すぐに帰りたくなってしまった。',
      mood: 'frown',
      emotion: '嫌い',
      unRead: false,
      reply:
        'ニッキーさん、久しぶりに実家に帰ったらお母さんに小言を言われて嫌な気持ちになったんだね。\n少し高価な時計をしていただけで非難されるのは、僕だったらちょっと悲しいかな。\nでも、お母さんもニッキーさんのことを思って言ってくれたのかもしれないね。\nニッキーさんの話し、また聞かせてね。',
    },
    entities: {
      PERSON: new Set(['母']),
      ORGANIZATION: new Set(),
      LOCATION: new Set(['実家']),
      CONSUMER_GOOD: new Set(['もの', '時計']),
      EVENT: new Set(['案の定']),
    },
    emotionScore: {
      score: -0.706,
      magnitude: 2.682,
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
    emotionScore: {
      score: 0,
      magnitude: 0,
    },
  };
};
