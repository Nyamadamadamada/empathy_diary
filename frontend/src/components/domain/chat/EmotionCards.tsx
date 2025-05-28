// components/CardDisplay.jsx

import { emotions } from '~/types/category';

const EmotionCards = ({ handleSelectedEmotion }) => {
  return (
    <div className="bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {emotions.map((card, index) => (
          <div
            key={index}
            onClick={() => handleSelectedEmotion(card)}
            className="bg-white px-4 rounded-2xl shadow-md overflow-hidden border border-gray-200 flex flex-row items-center lg:flex-col cursor-pointer transition transform hover:scale-105 hover:shadow-lg"
          >
            <img src={card.image} alt={card.title} className="w-16 h-16 object-cover lg:w-24 lg:h-24" />
            <div className="p-4 flex flex-col justify-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
              <ul className="text-sm text-gray-500 list-disc pl-5">
                {card.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmotionCards;
