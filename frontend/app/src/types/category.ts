// 年齢カテゴリキーの型（'85_' は '85歳以上'）
export type AgeRange =
  | '12_14'
  | '15_19'
  | '20_24'
  | '25_29'
  | '30_34'
  | '35_39'
  | '40_44'
  | '45_49'
  | '50_54'
  | '55_59'
  | '60_64'
  | '65_69'
  | '70_74'
  | '75_79'
  | '80_84'
  | '85_';

// 性別カテゴリ
export type Gender = '女性' | '男性' | '性別不明';
// 各カテゴリ（例：仕事のこと、家族の健康 など）
export type CategoryName =
  | '学業・受験・進学'
  | '仕事のこと'
  | 'お金のこと'
  | '子どもの教育'
  | '育児'
  | '家族との関係'
  | '友人関係'
  | '日々の生活'
  | '自分の健康'
  | '家族の健康'
  | '趣味'
  | 'その他'
  | '家事';

export type CategoryDataGroupType = {
  age: AgeRange;
  gender: Gender;
  categories: CategoryName[];
};

export type EventGroup = {
  age: AgeRange;
  gender: Gender;
  category: CategoryName;
  events: string[];
};

export type CategoryType = {
  category: CategoryName;
  imageUrl: string;
};
