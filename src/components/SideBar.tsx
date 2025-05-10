import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Botón para abrir/cerrar sidebar */}
      <button 
        className="text-2xl p-4 focus:outline-none cursor-pointer" 
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Menú</h2>
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-4 text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <span className="cursor-pointer hover:underline">Ingreso</span>
          <span className="cursor-pointer hover:underline">Registro</span>
          <span className="cursor-pointer hover:underline">Restaurantes</span>
          <span className="cursor-pointer hover:underline">Productos</span>
          <span className="cursor-pointer hover:underline">
            Quiero ser domiExpress
          </span>
          <span className="cursor-pointer hover:underline">
            Registrar restaurante
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
