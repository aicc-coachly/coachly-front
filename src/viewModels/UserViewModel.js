import {
  fetchUserProfile,
  fetchUserInbody,
  fetchUserPage,
  postUserInbody,
  updateUserProfile,
  updateUserAddress,
  updateUserInbody,
  deleteUser,
  deleteUserInbody,
  deleteUserAddress,
} from '../redux/thunks/userThunks';
import store from '../redux/store';

class UserViewModel {
  // 사용자 프로필 조회
  static async fetchProfile(userId) {
    try {
      const result = await store.dispatch(fetchUserProfile(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 페이지 정보 조회
  static async fetchUserPage(userId) {
    try {
      const result = await store.dispatch(fetchUserPage(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 인바디 정보 조회
  static async fetchUserInbody(userId) {
    try {
      const result = await store.dispatch(fetchUserInbody(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 인바디 정보 저장
  static async postUserInbody(inbodyData) {
    try {
      const result = await store.dispatch(postUserInbody(inbodyData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 기본 정보 업데이트
  static async updateProfile(userId, userData) {
    try {
      const result = await store.dispatch(
        updateUserProfile({ userId, userData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 주소 정보 업데이트
  static async updateUserAddress(userId, addressData) {
    try {
      const result = await store.dispatch(
        updateUserAddress({ userId, addressData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 인바디 정보 업데이트
  static async updateUserInbody(userId, inbodyData) {
    try {
      const result = await store.dispatch(
        updateUserInbody({ userId, inbodyData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 소프트 삭제
  static async deleteUser(userId) {
    try {
      const result = await store.dispatch(deleteUser(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 인바디 정보 소프트 삭제
  static async deleteUserInbody(userId) {
    try {
      const result = await store.dispatch(deleteUserInbody(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 사용자 주소 정보 소프트 삭제
  static async deleteUserAddress(userId) {
    try {
      const result = await store.dispatch(deleteUserAddress(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default UserViewModel;
