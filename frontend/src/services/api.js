import axios from 'axios';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${DEFAULT_API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('watchparty_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      !originalRequest._fallbackTried &&
      (error.code === 'ERR_NETWORK' || error.response?.status === 404) &&
      originalRequest.baseURL?.includes(':5000')
    ) {
      originalRequest._fallbackTried = true;
      originalRequest.baseURL = originalRequest.baseURL.replace(':5000', ':5001');
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () =>
    api.get('/auth/me')
};

export const roomAPI = {
  create: (data) =>
    api.post('/rooms', data),
  get: (roomId) =>
    api.get(`/rooms/${roomId}`),
  getAll: () =>
    api.get('/rooms'),
  sendInvite: (roomId, recipientEmail, inviterName) =>
    api.post(`/rooms/${roomId}/invite`, { recipientEmail, inviterName })
};

export default api;