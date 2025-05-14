import { lazy } from 'react';

// Importaciones perezosas de los componentes
const MainLayout = lazy(() => import('../components/MainLayaout'));
const Header = lazy(() => import('../components/Comp_Pag_Prin/Header'));
const Footer = lazy(() => import('../components/Comp_Pag_Prin/Footer'));
const SearchBar = lazy(() => import('../components/Comp_Pag_Prin/SearchBar'));
const ServiceCard = lazy(() => import('../components/Comp_Pag_Prin/ServiceCard'));
const SideBar = lazy(() => import('../components/Comp_Pag_Prin/SideBar'));
const Carrito = lazy(() => import('../pages/Cart/Cart'));
const AdminLayout = lazy(() => import('../components/AdminLayout'));


// Definición de las rutas
const routes = [
  {
    path: '/',
    title: 'Main Layout',
    component: MainLayout,
  },
  {
    path: '/header',
    title: 'Header',
    component: Header,
  },
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
  
];

export default routes;
