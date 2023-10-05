import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow flex items-center justify-between p-4">
      <Link className=" text-orange-500 text-lg font-inter font-bold" to="/">
        Início
      </Link>
      <nav className="">
        <ul className="flex items-center justify-between gap-1 text-center">
          <li>
            <Link className="h-full px-3 transition-colors" to="/by-name/">
              Receitas por nome
            </Link>
          </li>
          <li>
            <Link className="h-full px-3 transition-colors" to="/by-letter/">
              Receitas por Letra
            </Link>
          </li>
          <li>
            <Link className="h-full px-3 transition-colors" to="/ingredient/">
              Recitas por ingredientes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
