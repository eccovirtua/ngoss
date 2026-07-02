import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export function AdminRoute() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log("AdminRoute verificando -> Token:", token, " | Rol:", role);

  // 1. Si NO hay token (está vacío, es null, o undefined)
  if (!token || token === 'undefined' || token === 'null') {
    console.log("Bloqueado: No hay sesión. Redirigiendo a /");
    return <Navigate to="/" replace />;
  }

  // 2. Si hay token pero NO es admin (Aceptamos "ADMIN" o "admin" por si acaso)
  if (role !== 'ADMIN' && role !== 'admin') {
    console.log("Bloqueado: Es usuario normal. Redirigiendo a /home");
    return <Navigate to="/home" replace />;
  }

  // 3. Es admin válido
  console.log("Permitido: ¡Es el Jefe! Entrando a /admin");
  return <Outlet />;
}