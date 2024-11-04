import {
  fetchTrainerProfile,
  updateTrainerProfile,
} from '../redux/thunks/trainerThunks';
import store from '../redux/store';

class TrainerViewModel {
  static async fetchProfile(trainerId) {
    try {
      const result = await store.dispatch(fetchTrainerProfile(trainerId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateProfile(profileData) {
    try {
      const result = await store.dispatch(updateTrainerProfile(profileData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TrainerViewModel;
