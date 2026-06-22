import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import GameDetail from './pages/GameDetail';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;