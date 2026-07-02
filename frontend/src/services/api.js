import axios from 'axios';

// Creamos una instancia de axios con la URL base del backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use(
  (config) => {
    // 1. Buscamos si hay un token guardado en el navegador
    const token = localStorage.getItem('token');
    
    // 2. Si hay token, lo metemos en la mochila (Headers) de la petición
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio para los juegos
export const getGames = async () => {
    const response = await api.get('/games');
    return response.data;
};

// Servicio para registrar usuario
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Servicio para el login
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// Servicio para comprar
export const createOrder = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

// Servicio para el historial
export const getOrders = async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;

    
};

// Servicio para guardar un nuevo juego
export const createGame = async (gameData) => {
    const response = await api.post('/games', gameData);
    return response.data;
};
// Servicio para eliminar un juego
export const deleteGame = async (id) => {
    const response = await api.delete(`/games/${id}`);
    return response.data;
};
// Servicio para obtener un solo juego por su ID
export const getGameById = async (id) => {
    const response = await api.get(`/games/${id}`);
    return response.data;
};

// Servicio para procesar el pago y obtener las keys
export const processCheckout = async (cartData, userId) => {
    const payload = cartData.map(item => ({ id: item.id, quantity: item.quantity }));
    const response = await api.post(`/games/checkout/${userId}`, payload);
    return response.data;
};

export const getPurchases = async (userId) => {
    const response = await api.get(`/games/purchases/${userId}`);
    return response.data;
};

export default api;