// src/components/Header.tsx
import React from 'react';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">DomiExpress</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button className="flex items-center space-x-2 hover:bg-yellow-400 p-2 rounded-md cursor-pointer">
              <FaShoppingCart className="text-lg" />
              <span>Carrito</span>
            </button>
          </li>
          <li>
            <button className="flex items-center space-x-2 hover:bg-yellow-400 p-2 rounded-md cursor-pointer">
              <FaSignInAlt className="text-lg" />
              <span>Ingreso</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

