import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 pt-12 pb-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
        
        {/* Columna 1: Branding */}
        <div>
          <h4 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            MeliKeys
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tu bóveda de confianza. Las mejores ofertas en keys de videojuegos con entrega inmediata, precios imbatibles y garantía del 100%.
          </p>
        </div>

        {/* Columna 2: Enlaces */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white transition">Sobre Nosotros (About)</Link></li>
            <li><Link to="#" className="hover:text-white transition">Términos y Condiciones</Link></li>
            <li><Link to="#" className="hover:text-white transition">Centro de Soporte</Link></li>
          </ul>
        </div>

        {/* Columna 3: Compra Segura */}
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Compra 100% Segura</h4>
          <p className="text-gray-400 text-sm mb-4">Pagos encriptados con tecnología SSL.</p>
          <div className="flex justify-center md:justify-start gap-4 text-3xl">
            <span title="Visa" className="grayscale hover:grayscale-0 transition">💳</span>
            <span title="MasterCard" className="grayscale hover:grayscale-0 transition">🪙</span>
            <span title="PayPal" className="grayscale hover:grayscale-0 transition">🅿️</span>
            <span title="Protección Total" className="grayscale hover:grayscale-0 transition">🛡️</span>
          </div>
        </div>

      </div>
      
      <div className="text-center text-gray-600 text-sm border-t border-gray-800 pt-8">
        &copy; {new Date().getFullYear()} MeliKeys. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;