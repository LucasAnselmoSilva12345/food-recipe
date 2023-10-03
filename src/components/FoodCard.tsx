import { YoutubeLogo } from '@phosphor-icons/react';
import { FoodRandomProps } from '../types/FoodRandomProps';
import { useNavigate } from 'react-router-dom';

export function FoodCard(props: FoodRandomProps) {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/food/${id}`);
  };

  return (
    <div
      className="w-full bg-white rounded"
      onClick={() => handleClick(`${props.idMeal}`)}
    >
      <img
        className="w-full rounded-t-xl md:h-48 object-cover"
        src={props.strMealThumb}
        alt={props.strMeal}
      />
      <div className="space-y-4 mt-4 px-2">
        <h2 className="text-orange-700 text-3xl font-bold font-inter">
          {props.strMeal}
        </h2>
        <p className="text-black text-left">{props.strInstructions}</p>
        <a
          className="bg-orange-500 text-orange-50 w-full p-2 rounded text-lg font-bold flex items-center justify-center gap-1 hover:opacity-80"
          href={props.strYoutube}
        >
          Youtube
          <YoutubeLogo size={32} weight="regular" />
        </a>
      </div>
    </div>
  );
}
