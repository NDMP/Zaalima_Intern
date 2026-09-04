import api from '../services/axios';

export const getWishlist = () => api.get('/wishlist');
export const addToWishlist = (productId) => api.post('/wishlist', { productId });
export const removeFromWishlist = (productId) => api.delete(`/wishlist/${productId}`);
export const clearWishlist = () => api.delete('/wishlist');

export default { getWishlist, addToWishlist, removeFromWishlist, clearWishlist };
