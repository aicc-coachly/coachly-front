import { fetchRefunds, requestRefund } from '../redux/thunks/refundThunks';
import store from '../redux/store';

class RefundViewModel {
  static async fetchRefunds(userId) {
    try {
      const result = await store.dispatch(fetchRefunds(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async requestRefund(refundData) {
    try {
      const result = await store.dispatch(requestRefund(refundData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default RefundViewModel;
