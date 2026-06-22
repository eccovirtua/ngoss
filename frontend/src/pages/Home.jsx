import { useEffect, useState } from 'react';
import { getGames } from '../services/api';
import { useCart } from '../context/CartContext';

function Home() {
  const [games, setGames] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  
  // Traemos la función para agregar al carrito desde el Contexto
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
      } catch (error) {
        console.error("Error al cargar los juegos", error);
      }
    };
    fetchGames();
  }, []);

  // Función que maneja el click
  const handleAddToCart = (game) => {
    addToCart(game);
    
    // Mostramos la notificación
    setToastMessage(`¡${game.title} añadido al carrito!`);
    
    // Ocultamos la notificación después de 3 segundos
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="w-full max-w-6xl px-6 relative">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-100">Catálogo de Juegos</h2>
      
      {/* Notificación flotante (Toast) */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-fade-in-down font-bold">
          ✅ {toastMessage}
        </div>
      )}

      {games.length === 0 ? (
        <p className="text-center text-gray-400">Cargando catálogo...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map(game => (
            <div key={game.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
              <img 
                src={game.imageUrl} 
                alt={game.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-1 text-white">{game.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{game.platform}</p>
                <p className="text-2xl font-extrabold text-blue-400 mb-1">${game.price}</p>
                <p className="text-xs text-gray-500 mb-4">Stock disponible: {game.stock}</p>
                
                {/* Empuja el botón hacia abajo si el título es corto */}
                <div className="mt-auto"> 
                  <button 
                    onClick={() => handleAddToCart(game)}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded active:scale-95 transition-transform duration-150 ease-in-out"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;