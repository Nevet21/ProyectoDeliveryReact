import React, { useState } from "react";
import { FaBars, FaRegHandshake, FaHamburger, FaShoppingCart, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Botón para abrir el sidebar */}
      <button
        className="text-2xl p-4 focus:outline-none cursor-pointer"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar lateral deslizante */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Encabezado del sidebar */}
        <div className="p-6 flex flex-col items-center justify-center">
          <img 
            src="https://img.icons8.com/?size=100&id=8R69qwspR9Vi&format=png&color=000000" 
            alt="Logo" 
            className="h-20 w-20 object-contain mb-2" 
          />
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-4 text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Contenido del menú */}
        <div className="p-6 space-y-6">
          {/* Enlaces principales */}
          <div className="space-y-4">
            <Link
              to="/login"
              className="block py-2 px-4 rounded-md bg-red-500 hover:bg-red-600 text-center font-bold text-white cursor-pointer"
              onClick={toggleSidebar}
            >
              Ingreso
            </Link>
            <Link
              to="/cart"
              className="block py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-center font-bold text-white cursor-pointer"
              onClick={toggleSidebar}
            >
              Ver Carrito
            </Link>
          </div>

          {/* Opciones adicionales */}
          <div className="space-y-4">
              <Link
                to="/restaurantes"
                className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer"
                onClick={toggleSidebar}
              >
                <FaHamburger className="text-xl" />
                <span>Restaurantes</span>
              </Link>
            
            <div className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer">
              <FaShoppingCart className="text-xl" />
              <span>Mercados</span>
            </div>

            <div
              className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer"
              onClick={() => handleNavigation("/registrar-restaurante")}
            >
              <FaPlus className="text-xl" />
              <span>Registrar Restaurante</span>
            </div>
            <div
              className="flex items-center space-x-3 hover:bg-blue-500 hover:rounded-md p-2 transition cursor-pointer"
              onClick={() => handleNavigation("/Ingresar-restaurante")}
            >
              <FaPlus className="text-xl" />
              <span>Ingresar Restaurante</span>
            </div>
          </div>

          {/* Admin */}
          <div className="mt-6 bg-blue-600 rounded-md text-center py-3 text-white hover:bg-blue-700 cursor-pointer transition">
            <Link to="/Admin" className="block w-full">
              Administrador
            </Link>
          </div>

          {/* ChatBot */}
          <div className="mt-6 bg-green-600 rounded-md text-center py-3 text-white hover:rounded-md cursor-pointer">
            <Link to="/chat">
              ChatBot
            </Link>
          </div>

          {/* graficas */}
          <div className="mt-6 bg-yellow-600 rounded-md text-center py-3 text-white hover:rounded-md cursor-pointer">
            <Link to="/graficas">
              Graficas
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
