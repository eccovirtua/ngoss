import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  
  // Calculamos el total de items (sumando las cantidades de cada juego)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center shadow-lg border-b border-gray-700 fixed top-0 z-50">
      <Link to="/home" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        MeliKeys
      </Link>
      
      <div className="flex items-center gap-6">
        <Link to="/home" className="text-gray-300 hover:text-white font-semibold transition">Catálogo</Link>
        
        {/* Ícono del Carrito con animación cuando tiene items */}
        <Link to="/cart" className="relative cursor-pointer hover:scale-105 transition-transform block">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                 {totalItems}
                </span>
            )}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;