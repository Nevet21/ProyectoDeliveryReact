// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">DomiExpress</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#services" className="hover:underline">Servicios</a></li>
          <li><a href="#how-it-works" className="hover:underline">¿Cómo funciona?</a></li>
          <li><a href="#contact" className="hover:underline">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
