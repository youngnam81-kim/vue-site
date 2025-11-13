import axios from 'axios';

// 환경 변수 VITE_API_BASE_URL 사용
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  // 사용자 목록 조회
  getUsers() {
    return axios.get(`${API_URL}/users`);
  },

  // 특정 사용자 조회
  getUser(userId) {
    return axios.get(`${API_URL}/users/${userId}`);
  },

  // 로그인 기능
  login(userId, password) {
    return axios.post(`${API_URL}/login`, {
      userId,
      password
    });
  }
};