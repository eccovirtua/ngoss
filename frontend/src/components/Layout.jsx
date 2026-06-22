import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    // Aquí definimos el tema global: Fondo oscuro, texto blanco, altura mínima, fuente.
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar /> {/* El NavBar se muestra en todas las páginas */}
      {/* El contenido dinámico de tus páginas aparecerá aquí adentro */}
      <main className="flex flex-col justify-center items-center min-h-screen">
        <Outlet /> 
      </main>

      {/* Si quisieras un Footer, iría aquí abajo */}
    </div>
  );
}

export default Layout;