import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { useNavigate } from 'react-router-dom';
import { ClickableButton } from './ClickableButton';

export function FoodCard(props: PartialMealsAPIProps) {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/meal/${id}`);
  };

  return (
    <div
      className=" bg-white mt-8 md:mt-5 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105"
      onClick={() => handleClick(`${props.idMeal}`)}
    >
      <img
        className="rounded-t-xl w-full h-48 object-cover"
        src={props.strMealThumb}
        alt={props.strMeal}
      />
      <div className="px-2 py-4 space-y-3 font-inter">
        <h2 className="text-amber-600 text-3xl font-semibold font-inter">
          {props.strMeal}
        </h2>
        <p className="text-neutral-900">{props.strInstructions}</p>
        {props.strYoutube ? (
          <ClickableButton
            key={props.idMeal}
            src={props.strYoutube}
            title="Youtube"
            className="bg-orange-500"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
