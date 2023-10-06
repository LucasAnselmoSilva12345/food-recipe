import { List, X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export function Header() {
  const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile((prev) => !prev);
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              className="text-orange-500 font-inter font-bold text-lg"
              to="/"
            >
              Food-Recipe
            </Link>
          </div>

          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavBar />
            </div>
          </nav>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={handleOpenMenuMobile}
              className="inline-flex items-center justify-center p-2 text-orange-500"
            >
              <span className="sr-only">Abrir menu</span>
              {openMenuMobile == true ? (
                <X size={25} weight="regular" />
              ) : (
                <List size={25} weight="regular" />
              )}
            </button>
          </div>
        </div>
      </div>
      {openMenuMobile ? (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavBar className="block px-3 py-2 rounded-md text-base" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
