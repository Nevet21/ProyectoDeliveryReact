import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Loader from './common/Loader';
import routes from './routes';
import MainLayout from './layaouts/MainLayaout'; // Asegúrate de importar MainLayout

// Importación perezosa de la página de inicio (Home)
const Home = lazy(() => import('./pages/Home/Home'));

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
      <Routes>
        {/* Ruta principal (Home) */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout>
                <Home />
              </MainLayout>
            </Suspense>
          }
        />

        {/* Aquí puedes mapear otras rutas y envolverlas en MainLayout */}
        {routes.map(({ path, component: Component }, index) => (
          <Route
            key={index}
            path={path}
            element={
              <Suspense fallback={<Loader />}>
                <MainLayout>
                  <Component />
                </MainLayout>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
