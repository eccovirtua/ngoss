import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      setSuccess('¡Cuenta creada con éxito! Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data || 'Error al crear la cuenta');
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Crear Cuenta</h2>
      
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Tu Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 bg-gray-700 rounded outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          Registrarse
        </button>
      </form>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      {success && <p className="mt-4 text-center text-green-400">{success}</p>}

      <div className="mt-6 text-center">
        <p className="text-gray-400">¿Ya tienes cuenta?</p>
        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
          Inicia Sesión aquí
        </Link>
      </div>
    </div>
  );
}

export default Register;