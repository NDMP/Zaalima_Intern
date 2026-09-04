import api from '../services/axios';

export const getCategories = (params = {}) => api.get('/categories', { params });
export const getCategory = (categoryId) => api.get(`/categories/${categoryId}`);
export const createCategory = (data) => api.post('/categories', data);
export const updateCategory = (categoryId, data) => api.patch(`/categories/${categoryId}`, data);
export const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);

export default { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
