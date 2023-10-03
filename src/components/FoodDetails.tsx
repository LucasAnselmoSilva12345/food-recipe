import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FoodRandomProps } from '../types/FoodRandomProps';
import axios from 'axios';

export function FoodDetails() {
  const { id } = useParams();
  const [foodProps, setFoodProps] = useState<FoodRandomProps | null>(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setFoodProps(response.data.meals[0]);
      } catch (error) {
        console.error('Erro ao buscar detalhes do prato:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  return (
    <div>
      {foodProps ? (
        <div>
          <h2>{foodProps.strMeal}</h2>
          <img src={foodProps.strMealThumb} alt={foodProps.strMeal} />
          <p>{foodProps.strInstructions}</p>

          <h3>Ingredientes</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
              const foodIngredient = foodProps[`strIngredient${index}`];
              const foodMeasure = foodProps[`strMeasure${index}`];

              if (
                foodIngredient &&
                foodIngredient.trim() !== '' &&
                foodMeasure
              ) {
                return (
                  <li key={index}>
                    {foodIngredient} - {foodMeasure}
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </div>
      ) : (
        <p>Carregando</p>
      )}
    </div>
  );
}
