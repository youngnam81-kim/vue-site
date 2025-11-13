import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:8080/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터
api.interceptors.response.use(response => {
    return response;
}, error => {
    console.error("API Error:", error.response || error.message);
    if (error.response && error.response.status === 401) {
        // 인증 오류 처리
    }
    return Promise.reject(error);
});

export default api;