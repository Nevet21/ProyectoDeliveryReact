import { createBrowserRouter, Outlet } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Home from './pages/Home/Home';
import MenuPage from './pages/CRUDpage/MenuPage';
import OrderPage from './pages/CRUDpage/OrderPage';
import ProductPage from './pages/CRUDpage/ProductPage';
import DriverPage from './pages/CRUDpage/DriverPage';
import AdressPage from './pages/CRUDpage/AdressPage';
import ShiftPage from './pages/CRUDpage/ShiftPage';
import IssuePage from './pages/CRUDpage/IssuePage';
import PhotoPage from './pages/CRUDpage/PhotoPage';

// Layout para el panel de administración
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Panel de Administración</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="/admin/menus" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  Menús
                </a>
                <a href="/admin/orders" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  Órdenes
                </a>
                <a href="/admin/products" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  Productos
                </a>
                <a href="/admin/drivers" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                  Conductores
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'menus',
        element: <MenuPage />,
      },
      {
        path: 'orders',
        element: <OrderPage />,
      },
      {
        path: 'products',
        element: <ProductPage />,
      },
      {
        path: 'drivers',
        element: <DriverPage />,
      },
      {
        path: 'addresses',
        element: <AdressPage />,
      },
      {
        path: 'shifts',
        element: <ShiftPage />,
      },
      {
        path: 'issues',
        element: <IssuePage />,
      },
      {
        path: 'photos',
        element: <PhotoPage />,
      },
    ],
  },
]);

export default router; 