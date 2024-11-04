import axios from 'axios';

const PaymentRepository = {
  getPaymentHistory: (userId) => axios.get(`/api/payments/history/${userId}`),
  initiatePayment: (paymentData) =>
    axios.post('/api/payments/initiate', paymentData),
  cancelPayment: (paymentId) => axios.delete(`/api/payments/${paymentId}`),
};

export default PaymentRepository;
