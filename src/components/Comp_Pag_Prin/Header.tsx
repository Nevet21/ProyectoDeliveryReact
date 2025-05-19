import React from 'react';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, setUser } = useAuth();

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
        <ul className="flex items-center space-x-4">
          <li>
            <Link to="/cart" className="flex items-center space-x-2 hover:bg-yellow-400 p-2 rounded-md">
              <FaShoppingCart className="text-lg" />
              <span>Carrito</span>
            </Link>
          </li>
          
          {user ? (
            <li className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <FaUser className="text-sm" />
                <span>{user.displayName || user.email?.split('@')[0]}</span>
              </div>
              <button 
                onClick={() => setUser(null)}
                className="hover:bg-yellow-400 p-2 rounded-md"
              >
                <FaSignOutAlt />
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="flex items-center space-x-2 hover:bg-yellow-400 p-2 rounded-md">
                <FaSignInAlt className="text-lg" />
                <span>Iniciar sesión</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;