import api from '../services/axios';

export const getStores = (params = {}) => api.get('/stores', { params });
export const getStore = (storeId) => api.get(`/stores/${storeId}`);
export const createStore = (data) => api.post('/stores', data);
export const updateStore = (storeId, data) => api.patch(`/stores/${storeId}`, data);
export const deleteStore = (storeId) => api.delete(`/stores/${storeId}`);

export default { getStores, getStore, createStore, updateStore, deleteStore };
