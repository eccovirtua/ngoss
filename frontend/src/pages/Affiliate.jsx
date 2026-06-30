import { useState } from 'react';
import { Link } from 'react-router-dom';

function Affiliate() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí en el futuro podrías enviar esto a tu backend, por ahora solo mostramos el éxito
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-6 mt-10">
      <div className="bg-gray-800 border border-gray-700 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 text-[150px] opacity-5 pointer-events-none">🤝</div>

        {isSubmitted ? (
          <div className="text-center py-10 animate-fade-in-down">
            <div className="text-7xl mb-6">✅</div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
              ¡Enviado con éxito!
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Hemos recibido tu solicitud. Te estaremos avisando por correo electrónico sobre los siguientes pasos para unirte a nuestro programa de afiliados.
            </p>
            <Link to="/home">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl transition">
                Volver a la Tienda
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-4xl font-black text-white mb-4">Únete a MeliKeys</h2>
              <p className="text-gray-400 text-lg">
                Convierte tu pasión por los videojuegos en ingresos. Vende keys y gana comisiones por cada transacción exitosa.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Nombre Completo</label>
                <input type="text" required className="w-full bg-gray-900 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder="Ej. John Doe" />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">Correo Electrónico</label>
                <input type="email" required className="w-full bg-gray-900 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition" placeholder="tu@correo.com" />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wider">¿Tienes experiencia vendiendo?</label>
                <textarea required rows="4" className="w-full bg-gray-900 text-white p-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none" placeholder="Cuéntanos un poco sobre ti..."></textarea>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition transform active:scale-95 shadow-lg text-lg mt-4">
                Enviar Solicitud
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Affiliate;