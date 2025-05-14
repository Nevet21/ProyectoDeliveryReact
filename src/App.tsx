import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './common/Loader';
import { Toaster } from 'react-hot-toast';
import routes from './routes';

// Cargar componentes de forma perezosa
const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Restaurantes/Register'));
// Asumir que `routes` está definido en algún lugar de tu código

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Rutas dinámicas */}
          {routes.map(({ path, component: Component }, index) => (
            <Route
              key={index}
              path={path}
              element={<Component />}
            />
          ))}

          {/* Ruta para registrar restaurante */}
          <Route path="/registrar-restaurante" element={<Register />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

