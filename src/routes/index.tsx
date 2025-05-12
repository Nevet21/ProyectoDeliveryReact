import { lazy } from 'react';

// Importaciones perezosas de los componentes
const MainLayout = lazy(() => import('../layaouts/MainLayaout'));
const Header = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));
const SearchBar = lazy(() => import('../components/SearchBar'));
const ServiceCard = lazy(() => import('../components/ServiceCard'));
const SideBar = lazy(() => import('../components/SideBar'));

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
  
];

export default routes;
