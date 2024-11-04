import {
  fetchUserProfile,
  updateUserProfile,
} from '../redux/thunks/userThunks';
import store from '../redux/store';

class UserViewModel {
  static async fetchProfile(userId) {
    try {
      const result = await store.dispatch(fetchUserProfile(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProfile(userData) {
    try {
      const result = await store.dispatch(updateUserProfile(userData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserViewModel;
