import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { processCheckout } from '../services/api';

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedKeys, setPurchasedKeys] = useState([]);
  const [error, setError] = useState('');

  // Si el usuario entra aquí sin items en el carrito (y no acaba de comprar)
  if (cart.length === 0 && purchasedKeys.length === 0) {
    return (
      <div className="text-center p-10 mt-20">
        <h2 className="text-2xl font-bold text-white mb-4">No hay nada que pagar</h2>
        <button onClick={() => navigate('/home')} className="bg-blue-600 px-6 py-2 rounded text-white font-bold">
          Volver a la tienda
        </button>
      </div>
    );
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    console.log("🔴 1. Botón presionado. Iniciando pago...");
    setIsProcessing(true);
    setError('');

    // SE CORRIGIÓ EL DOBLE TRY AQUÍ
    try {
      // 1. Obtener el ID del localstorage
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        setError('Debes iniciar sesión para comprar');
        setIsProcessing(false);
        return;
      }
      
      console.log("🟠 2. Enviando datos al backend...", cart);
      const keys = await processCheckout(cart, userId);      
      console.log("🟡 3. Respuesta exitosa recibida del backend:", keys);
      
      setTimeout(() => {
        console.log("🟢 4. Finalizando simulación y mostrando keys.");
        setPurchasedKeys(keys);
        clearCart();
        setIsProcessing(false);
      }, 2000);

    } catch (err) {
      console.error("❌ ERROR ATRAPADO EN EL CATCH:", err);
      setIsProcessing(false); 

      let errorMessage = "Error de conexión o de servidor.";
      if (err.response && err.response.data) {
        errorMessage = typeof err.response.data === 'string' 
          ? err.response.data 
          : err.response.data.message || errorMessage;
      }
      setError(errorMessage);
    }
  };

  // ESTADO 3: PANTALLA DE ÉXITO Y ENTREGA DE KEYS
  if (purchasedKeys.length > 0) {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 mt-10">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl border border-green-500/30 text-center">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-400 mb-8">Aquí tienes las claves de activación de tus juegos. ¡Que lo disfrutes!</p>

          <div className="space-y-4 mb-8 text-left">
            {purchasedKeys.map((item, index) => (
              <div key={index} className="bg-gray-900 border border-gray-700 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.title} className="w-12 h-16 object-cover rounded shadow" />
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                </div>
                <div className="bg-gray-800 border border-dashed border-blue-500 px-4 py-2 rounded text-center">
                  <span className="text-xs text-blue-400 block mb-1 uppercase tracking-widest font-bold">Steam Key</span>
                  <span className="font-mono text-xl tracking-widest text-white">{item.key}</span>
                </div>
              </div>
            ))}
          </div>

          <Link to="/home">
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-xl transition w-full">
              Volver al Catálogo
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ESTADO 1 y 2: FORMULARIO DE PAGO O SPINNER DE CARGA
  return (
    <div className="w-full max-w-xl mx-auto px-6 mt-10">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Pasarela de Pago</h2>

      <div className="bg-gray-800 border border-gray-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Overlay de Carga (Spinner) */}
        {isProcessing && (
          <div className="absolute inset-0 bg-gray-900/90 z-10 flex flex-col items-center justify-center backdrop-blur-sm transition-all">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-white animate-pulse">Procesando pago...</h3>
            <p className="text-gray-400 text-sm mt-2">Generando claves criptográficas</p>
          </div>
        )}

        <div className="mb-6 border-b border-gray-700 pb-6">
          <h3 className="text-lg text-gray-400 mb-2">Total a pagar:</h3>
          <p className="text-5xl font-black text-white">${subtotal.toFixed(2)}</p>
        </div>

        {/* Simulación de tarjeta */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Número de Tarjeta</label>
            <input type="text" value="•••• •••• •••• 4242" readOnly className="w-full bg-gray-900 text-gray-400 p-3 rounded border border-gray-700 cursor-not-allowed font-mono" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">Vencimiento</label>
              <input type="text" value="12/28" readOnly className="w-full bg-gray-900 text-gray-400 p-3 rounded border border-gray-700 cursor-not-allowed font-mono" />
            </div>
            <div className="w-1/2">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-1 block">CVC</label>
              <input type="text" value="•••" readOnly className="w-full bg-gray-900 text-gray-400 p-3 rounded border border-gray-700 cursor-not-allowed font-mono" />
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition transform active:scale-95 text-lg shadow-lg"
        >
          Pagar Ahora
        </button>
      </div>
    </div>
  );
}

export default Checkout;