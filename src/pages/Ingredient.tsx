import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/meal-db-api';

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
    <div>
      {propsIngredient?.map((ingredient, index) => (
        <h1 key={index}>{ingredient.strMeal}</h1>
      ))}
    </div>
  );
}
