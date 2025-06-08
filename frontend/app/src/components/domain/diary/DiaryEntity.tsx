import { EntityData } from '~/components/contexts/EntityContext';

interface DiaryEntityProps {
  entities: EntityData;
}

const DiaryEntity = ({ entities }: DiaryEntityProps) => {
  return (
    <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        日記解析
      </caption>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            カテゴリ
          </th>
          <th scope="col" className="px-6 py-3">
            内容
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            登場人物
          </th>
          <td className="px-6 py-4">
            {entities.PERSON && entities.PERSON.size > 0 && [...entities.PERSON].join(' , ')}
          </td>
        </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            場所・組織
          </th>
          <td className="px-6 py-4">
            {[...(entities.ORGANIZATION || []), ...(entities.LOCATION || [])].filter(Boolean).join(', ')}
          </td>
        </tr>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            商品
          </th>
          <td className="px-6 py-4">
            {entities.CONSUMER_GOOD && entities.CONSUMER_GOOD.size > 0 && [...entities.CONSUMER_GOOD].join(' , ')}
          </td>
        </tr>
        <tr className="bg-white dark:bg-gray-800">
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            イベント
          </th>
          <td className="px-6 py-4">{entities.EVENT && entities.EVENT.size > 0 && [...entities.EVENT].join(' , ')}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DiaryEntity;
