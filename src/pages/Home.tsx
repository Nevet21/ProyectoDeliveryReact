// src/pages/Home.tsx
import React from 'react';
import MainLayout from '../layaouts/MainLayaout';
import ServiceCard from '../components/Comp_Pag_Prin/ServiceCard';

const Home: React.FC = () => {
  return (
    <MainLayout>
      {/* Sección Hero */}
      <section className="hero bg-yellow-500 text-white p-10 text-center">
        <h2 className="text-3xl font-bold">DomiExpress</h2>
        <p className="mt-4 text-xl">¡Haz tus entregas de manera rápida y segura!</p>  
        <p className="mt-2 text-lg">Realiza entregas de comida, compras, paquetes y mucho más.</p>
      </section>

      {/* Servicios */}
      <section id="services" className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard title="Comida" description="Entrega tu comida favorita desde los mejores restaurantes." />
        <ServiceCard title="Compras" description="Haz tus compras y te las llevamos en minutos." />
        <ServiceCard title="Mensajería" description="Envía paquetes de forma rápida y segura." />
      </section>

      {/* Cómo Funciona */}
      <section id="how-it-works" className="p-8 text-center">
        <h2 className="text-2xl font-semibold">¿Cómo funciona?</h2>
        <p className="mt-4">
          Selecciona el servicio, ingresa la dirección de entrega, y realiza tu pedido. ¡Así de fácil!
        </p>
      </section>
    </MainLayout>
  );
};

export default Home;


