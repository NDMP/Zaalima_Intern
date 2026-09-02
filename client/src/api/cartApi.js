import api from '../services/axios';

export const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity = 1) =>
  api.post('/cart/items', { productId, quantity });
export const updateCartItem = (productId, quantity) =>
  api.patch(`/cart/items/${productId}`, { quantity });
export const removeFromCart = (productId) => api.delete(`/cart/items/${productId}`);
export const clearCart = () => api.delete('/cart');

export default { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
