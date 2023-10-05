import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { api } from '../api/meal-db-api';
import { Title } from '../components/Title';
import { FoodInfo } from '../components/FoodInfo';
import { ClickableButton } from '../components/ClickableButton';
import { Warning } from '../components/Warning';

export function MealDetail() {
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
    <section className="w-full px-6 py-4 md:w-3/5 md:my-0 md:mx-auto">
      {foodProps ? (
        <div className="">
          <Title title={foodProps.strMeal} className="mb-3" />
          <img
            src={foodProps.strMealThumb}
            alt={foodProps.strMeal}
            className="w-full md:h-[24rem] object-cover"
          />
          <FoodInfo
            strCategory={foodProps.strCategory!}
            strArea={foodProps.strArea!}
            strTags={foodProps.strTags!}
          />

          <p className="text-neutral-900">{foodProps.strInstructions}</p>

          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <ClickableButton
              src={foodProps.strYoutube!}
              title="YouTube"
              className="bg-orange-500"
            />
            <ClickableButton
              src={foodProps.strSource!}
              title="Fonte original"
              className="bg-cyan-950"
            />
          </div>
        </div>
      ) : (
        <Warning message="Carregando..." />
      )}
    </section>
  );
}
