import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps) {
  return (
    <>
      <Link
        className={twMerge(
          'text-orange-600 px-3 py-2 font-inter font-medium rounded-md transition-all duration-500 hover:bg-orange-600 hover:text-orange-50 ',
          className
        )}
        to="/by-name/"
      >
        Receitas por nome
      </Link>
      <Link
        className={twMerge(
          'text-orange-600 px-3 py-2 font-inter font-medium rounded-md transition-all duration-500 hover:bg-orange-600 hover:text-orange-50 ',
          className
        )}
        to="/by-letter/"
      >
        Receitas por Letra
      </Link>
      <Link
        className={twMerge(
          'text-orange-600 px-3 py-2 font-inter font-medium rounded-md transition-all duration-500 hover:bg-orange-600 hover:text-orange-50 ',
          className
        )}
        to="/ingredient/"
      >
        Recitas por ingredientes
      </Link>
    </>
  );
}
