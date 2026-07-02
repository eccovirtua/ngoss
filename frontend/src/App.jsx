import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import MyAccount from './pages/MyAccount';
import Affiliate from './pages/Affiliate';
import BundleDetail from './pages/BundleDetail';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Register from './pages/Register';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/affiliate" element={<Affiliate />} />
            <Route path="/special/:type" element={<BundleDetail />} />
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