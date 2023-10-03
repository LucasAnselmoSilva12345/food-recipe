import axios from 'axios';
import { useEffect, useState } from 'react';

import { FoodRandomProps } from '../types/FoodRandomProps';

export function FoodRandom() {
  const [foodRandom, setFoodRandom] = useState<FoodRandomProps | null>(null);

  useEffect(() => {
    const fetchFoodRandom = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        setFoodRandom(response.data.meals[0]);
      } catch (error) {
        console.log('Erro ao buscar receita: ', error);
      }
    };

    fetchFoodRandom();
  }, []);

  return (
    <div className="container">
      {foodRandom ? (
        <a href={`/food/${foodRandom.idMeal}`}>
          <div className="w-9/12 mx-auto my-0 pt-4">
            <img src={foodRandom.strMealThumb} alt={foodRandom.strMeal} />
            <h2>{foodRandom.strMeal}</h2>
            <p>{foodRandom.strInstructions}</p>
            <a href={foodRandom.strYoutube}>Youtube</a>
          </div>
        </a>
      ) : (
        <p>Carregando</p>
      )}
    </div>
  );
}
