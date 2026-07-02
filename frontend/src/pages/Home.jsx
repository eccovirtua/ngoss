import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGames } from '../services/api';
import { useCart } from '../context/CartContext';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [activePlatform, setActivePlatform] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });
  
  // Estado para manejar qué FAQ está abierto
  const [openFaq, setOpenFaq] = useState(null);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data);
        setFilteredGames(data);
      } catch (error) {
        console.error("Error al cargar los juegos", error);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Calculamos la medianoche del día de HOY
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = midnight - now;

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 3. Generar Ofertas Automáticamente (Tomamos los últimos 4 juegos)
  const dailyDeals = games.slice(-4).map(game => ({
    ...game,
    // Simulamos un precio original (30% más caro que el precio real actual)
    originalPrice: (game.price / 0.7).toFixed(2)
  }));

  const handleFilter = (platform) => {
    setActivePlatform(platform);
    if (platform === 'All') {
      setFilteredGames(games);
    } else {
      setFilteredGames(games.filter(game => game.platform === platform));
    }
  };

  const handleAddToCart = (e, game) => {
    e.preventDefault();
    addToCart(game);
    setToastMessage(`¡${game.title} añadido al carrito!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Preguntas Frecuentes
  const faqs = [
    { q: "¿Cómo recibo mi clave (Key)?", a: "Inmediatamente después de que se apruebe tu pago, la clave se mostrará en pantalla y se guardará en el historial de tu cuenta." },
    { q: "¿Las claves son globales?", a: "La mayoría de nuestras claves son Globales. Sin embargo, revisa siempre la etiqueta de región en la página del producto antes de comprar." },
    { q: "¿Qué son las Random Keys?", a: "Son paquetes sorpresa. Compras a un precio muy bajo y el sistema te asigna un juego de Steam al azar. ¡Podrías llevarte un título AAA!" }
  ];

  return (
    <div className="w-full max-w-[1400px] px-4 md:px-8 space-y-16">
      
      {/* Toast Notificación */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce font-bold">
          ✅ {toastMessage}
        </div>
      )}

      {/* 1. HERO SECTION */}
      <div className="w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden relative shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
        <img 
          src="https://images.igdb.com/igdb/image/upload/t_1080p/ar5zw.jpg" 
          alt="Banner Principal" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-16 w-full md:w-1/2">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">Top Ventas</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 shadow-black drop-shadow-lg">Descubre los mejores juegos al mejor precio</h1>
          <p className="text-gray-300 mb-8 text-lg">Las mejores ofertas de la semana. Stock limitado.</p>
          <button 
            onClick={() => {
              const section = document.getElementById('ofertas-del-dia');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-lg w-fit transition shadow-lg"
          >
            Ver Ofertas
          </button>
        </div>
      </div>

      {/* 2. TOP GAMES / RECOMENDADO PARA TI */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">⭐ Recomendado para ti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Mostramos solo los primeros 5 juegos como recomendados */}
          {games.slice(0, 5).map(game => (
            <Link to={`/game/${game.id}`} key={`rec-${game.id}`} className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg group relative">
              <img src={game.imageUrl} alt={game.title} className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition" />
              <div className="p-3 absolute bottom-0 bg-gradient-to-t from-gray-900 to-transparent w-full pt-10">
                <h3 className="font-bold text-white truncate">{game.title}</h3>
                <p className="text-blue-400 font-black">${game.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. CATÁLOGO PRINCIPAL (Filtros + Grid) */}
      <section className="flex flex-col md:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sticky top-28 shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Plataformas</h3>
            <ul className="space-y-2">
              {['All', 'Steam', 'Epic Games', 'Xbox', 'PlayStation'].map((platform) => (
                <li key={platform}>
                  <button 
                    onClick={() => handleFilter(platform)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                      activePlatform === platform ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {platform === 'All' ? 'Todos' : platform}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* GRID DE CATÁLOGO */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">{activePlatform === 'All' ? 'Catálogo Completo' : `Juegos para ${activePlatform}`}</h2>
            <span className="text-gray-400 text-sm">{filteredGames.length} resultados</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <Link to={`/game/${game.id}`} key={game.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-gray-500 hover:shadow-lg transition flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute top-2 left-2 bg-gray-900/80 backdrop-blur text-gray-200 text-xs font-bold px-2 py-1 rounded">{game.platform}</div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-blue-400">{game.title}</h3>
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-700">
                    <div>
                      <p className="text-xl font-black text-white">${game.price}</p>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(e, game)}
                      disabled={game.stock === 0}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg transition transform active:scale-95 ${game.stock === 0 ? 'bg-gray-700 text-gray-500' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
                    >
                      {game.stock === 0 ? 'X' : '🛒'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </section>


      {/* NUEVO: OFERTAS DEL DÍA */}
      {dailyDeals.length > 0 && (
        <section id="ofertas-del-dia" className="bg-gray-800 border border-red-500/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          {/* Acento visual rojo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 border-b border-gray-700 pb-4">
            <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500 flex items-center gap-3">
              🔥 Ofertas del Día
            </h2>
            
            {/* Reloj Contador */}
            <div className="flex items-center gap-3 mt-4 md:mt-0 bg-gray-900 px-6 py-2 rounded-xl border border-gray-700 shadow-inner">
              <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Termina en:</span>
              <div className="flex gap-2 font-mono text-xl font-black text-white">
                <span className="bg-gray-800 px-2 py-1 rounded text-red-400">{timeLeft.hours}</span>:
                <span className="bg-gray-800 px-2 py-1 rounded text-red-400">{timeLeft.minutes}</span>:
                <span className="bg-gray-800 px-2 py-1 rounded text-red-400">{timeLeft.seconds}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {dailyDeals.map(game => (
              <Link to={`/game/${game.id}`} key={`deal-${game.id}`} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                    -30%
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white leading-tight mb-2 truncate">{game.title}</h3>
                  <div className="mt-auto flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-sm font-bold">${game.originalPrice}</span>
                      <span className="text-3xl font-black text-red-400 leading-none">${game.price}</span>
                    </div>
                    <button onClick={(e) => handleAddToCart(e, game)} disabled={game.stock === 0} className={`w-12 h-12 flex items-center justify-center rounded-xl transition transform active:scale-95 shadow-lg ${game.stock === 0 ? 'bg-gray-700 text-gray-500' : 'bg-gradient-to-br from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white'}`}>
                      {game.stock === 0 ? 'X' : '🛒'}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      

      {/* 4. RANDOM KEYS Y BUNDLES (Sección estática estilo G2A) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/special/random" className="bg-gradient-to-br from-purple-900 to-gray-900 p-8 rounded-3xl border border-purple-500/30 flex items-center justify-between shadow-xl cursor-pointer hover:shadow-purple-900/50 transition">
  <div>
    <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Surprise!</span>
    <h3 className="text-3xl font-black text-white mb-2">Random Keys</h3>
    <p className="text-purple-200 mb-4">10 Random Premium Steam Keys.</p>
    <span className="text-2xl font-bold text-white">$4.99</span>
  </div>
  <div className="text-7xl">🎲</div>
</Link>

        <Link to="/special/fps" className="bg-gradient-to-br from-blue-900 to-gray-900 p-8 rounded-3xl border border-blue-500/30 flex items-center justify-between shadow-xl cursor-pointer hover:shadow-blue-900/50 transition">
  <div>
    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Exclusive</span>
    <h3 className="text-3xl font-black text-white mb-2">FPS Bundle</h3>
    <p className="text-blue-200 mb-4">Lleva 3 shooters AAA al precio de 1.</p>
    <span className="text-2xl font-bold text-white">$29.99</span>
  </div>
  <div className="text-7xl">🎯</div>
</Link>
      </section>

      {/* 5. BANNER INFERIOR PROMOCIONAL */}
      <section className="w-full bg-blue-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-xl overflow-hidden relative">
        <div className="absolute right-[-50px] opacity-10 text-[200px] leading-none pointer-events-none">🚀</div>
        <div className="z-10 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">¿Quieres vender tus Keys?</h2>
          <p className="text-blue-100 text-lg">Únete a nuestro programa de afiliados y gana dinero.</p>
        </div>
        <Link to="/affiliate" className="z-10">
  <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg">
    Más Información
  </button>
</Link>
      </section>

      {/* 6. SECCIÓN DE PREGUNTAS FRECUENTES (FAQ con Dropdowns) */}
      <section className="max-w-3xl mx-auto w-full pb-10">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center text-white font-semibold hover:bg-gray-750 transition"
              >
                {faq.q}
                <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openFaq === index && (
                <div className="px-6 py-4 bg-gray-800/50 text-gray-400 border-t border-gray-700">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Home;