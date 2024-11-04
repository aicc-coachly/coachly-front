import {
  fetchInbodyData,
  addInbodyData,
  updateInbodyData,
  deleteInbodyData,
} from '../redux/thunks/inbodyThunks';
import store from '../redux/store';

class InbodyViewModel {
  static async fetchInbodyData(userId) {
    try {
      const result = await store.dispatch(fetchInbodyData(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async addInbodyData(inbodyData) {
    try {
      const result = await store.dispatch(addInbodyData(inbodyData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateInbodyData(inbodyData) {
    try {
      const result = await store.dispatch(updateInbodyData(inbodyData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteInbodyData(inbodyId) {
    try {
      const result = await store.dispatch(deleteInbodyData(inbodyId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default InbodyViewModel;
