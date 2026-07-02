import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../services/api';

function MyAccount() {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const data = await getPurchases(userId);
        setPurchases(data);
      } catch (error) {
        console.error("Error cargando historial", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) return <div className="text-center mt-20 text-xl text-white">Cargando tu bóveda...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 mt-10">
      
      {/* Cabecera del Perfil */}
      <div className="bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700 flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
            👤
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Mi Cuenta</h2>
            <p className="text-gray-400 text-sm">Gestiona tus compras y claves de activación</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/50 font-bold py-2 px-6 rounded-xl transition"
        >
          Cerrar Sesión
        </button>
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-4">Historial de Keys Compradas</h3>

      {purchases.length === 0 ? (
        <div className="text-center py-16 bg-gray-800 rounded-2xl border border-gray-700">
          <span className="text-5xl block mb-4">🕸️</span>
          <p className="text-gray-400 text-lg">Aún no tienes juegos en tu biblioteca.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-gray-800 border border-gray-700 p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gray-500 transition">
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img src={purchase.imageUrl} alt={purchase.gameTitle} className="w-16 h-20 object-cover rounded shadow-md" />
                <div>
                  <h4 className="font-bold text-lg text-white">{purchase.gameTitle}</h4>
                  <p className="text-xs text-gray-500">
                    Comprado el: {new Date(purchase.purchaseDate).toLocaleDateString()} a las {new Date(purchase.purchaseDate).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="bg-gray-900 border border-dashed border-blue-500 px-6 py-3 rounded-lg text-center w-full md:w-auto shadow-inner">
                <span className="text-xs text-blue-400 block mb-1 uppercase tracking-widest font-bold">Steam Key</span>
                <span className="font-mono text-xl tracking-widest text-white select-all">{purchase.key}</span>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyAccount;