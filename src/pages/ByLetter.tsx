import { useEffect, useState } from 'react';
import { FoodRandomProps } from '../types/FoodRandomProps';
import { api } from '../api/meal-db-api';
import { FoodCard } from '../components/FoodCard';
import { Title } from '../components/Title';

export function ByLetter() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [foodResults, setFoodResults] = useState<FoodRandomProps[]>([]);
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
    <section>
      <Title title="pesquise a receita por letra" />

      <div className="space-x-2">
        {alphabet.map((letter) => (
          <button key={letter} onClick={() => handleLetterClick(letter)}>
            {letter}
          </button>
        ))}
      </div>

      {loading && <p>Carregando</p>}
      {!loading && foodResults.length === 0 && (
        <p>Nenhum resultado encontrado ao pesquisar por esse letra</p>
      )}
      {!loading && foodResults.length > 0 && (
        <div>
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
    </section>
  );
}
