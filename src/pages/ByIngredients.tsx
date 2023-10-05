import { useEffect, useState } from 'react';
import { api } from '../api/meal-db-api';
import { Link } from 'react-router-dom';

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
    <div>
      <input
        type="text"
        placeholder="Pesquisar ingredientes"
        value={searchIngredientTerm}
        onChange={(e) => setSearchIngredientTerm(e.target.value)}
      />
      {searchResults?.map((ingredient, index) => (
        <Link to={`/by-ingredient/${ingredient.strIngredient}`} key={index}>
          <h3>{ingredient.strIngredient}</h3>
        </Link>
      ))}
    </div>
  );
}