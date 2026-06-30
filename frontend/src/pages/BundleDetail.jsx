import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Base de datos estática para las ofertas especiales
const specialProducts = {
  random: {
    id: 9991, // IDs altos para no chocar con tu base de datos H2
    title: "10 Random Premium Steam Keys",
    platform: "Steam",
    price: 4.99,
    stock: 999, // Stock casi infinito
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_1080p/co1r7h.jpg", // Imagen genérica llamativa
    description: "¡Prueba tu suerte! Recibe 10 claves aleatorias de Steam. Garantizamos que al menos un juego tiene un valor en tienda superior a $20. No hay devoluciones por juegos duplicados si ya los tienes en tu biblioteca.",
    badge: "Surprise!",
    badgeColor: "bg-purple-600",
    theme: "from-purple-900 to-gray-900"
  },
  fps: {
    id: 9992,
    title: "Exclusive FPS Bundle",
    platform: "PC Global",
    price: 29.99,
    stock: 50,
    imageUrl: "https://images.igdb.com/igdb/image/upload/t_1080p/co2lbd.jpg", 
    description: "El paquete definitivo para los amantes de la acción. Incluye claves globales para 3 de los mejores shooters del mercado. Ahorra más de un 60% en comparación a comprarlos por separado.",
    badge: "Exclusive",
    badgeColor: "bg-blue-600",
    theme: "from-blue-900 to-gray-900"
  }
};

function BundleDetail() {
  const { type } = useParams(); // 'random' o 'fps'
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState('');

  const bundle = specialProducts[type];

  // Si alguien escribe una URL inválida, lo mandamos al home
  if (!bundle) {
    navigate('/home');
    return null;
  }

  const handleAddToCart = () => {
    addToCart(bundle);
    setToastMessage('¡Añadido al carrito!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-10">
      
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-bold">
          ✅ {toastMessage}
        </div>
      )}

      {/* Navegación */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/home" className="hover:text-white transition">Inicio</Link> 
        <span className="mx-2">{'>'}</span> 
        <span className="text-gray-200">Ofertas Especiales</span>
      </div>

      <div className={`bg-gradient-to-br ${bundle.theme} p-8 md:p-12 rounded-3xl border border-gray-700 shadow-2xl flex flex-col md:flex-row gap-10 items-center`}>
        
        {/* Imagen representativa */}
        <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
          <img src={bundle.imageUrl} alt={bundle.title} className="w-full h-[400px] object-cover" />
          <div className="absolute top-4 left-4">
            <span className={`${bundle.badgeColor} text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg`}>
              {bundle.badge}
            </span>
          </div>
        </div>

        {/* Detalles y Caja de Compra */}
        <div className="w-full md:w-1/2 flex flex-col h-full justify-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{bundle.title}</h1>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">{bundle.description}</p>
          
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 mb-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
              <span className="text-gray-400 uppercase tracking-wider text-sm font-bold">Plataforma</span>
              <span className="text-white font-bold">{bundle.platform}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 uppercase tracking-wider text-sm font-bold">Precio Total</span>
              <span className="text-4xl font-black text-white">${bundle.price}</span>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`w-full py-5 rounded-xl font-bold text-xl transition transform active:scale-95 shadow-lg ${bundle.badgeColor} hover:brightness-110 text-white`}
          >
            Añadir al Carrito
          </button>
        </div>

      </div>
    </div>
  );
}

export default BundleDetail;