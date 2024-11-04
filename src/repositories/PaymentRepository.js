import axios from 'axios';

const PaymentRepository = {
  // 결제 내역 조회
  getPaymentHistory: () => axios.get('/pt-payments'),

  // 결제 생성
  initiatePayment: (paymentData) => axios.post('/pt-payments', paymentData),

  // 결제 완료 처리
  completePayment: (paymentNumber) =>
    axios.post(`/pt-payments/${paymentNumber}/completed`),
};

export default PaymentRepository;
