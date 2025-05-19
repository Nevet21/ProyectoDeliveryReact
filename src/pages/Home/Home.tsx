import React from 'react';
import { FaTruck, FaCheckCircle, FaUtensils, FaArrowRight } from 'react-icons/fa';
import MainLayout from '../../layaouts/MainLayaout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section - Gradiente moderno */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              DomiExpress <span className="text-black">Delivery</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              ¡El lugar donde puedes comprar y vender! Entregas ultrarrápidas de comida, 
              compras y paquetes directamente a tu puerta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/registrar-restaurante"
                className="px-8 py-4 bg-black text-yellow-400 rounded-xl text-lg font-bold hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 shadow-lg"
              >
                Comenzar ahora <FaArrowRight />
              </a>
              <a
                href="/#como-funciona"
                className="px-8 py-4 bg-white text-yellow-600 rounded-xl text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Cómo funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Tarjetas con hover */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Por qué elegir <span className="text-yellow-500">DomiExpress</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <FaTruck className="text-5xl mb-6 text-yellow-500" />,
                title: "Entregas Express",
                description: "Llegamos en menos de 30 minutos o tu pedido es gratis*",
                bg: "bg-yellow-50"
              },
              {
                icon: <FaCheckCircle className="text-5xl mb-6 text-green-500" />,
                title: "Seguimiento en vivo",
                description: "Rastrea a tu repartidor en tiempo real desde la app",
                bg: "bg-green-50"
              },
              {
                icon: <FaUtensils className="text-5xl mb-6 text-red-500" />,
                title: "+100 Restaurantes",
                description: "Los mejores locales asociados con opciones para todos",
                bg: "bg-red-50"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`${feature.bg} p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="text-center">
                  {feature.icon}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Entregas mensuales" },
              { number: "98%", label: "Clientes satisfechos" },
              { number: "25min", label: "Tiempo promedio" },
              { number: "150+", label: "Repartidores activos" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <p className="text-4xl font-bold text-yellow-500 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para probar la mejor experiencia de delivery?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Descarga nuestra app y recibe $5,000 de descuento en tu primer pedido
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-900 transition">
              <img src="https://img.icons8.com/?size=100&id=118633&format=png&color=000000" alt="Google Play" className="h-8" />
              Google Play
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-yellow-400">DomiExpress</h3>
              <p className="text-gray-400 mt-2">Delivery a otro nivel</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow-400 transition">Términos</a>
              <a href="#" className="hover:text-yellow-400 transition">Privacidad</a>
              <a href="#" className="hover:text-yellow-400 transition">Contacto</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DomiExpress. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </MainLayout>
  );
};

export default Home;