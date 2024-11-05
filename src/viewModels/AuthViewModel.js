import {
  loginUser,
  registerUser,
  loginTrainer,
  registerTrainer,
} from '../redux/thunks/authThunks';
import { logoutUser, logoutTrainer } from '../redux/slices/authSlice';
import store from '../redux/store';

class AuthViewModel {
  // 회원용 메서드
  static async loginUser(credentials) {
    try {
      const result = await store.dispatch(loginUser(credentials));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async registerUser(userData) {
    try {
      const result = await store.dispatch(registerUser(userData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너용 메서드
  static async loginTrainer(credentials) {
    try {
      const result = await store.dispatch(loginTrainer(credentials));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async registerTrainer(trainerData) {
    try {
      const result = await store.dispatch(registerTrainer(trainerData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 회원 로그아웃
  static logoutUser() {
    store.dispatch(logoutUser());
  }

  // 트레이너 로그아웃
  static logoutTrainer() {
    store.dispatch(logoutTrainer());
  }
}

export default AuthViewModel;
