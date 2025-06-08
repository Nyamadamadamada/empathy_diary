import { useMemo } from 'react';
import { useUser } from '~/components/contexts/UserContext';
import { categories, getCategoryData } from '~/config/category';
import { CategoryName, CategoryType } from '~/types/category';

const categoryImageMap: Record<string, string> = {
  '学業・受験・進学': '/img/category/study.jpg',
  友人関係: '/img/category/friends.jpg',
  家族との関係: '/img/category/family.jpg',
  日々の生活: '/img/category/daily_life.jpg',
  趣味: '/img/category/hobby.jpg',
  仕事のこと: '/img/category/work.jpg',
  お金のこと: '/img/category/money.jpg',
  育児: '/img/category/childcare.jpg',
  家事: '/img/category/housework.jpg',
  子どもの教育: '/img/category/child_education.jpg',
  自分の健康: '/img/category/self_health.jpg',
  家族の健康: '/img/category/family_health.jpg',
  その他: '/img/category/other.jpg',
};

// 初めの出来事のカテゴリ選択肢を取得する
export const useGetCategories = (): CategoryType[] => {
  const { user } = useUser();
  let matchedCategories = categories.find(
    (item) => item.age === user.ageRange && item.gender === user.gender,
  )?.categories;

  //   もし対応するカテゴリが見つからなかった場合
  if (!matchedCategories) {
    matchedCategories = ['家族との関係', '友人関係', '日々の生活', '自分の健康', '趣味'];
  }

  const baseCategories = matchedCategories.map((category) => ({
    category,
    imageUrl: categoryImageMap[category] ?? '/img/category/default.jpg', // マップにない場合のデフォルト画像
  }));

  return [
    ...baseCategories,
    {
      category: 'その他',
      imageUrl: categoryImageMap['その他'],
    },
  ];
};
