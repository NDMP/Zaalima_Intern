import api from '../services/axios';

export const getDashboardStats = () => api.get('/admin/dashboard');
export const getUsers = (params = {}) => api.get('/admin/users', { params });
export const updateUserStatus = (userId, isActive) =>
  api.patch(`/admin/users/${userId}/status`, { isActive });
export const getVendors = (params = {}) => api.get('/admin/vendors', { params });
export const getStores = (params = {}) => api.get('/admin/stores', { params });
export const updateStoreStatus = (storeId, isActive) =>
  api.patch(`/admin/stores/${storeId}/status`, { isActive });

const adminApi = {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  getVendors,
  getStores,
  updateStoreStatus,
};

export default adminApi;
