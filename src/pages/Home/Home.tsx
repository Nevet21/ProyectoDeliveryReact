import React from 'react';
import { FaTruck, FaCheckCircle, FaUtensils } from 'react-icons/fa'; // Iconos de react-icons
import MainLayout from '../../layaouts/MainLayaout'; // Importamos MainLayout

const Home: React.FC = () => {
  return (
    <MainLayout>
      <section className="bg-yellow-500 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Bienvenido a DomiExpress</h2>
            <p className="text-lg md:text-xl mb-6">¡Haz tus entregas de manera rápida y segura!</p>
            <p className="text-sm md:text-lg text-gray-100">Realiza entregas de comida, compras, paquetes y mucho más. ¡Con nosotros, tus entregas son rápidas y sin complicaciones!</p>
            <a
              href="/#"
              className="mt-8 inline-block px-8 py-3 bg-black text-yellow-500 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
            >
              Comienza Ahora
            </a>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaTruck className="mx-auto text-6xl text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white">Entregas Rápidas</h3>
              <p className="text-gray-200 mt-2">Garantizamos que tus productos lleguen a su destino rápidamente, con total seguridad y eficiencia.</p>
            </div>
            <div className="text-center">
              <FaCheckCircle className="mx-auto text-6xl text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white">Confianza Total</h3>
              <p className="text-gray-200 mt-2">Nuestro servicio está diseñado para brindarte la mayor seguridad en cada entrega, con seguimiento en tiempo real.</p>
            </div>
            <div className="text-center">
              <FaUtensils className="mx-auto text-6xl text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white">Comida y Más</h3>
              <p className="text-gray-200 mt-2">Desde alimentos hasta productos de todo tipo. ¡Haz tu pedido y nosotros lo llevamos a tu puerta!</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¡Únete a nosotros hoy mismo!</h2>
            <p className="text-lg md:text-xl text-gray-200 mb-8">No pierdas la oportunidad de disfrutar de entregas rápidas, seguras y cómodas. ¡Haz tu pedido hoy mismo!</p>
            <a
              href="/registrar-restaurante"
              className="inline-block px-10 py-4 bg-yellow-500 text-black rounded-lg font-semibold text-lg hover:bg-yellow-600 transition"
            >
              Regístrate Ahora
            </a>
          </div>

          {/* Footer Section */}
          <div className="mt-24 text-center text-gray-400 text-sm">
            <p>&copy; 2025 DomiExpress. Todos los derechos reservados.</p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;




