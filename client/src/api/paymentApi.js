import api from '../services/axios';

export const createPaymentIntent = (data) => api.post('/payments/create-intent', data);
export const createCheckoutSession = (data) => api.post('/payments/checkout-session', data);
export const confirmPayment = (data) => api.post('/payments/confirm', data);
export const getPayment = (paymentId) => api.get(`/payments/${paymentId}`);

export default { createPaymentIntent, createCheckoutSession, confirmPayment, getPayment };
