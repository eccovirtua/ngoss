import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/checkout'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);


  return (
    // Aquí definimos el tema global: Fondo oscuro, texto blanco, altura mínima, fuente.
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {showNavbar && <Navbar />}
      {/* El contenido dinámico de tus páginas aparecerá aquí adentro */}
      <main className="flex flex-col justify-center items-center min-h-screen">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;