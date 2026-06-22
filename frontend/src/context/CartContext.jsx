import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === game.id);
      if (existingItem) {
        // Si ya existe, validamos que no supere el stock disponible
        if (existingItem.quantity >= game.stock) return prevCart;
        return prevCart.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...game, quantity: 1 }];
    });
  };

  // Nueva función para actualizar la cantidad directamente (+ o -)
  const updateQuantity = (gameId, newQuantity) => {
    if (newQuantity < 1) return; // No permitimos cantidades menores a 1
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === gameId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (gameId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== gameId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};