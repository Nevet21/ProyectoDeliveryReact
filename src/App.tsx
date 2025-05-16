import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './common/Loader';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import MainLayout from './components/MainLayaout'; // Ajusta la ruta si es distinta

// Cargar componentes de forma perezosa
const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Restaurantes/Register'));
const Login = lazy(() => import('./pages/Auth/Login')); // Asegúrate que este path sea correcto

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

          {/* Rutas dinámicas desde el arreglo de rutas */}
          {routes.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}

          {/* Ruta para registrar restaurante */}
          <Route path="/registrar-restaurante" element={<Register />} />

          {/* Ruta de login envuelta en MainLayout */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <MainLayout>
                  <Login />
                </MainLayout>
              </Suspense>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
