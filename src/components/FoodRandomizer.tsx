import { useEffect, useState } from 'react';

import { FoodRandomProps } from '../types/FoodRandomProps';
import { api } from '../api/meal-db-api';
import { useNavigate } from 'react-router-dom';

export function FoodRandom() {
  const [foodRandom, setFoodRandom] = useState<FoodRandomProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodRandom = async () => {
      try {
        const response = await api.get('/random.php');
        setFoodRandom(response.data.meals[0]);
      } catch (error) {
        console.log('Erro ao buscar receita: ', error);
      }
    };

    fetchFoodRandom();
  }, []);

  const handleClick = (id: string) => {
    navigate(`/food/${id}`);
  };

  return (
    <div className="container cursor-pointer">
      {foodRandom ? (
        <div onClick={() => handleClick(`${foodRandom.idMeal}`)}>
          <div className="w-9/12 mx-auto my-0 pt-4">
            <img src={foodRandom.strMealThumb} alt={foodRandom.strMeal} />
            <h2>{foodRandom.strMeal}</h2>
            <p>{foodRandom.strInstructions}</p>
            <a href={foodRandom.strYoutube}>Youtube</a>
          </div>
        </div>
      ) : (
        <p>Carregando</p>
      )}
    </div>
  );
}
