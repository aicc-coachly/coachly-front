import {
  fetchAllRefunds,
  fetchRefund,
  createRefund,
  updateRefund,
  deleteRefund,
} from '../redux/thunks/refundThunks';
import store from '../redux/store';

class RefundViewModel {
  // 모든 환불 사유 조회
  static async fetchAllRefunds() {
    try {
      const result = await store.dispatch(fetchAllRefunds());
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 특정 환불 사유 조회
  static async fetchRefund(refundNumber) {
    try {
      const result = await store.dispatch(fetchRefund(refundNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 환불 사유 생성
  static async createRefund(refundData) {
    try {
      const result = await store.dispatch(createRefund(refundData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 환불 사유 수정
  static async updateRefund(refundNumber, refundData) {
    try {
      const result = await store.dispatch(
        updateRefund({ refundNumber, refundData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 환불 사유 삭제
  static async deleteRefund(refundNumber) {
    try {
      const result = await store.dispatch(deleteRefund(refundNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default RefundViewModel;
