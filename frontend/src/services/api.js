import axios from 'axios';

// Creamos una instancia de axios con la URL base del backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Servicio para los juegos
export const getGames = async () => {
    const response = await api.get('/games');
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

export default api;