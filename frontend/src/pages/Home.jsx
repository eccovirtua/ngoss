import { useEffect, useState } from 'react';
import { getGames } from '../services/api';

function Home() {
  const [games, setGames] = useState([]);

  // useEffect se ejecuta automáticamente al abrir esta pantalla
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data); // Guardamos la lista de juegos en el estado de React
      } catch (error) {
        console.error("Error al cargar los juegos", error);
      }
    };
    
    fetchGames();
  }, []); // El arreglo vacío indica que solo se ejecute una vez

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>Catálogo de Juegos</h2>
      
      {/* Contenedor de las tarjetas de juegos */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {games.map(game => (
          <div key={game.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '220px', textAlign: 'center' }}>
            <img 
              src={game.imageUrl} 
              alt={game.title} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} 
            />
            <h3 style={{ margin: '10px 0' }}>{game.title}</h3>
            <p style={{ margin: '5px 0', color: '#666' }}>{game.platform}</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>${game.price}</p>
            <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>Stock: {game.stock}</p>
            
            <button style={{ marginTop: '10px', padding: '8px 15px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;