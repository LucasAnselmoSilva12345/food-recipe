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
    <section className="w-full md:w-4/5 lg:w-1/2 px-6 py-4">
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

      <div className="w-full py-2">
        {searchResults?.map((ingredient, index) => (
          <Link to={`/by-ingredient/${ingredient.strIngredient}`} key={index}>
            <h3 className="bg-white py-4 px-1 my-2 font-inter text-lg font-bold text-neutral-800">
              {ingredient.strIngredient}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
