import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/meal-db-api';
import { FoodCard } from '../components/FoodCard';
import { Title } from '../components/Title';

interface IngredientProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function Ingredient() {
  const { id } = useParams();
  const [propsIngredient, setProposIngredient] = useState<
    IngredientProps[] | null
  >(null);

  useEffect(() => {
    const fetchMealsByIngredient = async () => {
      try {
        const response = await api.get(`/filter.php?i=${id}`);
        setProposIngredient(response.data.meals);
      } catch (error) {
        console.log('Erro ao buscar por ingredient');
      }
    };

    fetchMealsByIngredient();
  }, [id]);

  return (
    <section className="w-full md:w-4/5 lg:w-1/2 px-6 py-4">
      <Title title={`Receitas com ${id}`} />

      {propsIngredient?.map((ingredient, index) => (
        <FoodCard
          key={index}
          idMeal={ingredient.idMeal}
          strMeal={ingredient.strMeal}
          strMealThumb={ingredient.strMealThumb}
        />
      ))}
    </section>
  );
}
