import { useEffect } from 'react';
import { createBrowserRouter, createHashRouter, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CaseStudy from './pages/CaseStudy.jsx';
import { scrollToTop, startSmoothScroll } from './motion.js';

const Layout = () => {
  const { pathname } = useLocation();
  useEffect(() => startSmoothScroll(), []);
  useEffect(() => {
    if (pathname !== '/') scrollToTop(true);
  }, [pathname]);
  return (
    <>
      <Nav />
      <Outlet />
      <div className="column"><Footer /></div>
    </>
  );
};

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects/:id', element: <CaseStudy /> },
      { path: '*', element: <Home /> }
    ]
  }
];

// GitHub Pages serves real paths (404.html handles deep links). Previews that
// can't, set window.__HASH_ROUTER__ and use #/ routes instead.
const router = window.__HASH_ROUTER__ ? createHashRouter(routes) : createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}
