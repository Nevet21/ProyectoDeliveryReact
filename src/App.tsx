import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from './common/Loader';
import routes from './routes';
import MainLayout from './layaouts/MainLayaout'; // Asegúrate de importar MainLayout
import Register from './pages/Restaurantes/Register'
import Login from './pages/Auth/Login';

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

  {routes.map(({ path, component: Component }, index) => (
    <Route
      key={index}
      path={path}
      element={
        <Suspense fallback={<Loader />}>
          <MainLayout>
            <Component children={undefined} title={''} description={''} />
          </MainLayout>
        </Suspense>
      }
    />
  ))}

  <Route
    path="/registrar-restaurante"
    element={
      <Suspense fallback={<Loader />}>
        <MainLayout>
          <Register />
        </MainLayout>
      </Suspense>
    }
  />
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
    </>
  );
}

export default App;
