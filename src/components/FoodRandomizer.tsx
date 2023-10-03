import axios from 'axios';
import { useEffect, useState } from 'react';

interface FoodRandomizerProps {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
}

export function FoodRandomizer() {
  const [foodRandomized, setFoodRandomized] =
    useState<FoodRandomizerProps | null>(null);

  useEffect(() => {
    const fetchFoodRandom = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/random.php'
        );
        setFoodRandomized(response.data.meals[0]);
      } catch (error) {
        console.log('Erro ao buscar receita: ', error);
      }
    };

    fetchFoodRandom();
  }, []);

  return (
    <div className="container">
      {foodRandomized ? (
        <div className="w-9/12 mx-auto my-0 pt-4">
          <img src={foodRandomized.strMealThumb} alt={foodRandomized.strMeal} />
          <h2>{foodRandomized.strMeal}</h2>
          <p>{foodRandomized.strInstructions}</p>
          <a href={foodRandomized.strYoutube}>Youtube</a>
        </div>
      ) : (
        <p>Carregando</p>
      )}
    </div>
  );
}
