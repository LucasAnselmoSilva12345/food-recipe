import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { ByName } from './pages/ByName';
import { ByCategories } from './pages/ByCategories';
import { ByLetter } from './pages/ByLetter';

export function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/by-name/" element={<ByName />} />
        <Route path="/by-letter/" element={<ByLetter />} />
        <Route path="/by-categories/" element={<ByCategories />} />
      </Routes>
    </BrowserRouter>
  );
}
