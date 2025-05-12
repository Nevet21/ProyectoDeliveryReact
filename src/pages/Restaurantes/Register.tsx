import React from "react";

const Register = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Lado izquierdo con imagen y texto promocional */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center items-center justify-center"
        style={{ backgroundImage: "url('/your-image.jpg')" }}
      >
        <div className="text-white px-10 max-w-md">
          <h1 className="text-4xl font-bold mb-4">0% TARIFAS POR 30 DÍAS</h1>
          <p className="mb-4">
            Aplica un 20% de descuento en tu menú y <strong>no pagues por el uso de la plataforma</strong> en tus primeros 30 días.
          </p>
          <p className="text-xl font-semibold">Únete a Rappi y accede a miles de usuarios cerca de ti</p>
          <p className="mt-2 text-sm">¡Es por tiempo limitado!</p>
          <a href="#" className="mt-4 block font-semibold text-white underline">
            ¿Ya eres aliado y quieres registrar otras marcas o sucursales? Haz clic aquí &gt;&gt;
          </a>
        </div>
      </div>

      {/* Lado derecho con el formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <form className="w-full max-w-md p-8 space-y-6 shadow-md rounded-md bg-white">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Registra tu restaurante</h2>
          <p className="text-center text-sm text-gray-500">
            ¿Ya comenzaste tu registro? <a href="#" className="text-green-600 font-semibold underline">continúa aquí.</a>
          </p>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Tu nombre" className="border p-2 rounded" />
            <input type="text" placeholder="Tu apellido" className="border p-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select className="border p-2 rounded">
              <option>Colombia (+57)</option>
              <option>México (+52)</option>
              <option>Perú (+51)</option>
            </select>
            <input type="text" placeholder="Tu móvil" className="border p-2 rounded" />
          </div>
          <input type="email" placeholder="E-mail del responsable" className="w-full border p-2 rounded" />
          <input type="password" placeholder="Crea una contraseña" className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded cursor-not-allowed" disabled>
            Registrar restaurante
          </button>
          <a href="#" className="block text-center text-green-600 font-semibold mt-4">
            Mi negocio no es un restaurante
          </a>
        </form>
      </div>
    </div>
  );
};

export default Register;
