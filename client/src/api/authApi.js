import api from '../services/axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });
export const getCurrentUser = () => api.get('/auth/me');

export default { login, register, forgotPassword, resetPassword, getCurrentUser };
