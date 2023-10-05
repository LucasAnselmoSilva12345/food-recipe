import { useState } from 'react';
import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from '../components/FoodCard';
import { Title } from '../components/Title';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Warning } from '../components/Warning';

export function ByName() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [foodData, setFoodData] = useState<PartialMealsAPIProps | null>(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/search.php?s=${searchTerm}`);
      setFoodData(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="w-full px-6 py-4 md:w-4/5 md:my-0 md:mx-auto">
      <Title title="Pesquise a receita pelo nome" />
      <div className="w-full flex flex-col mt-4 mb-8 space-y-2">
        <label
          htmlFor="searchMeal"
          className="text-neutral-800 font-inter font-medium"
        >
          Digite abaixo o nome do prato
        </label>
        <input
          type="text"
          id="searchMeal"
          className="py-4 text-sm text-neutral-800 border-none rounded focus:outline focus:outline-2 focus:outline-orange-400"
          placeholder="e.g. sushi"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          className="py-3 flex items-center justify-center gap-1 text-base font-inter font-semibold border-none bg-orange-500 text-orange-50 transition-all hover:opacity-80 hover:duration-150"
          onClick={handleSearch}
        >
          Pesquisar
          <MagnifyingGlass size={20} className="text-orange-50" weight="bold" />
        </button>
      </div>

      {foodData ? (
        <div className="w-full lg:w-1/2 lg:my-0 lg:mx-auto">
          <FoodCard
            idMeal={foodData.idMeal}
            strMealThumb={foodData.strMealThumb}
            strMeal={foodData.strMeal}
            strInstructions={foodData.strInstructions}
            strYoutube={foodData.strYoutube}
          />
        </div>
      ) : (
        <Warning message="Nenhum resultado encontrado..." />
      )}
    </section>
  );
}
