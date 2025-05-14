import React, { useState } from "react";
import { FaBars, FaRegHandshake, FaHamburger, FaShoppingCart, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Botón para abrir/cerrar el sidebar */}
     <button 
        className="text-2xl p-4 focus:outline-none cursor-pointer" 
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="text-3xl font-bold">Logo</div>
           <button
            onClick={toggleSidebar}
            className="absolute top-2 right-4 text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Botones de Ingreso y Registro */}
          <div className="space-y-4">
            <Link
              to="/login"
              className="block py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-center font-bold cursor-pointer"
            >
              Ingreso
            </Link>
            <Link
              to="/register"
              className="block py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600 text-center font-bold cursor-pointer"
            >
              Registro
            </Link>
          </div>

          {/* Secciones con iconos */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer">
              <FaHamburger className="text-xl" />
              <span>Restaurantes</span>
            </div>
            <div className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer">
              <FaShoppingCart className="text-xl" />
              <span>Mercados</span>
            </div>
            <div className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer">
              <FaPlus className="text-xl" />
              <span>Express</span>
            </div>
          </div>

          {/* Promociones */}
          <div className="mt-6 bg-purple-500 rounded-md text-center py-3 text-white">
            <span className="font-semibold">¡Descubre nuestras promociones!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
