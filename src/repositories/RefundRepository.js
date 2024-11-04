import axios from 'axios';

const RefundRepository = {
  getRefunds: (userId) => axios.get(`/api/refunds/${userId}`),
  requestRefund: (refundData) => axios.post('/api/refunds', refundData),
};

export default RefundRepository;
