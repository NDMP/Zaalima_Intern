import api from '../services/axios';

export const getProducts = (params = {}) => api.get('/products', { params });
export const getProduct = (productId) => api.get(`/products/${productId}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (productId, data) => api.patch(`/products/${productId}`, data);
export const deleteProduct = (productId) => api.delete(`/products/${productId}`);
export const updateInventory = (productId, stock) =>
  api.patch(`/products/${productId}/inventory`, { stock });

export default { getProducts, getProduct, createProduct, updateProduct, deleteProduct, updateInventory };
