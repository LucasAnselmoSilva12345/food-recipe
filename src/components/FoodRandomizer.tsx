import { useEffect, useState } from 'react';
import { FoodRandomProps } from '../types/FoodRandomProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from './FoodCard';

export function FoodRandom() {
  const [foodRandom, setFoodRandom] = useState<FoodRandomProps | null>(null);

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

  return (
    <section className="w-full md:max-w-[1200px] md:mx-auto md:my-0 p-8 text-orange-500">
      <h1 className="text-4xl text-center md:text-left font-bold mb-4">
        Uma receita de boas vindas
      </h1>
      {foodRandom ? (
        <FoodCard
          idMeal={`${foodRandom.idMeal}`}
          strMeal={`${foodRandom.strMeal}`}
          strInstructions={`${foodRandom.strInstructions}`}
          strMealThumb={`${foodRandom.strMealThumb}`}
          strYoutube={`${foodRandom.strYoutube}`}
        />
      ) : (
        <p>Carregando</p>
      )}
    </section>
  );
}
