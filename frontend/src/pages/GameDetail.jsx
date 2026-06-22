import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getGameById } from '../services/api';
import { useCart } from '../context/CartContext';

function GameDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const data = await getGameById(id);
        setGame(data);
      } catch (error) {
        console.error("Error al cargar el juego", error);
        navigate('/home'); // Si el juego no existe, lo regresamos al catálogo
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(game);
    setToastMessage('¡Añadido al carrito!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  if (loading) return <div className="text-center mt-20 text-xl">Cargando la bóveda...</div>;
  if (!game) return null;

  // Verificamos si ya alcanzó el límite de stock en el carrito
  const cartItem = cart.find(item => item.id === game.id);
  const maxStockReached = cartItem && cartItem.quantity >= game.stock;

  return (
    <div className="w-full relative min-h-screen">
      
      {/* Notificación Toast */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-bold">
          ✅ {toastMessage}
        </div>
      )}

      {/* Fondo Desenfocado (Estilo Eneba/Steam) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 blur-3xl scale-110"
        style={{ backgroundImage: `url(${game.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      ></div>

      <div className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
        
        {/* Navegación Breadcrumb */}
        <div className="text-sm text-gray-400 mb-6">
          <Link to="/home" className="hover:text-white transition">Inicio</Link> 
          <span className="mx-2">{'>'}</span> 
          <span className="text-gray-200">{game.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Columna Izquierda: Imagen y Detalles Básicos */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <img 
              src={game.imageUrl} 
              alt={game.title} 
              className="w-full h-[500px] object-cover rounded-2xl shadow-2xl border border-gray-700"
            />
            
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Sobre este juego</h3>
              <p className="text-gray-300 leading-relaxed">
                Adquiere tu key de <strong className="text-white">{game.title}</strong> para la plataforma <strong className="text-white">{game.platform}</strong>. 
                El código se generará automáticamente y se guardará en el historial de tu cuenta inmediatamente después de confirmar el pago.
              </p>
            </div>
          </div>

          {/* Columna Derecha: La Buy Box (Caja de Compra) */}
          <div className="flex flex-col gap-6">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 sticky top-28">
              
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {game.platform} Key
                </span>
                <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Global
                </span>
              </div>

              <h1 className="text-4xl font-black text-white mb-6 leading-tight">{game.title}</h1>
              
              <div className="flex items-end gap-3 mb-6 border-b border-gray-700 pb-6">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  ${game.price}
                </span>
              </div>

              {/* Indicador de Stock */}
              <div className="mb-6 flex items-center justify-between bg-gray-900 p-3 rounded-lg border border-gray-700">
                <span className="text-gray-400 text-sm">Disponibilidad:</span>
                {game.stock > 0 ? (
                  <span className="text-green-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    En stock ({game.stock})
                  </span>
                ) : (
                  <span className="text-red-400 font-bold">Agotado</span>
                )}
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={game.stock === 0 || maxStockReached}
                className={`w-full py-4 rounded-xl font-bold text-lg transition duration-300 transform active:scale-95 shadow-lg mb-4 
                  ${game.stock === 0 || maxStockReached 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-green-900/50'}`}
              >
                {game.stock === 0 ? 'Agotado' : maxStockReached ? 'Límite en carrito' : 'Añadir al Carrito'}
              </button>

              <button 
                onClick={() => {
                  if (game.stock > 0 && !maxStockReached) {
                    addToCart(game);
                    navigate('/cart');
                  }
                }}
                disabled={game.stock === 0 || maxStockReached}
                className={`w-full py-4 rounded-xl font-bold text-lg transition border 
                  ${game.stock === 0 || maxStockReached 
                    ? 'border-gray-700 text-gray-600 cursor-not-allowed' 
                    : 'border-blue-500 text-blue-400 hover:bg-blue-500/10'}`}
              >
                Comprar Ahora
              </button>

              {/* Badges de Confianza */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-xl">⚡</span>
                  <p><strong>Entrega instantánea</strong> a tu cuenta</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-xl">🛡️</span>
                  <p><strong>Pagos 100% seguros</strong></p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="text-xl">🔑</span>
                  <p>Clave digital verificada</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default GameDetail;