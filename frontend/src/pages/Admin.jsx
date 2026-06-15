import { useState, useEffect } from 'react';
import { createGame, getGames, deleteGame } from '../services/api';

function Admin() {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Steam');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  
  // Nuevo estado para guardar la lista de juegos
  const [games, setGames] = useState([]);

  const RAWG_API_KEY = 'ace5380f59954894a4e28bcdc5056861'; 

  // Función para cargar los juegos desde el backend
  const fetchGames = async () => {
    try {
      const data = await getGames();
      setGames(data);
    } catch (error) {
      console.error("Error al cargar juegos", error);
    }
  };

  // Se ejecuta automáticamente al abrir la página
  useEffect(() => {
    fetchGames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Buscando carátula y guardando...');

    try {
      const rawgResponse = await fetch(`https://api.rawg.io/api/games?search=${title}&key=${RAWG_API_KEY}`);
      const rawgData = await rawgResponse.json();

      let imageUrl = 'https://via.placeholder.com/300x400?text=Sin+Imagen';

      if (rawgData.results && rawgData.results.length > 0) {
        imageUrl = rawgData.results[0].background_image;
      }

      const newGame = {
        title: title,
        platform: platform,
        price: parseFloat(price),
        stock: parseInt(stock),
        imageUrl: imageUrl
      };

      await createGame(newGame);
      setMessage(`¡Éxito! "${title}" añadido al catálogo.`);
      
      // Limpiar formulario y recargar la lista de juegos
      setTitle('');
      setPrice('');
      setStock('');
      fetchGames(); 

    } catch (error) {
      console.error(error);
      setMessage('Hubo un error al guardar el juego.');
    }
  };

  // Función para manejar el botón de eliminar
  const handleDelete = async (id, gameTitle) => {
    // Pequeña alerta de confirmación para evitar borrados accidentales
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${gameTitle}"?`)) {
      try {
        await deleteGame(id);
        setMessage(`"${gameTitle}" ha sido eliminado.`);
        fetchGames(); // Recargamos la lista para que desaparezca
      } catch (error) {
        console.error("Error al eliminar", error);
        setMessage('No se pudo eliminar el juego.');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8 mt-10">
      
      {/* Columna Izquierda: Formulario (Mismo que antes) */}
      <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-2xl shadow-xl h-fit">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Añadir Juego</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Título del Juego</label>
            <input 
              type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
              className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. The Witcher 3"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Plataforma</label>
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Steam">Steam</option>
              <option value="Epic Games">Epic Games</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-400 text-sm mb-1">Precio ($)</label>
              <input 
                type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required
                className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-400 text-sm mb-1">Stock</label>
              <input 
                type="number" value={stock} onChange={(e) => setStock(e.target.value)} required
                className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition duration-200">
            Añadir al Catálogo
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-400 font-semibold">{message}</p>}
      </div>

      {/* Columna Derecha: Lista de Juegos Activos */}
      <div className="w-full md:w-1/2 bg-gray-800 p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[600px]">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-400">Gestión de Inventario</h2>
        
        {games.length === 0 ? (
          <p className="text-center text-gray-400">No hay juegos en el catálogo.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {games.map((game) => (
              <div key={game.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={game.imageUrl} alt={game.title} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <h4 className="font-bold">{game.title}</h4>
                    <p className="text-sm text-gray-400">{game.platform} - Stock: {game.stock}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(game.id, game.title)}
                  className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded font-bold text-sm transition"
                >
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default Admin;