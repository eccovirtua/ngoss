import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Cálculos automáticos del e-commerce
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Si el usuario no ha iniciado sesión, lo mandamos a loguearse primero
    if (!localStorage.getItem('userId')) {
      navigate('/login');
    } else {
      navigate('/checkout'); // O la ruta de órdenes que vayas a usar
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-2xl shadow-xl max-w-md w-full">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-400 mb-6">¿Aún no sabes qué jugar? Explora nuestro catálogo de Keys.</p>
        <Link to="/home">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg transition w-full">
            Volver a la Tienda
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl px-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-100">Tu Carrito de Compras</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna Izquierda: Lista de Productos */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Tienes {totalItems} producto(s)</span>
            <button 
              onClick={clearCart}
              className="text-sm text-red-400 hover:text-red-300 font-semibold transition"
            >
              Vaciar Carrito
            </button>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="bg-gray-800 border border-gray-700 p-4 rounded-xl flex items-center justify-between gap-4 shadow-md">
              
              {/* Imagen y Detalles Clickeables */}
              <Link to={`/game/${item.id}`} className="flex items-center gap-4 group flex-1">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-16 h-20 object-cover rounded shadow group-hover:opacity-80 transition"
                />
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.platform}</p>
                  <p className="text-sm font-semibold text-blue-400 mt-1">${item.price} c/u</p>
                </div>
              </Link>

              {/* Selector de Cantidad e Indicador de Stock */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden border border-gray-600">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-500 font-bold transition text-white"
                  >
                    -
                  </button>
                  <span className="px-4 font-bold text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className={`px-3 py-1 font-bold transition text-white ${
                      item.quantity >= item.stock 
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  >
                    +
                  </button>
                </div>
                {item.quantity >= item.stock && (
                  <span className="text-[10px] text-amber-400 font-medium">Límite de stock</span>
                )}
              </div>

              {/* Precio Total por Item y Botón Eliminar */}
              <div className="flex items-center gap-4 min-w-[100px] justify-end">
                <span className="font-extrabold text-lg text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 p-2 text-xl transition"
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Columna Derecha: Resumen del Pedido (Lo que faltaba) */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-2xl h-fit shadow-xl flex flex-col gap-4">
          <h3 className="text-xl font-bold border-b border-gray-700 pb-3 text-gray-100">Resumen de Compra</h3>
          
          <div className="flex justify-between text-gray-300">
            <span>Subtotal ({totalItems} productos)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-gray-300">
            <span>Envío</span>
            <span className="text-green-400 font-semibold">Digital (Inmediato)</span>
          </div>

          <div className="border-t border-gray-700 pt-3 mt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-white">Total</span>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 transform active:scale-98 shadow-lg shadow-blue-900/40 text-center"
          >
            Proceder al Pago
          </button>

          <Link to="/home" className="text-center text-sm text-gray-400 hover:text-white transition mt-2 font-medium">
            ← Continuar comprando
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Cart;