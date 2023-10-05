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
    <section className="w-full px-6 py-4 md:w-4/5 md:my-0 md:mx-auto">
      <Title title={`Receitas com ${id}`} />

      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {propsIngredient?.map((ingredient, index) => (
          <FoodCard
            key={index}
            idMeal={ingredient.idMeal}
            strMeal={ingredient.strMeal}
            strMealThumb={ingredient.strMealThumb}
          />
        ))}
      </div>
    </section>
  );
}
