import {
  fetchTrainerProfile,
  fetchTrainerPtAmount,
  fetchTrainerGymAddress,
  fetchTrainerAccount,
  updateTrainerProfile,
  updateTrainerAddress,
  updateTrainerPtAmount,
  updateTrainerAccount,
  deleteTrainer,
  deleteTrainerPtAmount,
  deleteTrainerGymAddress,
  deleteTrainerAccount,
} from '../redux/thunks/trainerThunks';
import store from '../redux/store';

class TrainerViewModel {
  // 트레이너 프로필 조회
  static async fetchProfile(trainerId) {
    try {
      const result = await store.dispatch(fetchTrainerProfile(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 PT 가격 정보 조회
  static async fetchPtAmount(trainerId) {
    try {
      const result = await store.dispatch(fetchTrainerPtAmount(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 헬스장 주소 조회
  static async fetchGymAddress(trainerId) {
    try {
      const result = await store.dispatch(fetchTrainerGymAddress(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 계좌 정보 조회
  static async fetchAccount(trainerId) {
    try {
      const result = await store.dispatch(fetchTrainerAccount(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 정보 업데이트
  static async updateProfile(trainerId, profileData) {
    try {
      const result = await store.dispatch(
        updateTrainerProfile({ trainerId, profileData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 주소 업데이트
  static async updateAddress(trainerId, addressData) {
    try {
      const result = await store.dispatch(
        updateTrainerAddress({ trainerId, addressData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 PT 가격 정보 업데이트
  static async updatePtAmount(trainerId, ptAmountData) {
    try {
      const result = await store.dispatch(
        updateTrainerPtAmount({ trainerId, ptAmountData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 계좌 정보 업데이트
  static async updateAccount(trainerId, accountData) {
    try {
      const result = await store.dispatch(
        updateTrainerAccount({ trainerId, accountData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 소프트 삭제
  static async deleteTrainer(trainerId) {
    try {
      const result = await store.dispatch(deleteTrainer(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 PT 가격 정보 소프트 삭제
  static async deletePtAmount(trainerId) {
    try {
      const result = await store.dispatch(deleteTrainerPtAmount(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 헬스장 주소 소프트 삭제
  static async deleteGymAddress(trainerId) {
    try {
      const result = await store.dispatch(deleteTrainerGymAddress(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 트레이너 계좌 정보 소프트 삭제
  static async deleteAccount(trainerId) {
    try {
      const result = await store.dispatch(deleteTrainerAccount(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TrainerViewModel;
