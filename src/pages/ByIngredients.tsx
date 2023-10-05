import { useEffect, useState } from 'react';
import { api } from '../api/meal-db-api';
import { Link } from 'react-router-dom';
import { Title } from '../components/Title';

interface IngredientsProps {
  idIngredient: string;
  strIngredient: string;
}

export function ByIngredients() {
  const [ingredients, setIngredients] = useState<IngredientsProps[] | null>(
    null
  );
  const [searchIngredientTerm, setSearchIngredientTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IngredientsProps[]>([]);
  useEffect(() => {
    const fetchFoodByIngredient = async () => {
      try {
        const response = await api.get('/list.php?i=list');
        if (response.data.meals) {
          setIngredients(response.data.meals);
        }
      } catch (error) {
        console.log('Erro ao exibir os ingredients');
      }
    };

    fetchFoodByIngredient();
  }, [searchIngredientTerm]);

  useEffect(() => {
    const filteredIngredients = ingredients?.filter((ingredient) =>
      ingredient.strIngredient
        .toLowerCase()
        .includes(searchIngredientTerm.toLowerCase())
    );

    setSearchResults(filteredIngredients || []);
  }, [searchIngredientTerm, ingredients]);

  return (
    <section className="w-full px-6 py-4 md:w-4/5 md:my-0 md:mx-auto">
      <Title title="Pesquise a receita pelo ingrediente" />

      <div className="w-full flex flex-col mt-4 space-y-2">
        <label
          htmlFor="searchByIngredient"
          className="text-neutral-800 font-inter font-medium"
        >
          Digite o ingrediente que deseja pesquisar
        </label>

        <input
          type="text"
          id="searchByIngredient"
          className="py-4 text-sm text-neutral-800 border-none rounded focus:outline focus:outline-2 focus:outline-orange-400"
          placeholder="Pesquisar ingredientes"
          value={searchIngredientTerm}
          onChange={(e) => setSearchIngredientTerm(e.target.value)}
        />
      </div>

      <div className="w-full py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchResults?.map((ingredient, index) => (
          <Link
            to={`/by-ingredient/${ingredient.strIngredient}`}
            key={index}
            className="focus:outline-2 focus:outline-orange-500"
          >
            <h3 className="bg-white py-4 px-1 my-2 font-inter text-lg font-bold text-neutral-800 hover:bg-orange-500 hover:text-orange-50 transition-all hover:duration-500">
              {ingredient.strIngredient}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
