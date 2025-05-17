import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaUserAlt,
  FaExclamationCircle,
  FaMotorcycle,
  FaTruck,
  FaShoppingBag,
  FaCamera,
  FaHamburger,
  FaUtensils,
  FaClock,
  FaBars,
  FaTimes,
  FaSignOutAlt
} from 'react-icons/fa';

const menuItems = [
  { name: 'Direcciones', path: '/admin/direcciones', icon: <FaMapMarkerAlt /> },
  { name: 'Clientes', path: '/admin/clientes', icon: <FaUserAlt /> },
  { name: 'Incidencias', path: '/admin/incidencias', icon: <FaExclamationCircle /> },
  { name: 'Conductores', path: '/admin/conductores', icon: <FaTruck /> },
  { name: 'Motos', path: '/admin/motos', icon: <FaMotorcycle /> },
  { name: 'Órdenes', path: '/admin/ordenes', icon: <FaShoppingBag /> },
  { name: 'Fotos', path: '/admin/fotos', icon: <FaCamera /> },
  { name: 'Productos', path: '/admin/productos', icon: <FaHamburger /> },
  { name: 'Restaurantes', path: '/admin/restaurantes', icon: <FaUtensils /> },
  { name: 'Turnos', path: '/admin/turnos', icon: <FaClock /> }
];

const SideBarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Aquí puedes agregar lógica de logout real
    console.log('Cerrar sesión');
  };

  return (
    <>
      {/* Botón toggle visible solo en móvil */}
      <button
        className="md:hidden p-4 text-2xl text-red-600 z-50 fixed top-0 left-0"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-md border-r z-40 transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        <div className="flex flex-col h-full">
          {/* Encabezado */}
          <div className="text-2xl font-bold text-red-600 py-6 px-4 text-center border-b">
            Panel Admin
          </div>

          {/* Navegación */}
          <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-100 text-red-600'
                      : 'text-gray-700 hover:bg-red-100 hover:text-red-600'
                  }`
                }
                onClick={() => setIsOpen(false)} // Cierra el menú en móvil
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Cerrar sesión */}
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <FaSignOutAlt className="text-xl" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarAdmin;
