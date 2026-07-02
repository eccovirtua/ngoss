import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'; // <-- CAMBIO 1: Importamos 'api' por defecto

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Ahora 'api' sí existe y puede hacer el POST
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('role', response.data.role);
      
      // Redirigir a la tienda
      navigate('/home');
      
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      // <-- CAMBIO 2: Mostramos el error en la interfaz usando el estado que ya tenías
      setError("Correo o contraseña incorrectos. Inténtalo de nuevo."); 
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Iniciar Sesión</h2>
      
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition duration-200">
          Entrar
        </button>
      </form>

      {/* Aquí se mostrará el mensaje si algo sale mal */}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}

      <div className="mt-6 text-center">
        <p className="text-gray-400">¿No tienes cuenta?</p>
        <Link to="/register" className="text-blue-400 hover:text-blue-300 font-semibold">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}

export default Login;