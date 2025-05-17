import React, { useState } from 'react';
import type { Restaurante } from "../../models/Restaurante";
import MainLayout from '../../layaouts/MainLayaout';  // Asegúrate de tener la ruta correcta
import { createRestaurant } from "../../Services/RestauranteService"; // Importación del servicio

const Register: React.FC = () => {
  const [restaurant, setRestaurant] = useState<Restaurante>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!restaurant.name?.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!restaurant.address?.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!restaurant.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (restaurant.phone.trim().length < 7) {
      newErrors.phone = 'El teléfono debe tener al menos 7 caracteres';
    }
    if (!restaurant.email?.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(restaurant.email)) {
        newErrors.email = 'El correo electrónico no es válido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!validate()) return;

    const result = await createRestaurant(restaurant);

    if (result) {
      setSuccessMessage('Restaurante registrado con éxito!');
      setRestaurant({ name: '', address: '', phone: '', email: '' });
      setErrors({});
    } else {
      setErrorMessage('Error al registrar el restaurante');
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Registro de Restaurante</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={restaurant.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Dirección:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={restaurant.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Teléfono:</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={restaurant.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={restaurant.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Registrar
          </button>

          {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </form>
      </div>
    </MainLayout>
  );
};

export default Register;
