import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Asegúrate de tener esta importación

const AdminHeader = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm h-16 flex items-center justify-between px-6 fixed top-0 left-0 z-30 md:ml-64">
      {/* Título o Logo */}
            <Link
        to="/"
        className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors duration-300"
        >
        Domi<span className="text-gray-800">Express</span>
        </Link>

      {/* Área de usuario / config */}
      <div className="flex items-center gap-4">
        {/* Puedes agregar notificaciones, ícono de settings, etc. */}
        <FaUserCircle className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer" />
      </div>
    </header>
  );
};

export default AdminHeader;
