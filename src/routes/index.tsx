import { lazy } from 'react';

// Importaciones perezosas de los componentes
const Carrito = lazy(() => import('../pages/Cart/Cart'));
import AdminHome from '../pages/Admin/Admin';
const OrderPage = lazy(() => import('../pages/CRUDpage/OrderPage'));
const CustomerPage = lazy(() => import('../pages/CRUDpage/CustomerPage'));
const DriverPage = lazy(() => import('../pages/CRUDpage/DriverPage'));
const IssuePage = lazy(() => import('../pages/CRUDpage/IssuePage'));
const MenuPage = lazy(() => import('../pages/CRUDpage/MenuPage'));
const MotorcyclePage = lazy(() => import('../pages/CRUDpage/MotorcyclePage'));
const AddressPage = lazy(() => import('../pages/CRUDpage/AdressPage'));
const PhotoPage = lazy(() => import('../pages/CRUDpage/PhotoPage'));
const ProductPage = lazy(() => import('../pages/CRUDpage/ProductPage'));
const RestaurantePage = lazy(() => import('../pages/CRUDpage/RestaurantePage'));
const ShiftPage = lazy(() => import('../pages/CRUDpage/ShiftPage'));
const Mapa = lazy(() => import('../components/MapaPedidos'));
const Graficas = lazy(() => import('../pages/Graficas/Graficas'));

const AdminLayout = lazy(() => import('../components/AdminLayout'));
const Chat = lazy(() => import('../pages/ChatBot/ChatBot'));

// Importaciones perezosas de los componentes de página
const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Restaurantes/Register'));

// Definición de las rutas
const routes = [
  
  {
    path: '/',
    title: 'Inicio',
    component: Home,
  },
  {
    path: '/registrar-restaurante',
    title: 'Registrar Restaurante',
    component: Register,
  },
  {
    path: '/admin/ordenes',
    title: 'Órdenes',
    component: OrderPage,
  },
  {
    path: '/admin/clientes',
    title: 'Clientes',
    component: CustomerPage,
  },
  {
    path: '/admin/conductores',
    title: 'Conductores',
    component: DriverPage,
  },
  {
    path: '/admin/incidencias',
    title: 'Incidencias',
    component: IssuePage,
  },
  {
    path: '/admin/menus',
    title: 'Menús',
    component: MenuPage,
  },
  {
    path: '/admin/motos',
    title: 'Motos',
    component: MotorcyclePage,
  },
  {
    path: '/admin/direcciones',
    title: 'Direcciones',
    component: AddressPage,
  },
  {
    path: '/admin/fotos',
    title: 'Fotos',
    component: PhotoPage,
  },
  {
    path: '/admin/productos',
    title: 'Productos',
    component: ProductPage,
  },
  {
    path: '/admin/restaurantes',
    title: 'Restaurantes',
    component: RestaurantePage,
  },
  {
    path: '/admin/turnos',
    title: 'Turnos',
    component: ShiftPage,
  },

  {
    path: '/cart',
    title: 'Carrito',
    component: Carrito,
  },
  {
    path: '/map',
    title: 'mapa',
    component: Mapa,
  },

  {
    path: '/admin',
    title: 'Panel de Administración',
    component: AdminHome,
  },
  {
    path: '/admin2',
    title: 'ADMIN',
    component: AdminLayout,
  },
  {
    path: '/chat',
    title: 'Chat',
    component: Chat,
  },
  {
    path: '/graficas',
    title: 'Graficas',
    component: Graficas,
  }
  
];

export default routes;
