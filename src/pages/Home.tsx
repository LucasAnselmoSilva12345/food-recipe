import { useEffect, useState } from 'react';
import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { api } from '../api/meal-db-api';
import { Title } from '../components/Title';
import { Card } from '../components/Meal/Card';
import { Warning } from '../components/Warning';

export function Home() {
  const [randomMeal, setRandomMeal] = useState<PartialMealsAPIProps | null>(
    null
  );

  useEffect(() => {
    const fetchRandomMeal = async () => {
      try {
        const response = await api.get('/random.php');
        setRandomMeal(response.data.meals[0]);
      } catch (error) {
        console.log('Erro ao buscar receita: ', error);
      }
    };

    fetchRandomMeal();
  }, []);

  return (
    <section className="w-full px-6 py-4 md:w-3/5 md:my-0 md:mx-auto">
      <Title title="Uma receita de boas vindas" />
      {randomMeal ? (
        <Card
          idMeal={randomMeal.idMeal}
          strMeal={randomMeal.strMeal}
          strInstructions={randomMeal.strInstructions}
          strMealThumb={randomMeal.strMealThumb}
          strYoutube={randomMeal.strYoutube}
        />
      ) : (
        <Warning message="Não temos receitas para ser exibidas..." />
      )}
    </section>
  );
}
