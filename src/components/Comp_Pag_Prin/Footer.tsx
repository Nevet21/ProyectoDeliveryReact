// src/components/Footer.tsx
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Categorías */}
        <div>
          <h3 className="font-semibold mb-2">Categorías</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Restaurantes</li>
            <li>Farmacias</li>
            <li>Tiendas</li>
            <li>Express</li>
            <li>Licores</li>
          </ul>
        </div>

        {/* Únete */}
        <div>
          <h3 className="font-semibold mb-2">Únete a DomiExpress</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Registra tu restaurante</li>
            <li>Conviértete en repartidor</li>
            <li>Impulsa tu negocio</li>
            <li>Trabaja con nosotros</li>
          </ul>
        </div>

        {/* Sobre nosotros */}
        <div>
          <h3 className="font-semibold mb-2">Sobre DomiExpress</h3>
          <ul className="space-y-1 text-gray-300">
            <li>Blog</li>
            <li>Atención al cliente</li>
            <li>Información legal</li>
          </ul>
        </div>

        {/* Legal + redes sociales */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#" className="hover:underline">Política de privacidad</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">PQRs</a></li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-xs mt-10 border-t border-gray-700 pt-4">
        © 2025 DomiExpress | Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
