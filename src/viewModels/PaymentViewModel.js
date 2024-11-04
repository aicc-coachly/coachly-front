import {
  fetchPaymentHistory,
  initiatePayment,
  cancelPayment,
} from '../redux/thunks/paymentThunks';
import store from '../redux/store';

class PaymentViewModel {
  static async fetchPaymentHistory(userId) {
    try {
      const result = await store.dispatch(fetchPaymentHistory(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async initiatePayment(paymentData) {
    try {
      const result = await store.dispatch(initiatePayment(paymentData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async cancelPayment(paymentId) {
    try {
      const result = await store.dispatch(cancelPayment(paymentId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default PaymentViewModel;
