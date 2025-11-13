import api from './index';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const authService = {
    login: async (userId, password) => {
        return api.post(`${API_URL}/login`, { userId, password });
    },
    register: async (userData) => {
        return api.post(`${API_URL}/user/register`, userData);
    },
    logout: async () => {
        return api.post(`${API_URL}/logout`);
    }
};