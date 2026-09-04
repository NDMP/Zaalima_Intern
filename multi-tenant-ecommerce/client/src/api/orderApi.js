import api from '../services/axios';

export const createOrder = (data) => api.post('/orders', data);
export const getOrders = (params = {}) => api.get('/orders', { params });
export const getOrder = (orderId) => api.get(`/orders/${orderId}`);
export const updateOrderStatus = (orderId, status) =>
  api.patch(`/orders/${orderId}/status`, { status });
export const cancelOrder = (orderId) => api.patch(`/orders/${orderId}/cancel`);

export default { createOrder, getOrders, getOrder, updateOrderStatus, cancelOrder };
