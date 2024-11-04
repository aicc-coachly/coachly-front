import {
  fetchPaymentHistory,
  initiatePayment,
  completePayment,
} from '../redux/thunks/paymentThunks';
import store from '../redux/store';

class PaymentViewModel {
  // 결제 내역 조회
  static async fetchPaymentHistory() {
    try {
      const result = await store.dispatch(fetchPaymentHistory());
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 결제 생성
  static async initiatePayment(paymentData) {
    try {
      const result = await store.dispatch(initiatePayment(paymentData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 결제 완료 처리
  static async completePayment(paymentNumber) {
    try {
      const result = await store.dispatch(completePayment(paymentNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default PaymentViewModel;
