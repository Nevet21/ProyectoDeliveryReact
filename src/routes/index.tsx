import { lazy } from 'react';

<<<<<<< Updated upstream
// Importaciones perezosas de los componentes
const MainLayout = lazy(() => import('../components/MainLayaout'));
const Header = lazy(() => import('../components/Comp_Pag_Prin/Header'));
const Footer = lazy(() => import('../components/Comp_Pag_Prin/Footer'));
const SearchBar = lazy(() => import('../components/Comp_Pag_Prin/SearchBar'));
const ServiceCard = lazy(() => import('../components/Comp_Pag_Prin/ServiceCard'));
const SideBar = lazy(() => import('../components/Comp_Pag_Prin/SideBar'));
const Carrito = lazy(() => import('../pages/Cart/Cart'));
const AdminLayout = lazy(() => import('../components/AdminLayout'));

=======
// Importaciones perezosas de los componentes de página
const Home = lazy(() => import('../pages/Home/Home'));
const Register = lazy(() => import('../pages/Restaurantes/Register'));
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
  {
    path: '/footer',
    title: 'Footer',
    component: Footer,
  },
  {
    path: '/search',
    title: 'Search Bar',
    component: SearchBar,
  },
  {
    path: '/service',
    title: 'Service Card',
    component: ServiceCard,
  },
  {
    path: '/sidebar',
    title: 'Side Bar',
    component: SideBar,
  },
  {
    path: '/cart',
    title: 'Carrito',
    component: Carrito,
  },
  {
    path: '/admin',
    title: 'Admin',
    component: AdminLayout,
  }
  
=======
>>>>>>> Stashed changes
];

export default routes;
