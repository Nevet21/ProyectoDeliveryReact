// src/components/Header.tsx
import React from 'react';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-yellow-500 text-white p-4 flex justify-between items-center">
      <Link to="/" >
        <h1 className="text-xl font-bold">DomiExpress</h1>
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