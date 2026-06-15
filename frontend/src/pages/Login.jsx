import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook de React Router para cambiar de página mediante código
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    
    try {
      // Llamamos a nuestro archivo api.js, que a su vez llama a Spring Boot
      const user = await loginUser({ username, password });
      
      // Si el login es exitoso, guardamos el ID del usuario
      localStorage.setItem('userId', user.id);
      
      // Redirigimos a la tienda
      navigate('/home');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h2>Iniciar Sesión en KeyVault</h2>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Usuario (ej. gamer123)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: '10px', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Contraseña (ej. password123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Entrar</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </div>
  );
}

export default Login;