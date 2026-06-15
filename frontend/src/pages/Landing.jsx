import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Contenedor Principal (Hero Section) */}
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6 drop-shadow-lg">
          MeliKeys
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          Distribuidor oficial de keys de juegos. Encuentra las mejores keys de Steam, Epic Games y Xbox al instante.
        </p>

        {/* Botón de Entrada (Call to Action) */}
        <Link to="/login">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
            Explorar Catálogo
          </button>
        </Link>
      </div>

      {/* Sección de Características (Beneficios) */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-5xl">
        
        <div className="bg-gray-800 p-6 rounded-2xl text-center shadow-lg border border-gray-700">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">Entrega Inmediata</h3>
          <p className="text-gray-400">Recibe tu código autogenerado en tu historial al instante tras la compra.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl text-center shadow-lg border border-gray-700">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">100% Seguro</h3>
          <p className="text-gray-400">Plataforma blindada. Autenticación segura y persistencia de datos garantizada.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl text-center shadow-lg border border-gray-700">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-xl font-bold mb-2">Mejores Títulos</h3>
          <p className="text-gray-400">Catálogo actualizado con los mejores lanzamientos para todas las plataformas.</p>
        </div>

      </div>

    </div>
  );
}

export default Landing;