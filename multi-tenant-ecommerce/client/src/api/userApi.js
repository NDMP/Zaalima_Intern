import api from '../services/axios';

export const getProfile = () => api.get('/users/profile');
export const updateProfile = (data) => api.patch('/users/profile', data);
export const changePassword = (currentPassword, newPassword) =>
  api.patch('/users/password', { currentPassword, newPassword });
export const getUser = (userId) => api.get(`/users/${userId}`);

export default { getProfile, updateProfile, changePassword, getUser };
