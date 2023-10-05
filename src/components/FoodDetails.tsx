import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { api } from '../api/meal-db-api';
import { Title } from './Title';
import { Warning } from './Warning';

export function FoodDetails() {
  const { id } = useParams();
  const [foodProps, setFoodProps] = useState<PartialMealsAPIProps | null>(null);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await api.get(`/lookup.php?i=${id}`);
        setFoodProps(response.data.meals[0]);
      } catch (error) {
        console.error('Erro ao buscar detalhes do prato:', error);
      }
    };

    fetchFoodDetails();
  }, [id]);

  return (
    <section className="w-full md:w-4/5 lg:w-1/2 px-6 py-4">
      {foodProps ? (
        <div className="">
          <Title title={foodProps.strMeal} className="mb-3" />
          <img
            src={foodProps.strMealThumb}
            alt={foodProps.strMeal}
            className="w-full md:h-[48rem] object-cover"
          />
          <div className="my-2 flex flex-col md:items-center md:justify-between md:flex-row space-y-2 md:space-y-0">
            <p className="text-lg font-inter font-bold">
              Categoria:{' '}
              <span className=" font-normal">{foodProps.strCategory}</span>{' '}
            </p>

            <p className="text-lg font-inter font-bold">
              Area: <span className=" font-normal">{foodProps.strArea}</span>{' '}
            </p>

            <p className="text-lg font-inter font-bold">
              Tags: <span className=" font-normal">{foodProps.strTags}</span>{' '}
            </p>
          </div>
          <p className="text-neutral-900">{foodProps.strInstructions}</p>

          <div>
            <a href={foodProps.strYoutube}>YouTube</a>
            <a href={foodProps.strSource}>Fonte original</a>
          </div>
        </div>
      ) : (
        <Warning message="Carregando..." />
      )}
    </section>
  );
}
