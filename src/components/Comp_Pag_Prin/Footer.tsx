// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>© 2025 DomiExpress | Todos los derechos reservados</p>
      <div className="mt-2">
        <a href="#" className="hover:underline mx-2">Política de privacidad</a>
        <a href="#" className="hover:underline mx-2">Términos y condiciones</a>
      </div>
    </footer>
  );
};

export default Footer;
