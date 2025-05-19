// src/components/RestaurantList.tsx
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layaouts/MainLayaout';
import { getRestaurants, getRestaurantById } from '../../Services/RestauranteService';
import type { Restaurant } from '../../models/Restaurante';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
}

const RestaurantList: React.FC = () => {
  const [restaurantes, setRestaurantes] = useState<Restaurant[]>([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarRestaurantes = async () => {
      try {
        const data = await getRestaurants();
        setRestaurantes(data);
      } catch (err) {
        setError('Error al cargar restaurantes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarRestaurantes();
  }, []);

  const handleSeleccionarRestaurante = async (id: number) => {
    try {
      setLoading(true);
      const restaurante = await getRestaurantById(id);
      if (restaurante) {
        setRestauranteSeleccionado(restaurante);
      }
    } catch (err) {
      setError('Error al cargar el menú del restaurante');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && restaurantes.length === 0) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Cargando restaurantes...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Restaurantes Disponibles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantes.map(restaurante => (
            <div
              key={restaurante.id}
              onClick={() => handleSeleccionarRestaurante(restaurante.id)}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={restaurante.imagen}
                alt={restaurante.nombre}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{restaurante.nombre}</h2>
                <p className="text-gray-600 mt-1">{restaurante.descripcion}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {restaurante.productos?.length || 0} productos
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    Ver menú
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar productos del restaurante */}
        {restauranteSeleccionado && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setRestauranteSeleccionado(null)}
          >
            <div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold">{restauranteSeleccionado.nombre}</h2>
                <button
                  onClick={() => setRestauranteSeleccionado(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold mb-4">Menú</h3>
                {restauranteSeleccionado.productos?.length ? (
                  <div className="space-y-4">
                    {restauranteSeleccionado.productos.map((producto: Producto) => (
                      <div key={producto.id} className="flex border-b pb-4">
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-24 h-24 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{producto.nombre}</h4>
                          <p className="text-sm text-gray-600">{producto.descripcion}</p>
                          <p className="font-bold mt-1">${producto.precio.toFixed(2)}</p>
                        </div>
                        <button className="self-center bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Añadir
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Este restaurante no tiene productos disponibles</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default RestaurantList;