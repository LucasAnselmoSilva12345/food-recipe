import { useState } from 'react';
import { FoodRandomProps } from '../types/FoodRandomProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from '../components/FoodCard';
import { Title } from '../components/Title';

export function ByName() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [foodData, setFoodData] = useState<FoodRandomProps | null>(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/search.php?s=${searchTerm}`);
      setFoodData(response.data.meals[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section>
      <Title title="Pesquise a receita pelo nome" />
      <h1>Pesquise sua comida pelo nome</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={handleSearch}>pesquisar</button>
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
        <p>Não foi possivel encontrar a receita</p>
      )}
    </section>
  );
}
