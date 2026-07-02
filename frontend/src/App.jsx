import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Páginas
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import GameDetail from './pages/GameDetail';
import BundleDetail from './pages/BundleDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyAccount from './pages/MyAccount';
import Affiliate from './pages/Affiliate';
import Admin from './pages/Admin';

// Contexto
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            
            {/* =========================================
                ZONA 1: RUTAS PÚBLICAS (Cualquiera entra)
                ========================================= */}
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/special/:type" element={<BundleDetail />} />
            <Route path="/cart" element={<Cart />} />


            {/* =========================================
                SOLO USUARIOS LOGEADOS
                ========================================= */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/affiliate" element={<Affiliate />} />
            </Route>


            {/* =========================================
                SOLO ROLE = ADMIN
                ========================================= */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>

          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;