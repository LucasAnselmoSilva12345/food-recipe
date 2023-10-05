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
    <section className="w-full md:w-4/5 lg:w-1/2 px-6 py-4">
      <Title title="Pesquise a receita pelo nome" />
      <div className="w-full flex flex-col mt-4 space-y-2">
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
          className="flex items-center justify-center gap-1 py-3 text-base border-none bg-orange-500 text-orange-50 font-semibold"
          onClick={handleSearch}
        >
          Pesquisar
          <MagnifyingGlass size={20} className="text-orange-50" weight="bold" />
        </button>
      </div>

      {foodData ? (
        <FoodCard
          idMeal={foodData.idMeal}
          strMealThumb={foodData.strMealThumb}
          strMeal={foodData.strMeal}
          strInstructions={foodData.strInstructions}
          strYoutube={foodData.strYoutube}
        />
      ) : (
        <Warning message="Nenhum resultado encontrado..." />
      )}
    </section>
  );
}
