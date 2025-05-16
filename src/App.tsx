import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/index';
import Loader from './common/Loader/index';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map(({ path, component: Component }, idx) =>
          Component ? (
            <Route key={idx} path={path} element={<Component />} />
          ) : null
        )}
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<div>Página no encontrada</div>} />
      </Routes>
    </Suspense>
  );
};

export default App;
