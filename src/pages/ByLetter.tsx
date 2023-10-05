import { useEffect, useState } from 'react';
import { PartialMealsAPIProps } from '../types/MealsAPIProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from '../components/FoodCard';
import { Title } from '../components/Title';
import { Warning } from '../components/Warning';

export function ByLetter() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [foodResults, setFoodResults] = useState<PartialMealsAPIProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFoodByLetter = async () => {
      if (selectedLetter) {
        setLoading(true);
        try {
          const response = await api.get(`/search.php?f=${selectedLetter}`);
          setFoodResults(response.data.meals || []);
        } catch (error) {
          console.error('Erro ao buscar dados da API:', error);
        }
        setLoading(false);
      }
    };
    fetchFoodByLetter();
  }, [selectedLetter]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
  };

  return (
    <section className="w-full px-6 py-4 md:w-3/5 md:my-0 md:mx-auto">
      <Title title="Pesquise a receita por letra" />

      <div className="mt-3 py-3 md:text-center">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className="mx-1 px-6 md:px-1 font-inter font-medium text-orange-950 transition-all duration-150 focus:outline-2 focus:outline-orange-700 hover:text-orange-700"
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {loading && <p>Carregando</p>}
      {!loading && foodResults.length === 0 && (
        <Warning message="Nenhum resultado encontrado..." />
      )}
      {!loading && foodResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodResults.map((result) => (
            <FoodCard
              key={result.idMeal}
              idMeal={result.idMeal}
              strMealThumb={result.strMealThumb}
              strMeal={result.strMeal}
              strInstructions={result.strInstructions}
              strYoutube={result.strYoutube}
            />
          ))}
        </div>
      )}
    </section>
  );
}
