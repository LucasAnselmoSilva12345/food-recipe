import { useEffect, useState } from 'react';
import { FoodRandomProps } from '../types/FoodRandomProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from './FoodCard';
import { Title } from './Title';

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
    <section className="w-full md:w-4/5 lg:w-1/2 px-6 py-4">
      <Title title="Uma receita de boas vindas" />
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
