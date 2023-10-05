import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { ByName } from './pages/ByName';
import { ByIngredients } from './pages/ByIngredients';
import { ByLetter } from './pages/ByLetter';
import { FoodDetails } from './components/FoodDetails';
import { Ingredient } from './pages/Ingredient';

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/by-name/" element={<ByName />} />
          <Route path="/by-letter/" element={<ByLetter />} />
          <Route path="/ingredient/" element={<ByIngredients />} />
          <Route path="/by-ingredient/:id" element={<Ingredient />} />
          <Route path="/food/:id" element={<FoodDetails />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
