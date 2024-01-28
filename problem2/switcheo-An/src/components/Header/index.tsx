import { Link } from 'react-router-dom';
import LogoImg from '@switcheo/assets/images/logo.svg?react';

const Header = () => {
  return (
    <header className="fixed z-50 w-full border-b border-solid border-slate-300/50 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 justify-between">
          <div className="flex shrink-0 items-center">
            <Link to="/">
              <LogoImg data-testid="logo" className="h-12 w-[100px]" />
            </Link>
          </div>
          <nav className="flex grow justify-end">
            <ul className="flex flex-wrap items-center justify-end">
              <li className="px-6">
                <Link
                  to="/"
                  className="text-sm font-bold text-gray-500 duration-150 hover:text-black"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
