import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ecommerce-backend-nine-lyart.vercel.app',
});

export default api;
