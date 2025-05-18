// src/components/Header.tsx
import React from 'react';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center space-x-2">
          <img
            src="https://img.icons8.com/?size=100&id=m4nICevrL3ps&format=png&color=000000"
            alt="Logo"
            className="h-8 w-8"
          />
          <h1 className="text-xl font-bold">DomiExpress</h1>
        </div>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button className="flex items-center space-x-2 hover:bg-yellow-400 p-2 rounded-md cursor-pointer">
              <FaShoppingCart className="text-lg" />
              <a href="cart"><span>Carrito</span></a>
            </button>
          </li>
          <li>
            {/* Add more nav items here if needed */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
