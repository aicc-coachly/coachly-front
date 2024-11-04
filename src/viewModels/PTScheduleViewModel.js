import {
  fetchPtSchedules,
  updatePtSchedule,
} from '../redux/thunks/ptScheduleThunks';
import store from '../redux/store';

class PTScheduleViewModel {
  static async fetchSchedules(userId) {
    try {
      const result = await store.dispatch(fetchPtSchedules(userId));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateSchedule(scheduleData) {
    try {
      const result = await store.dispatch(updatePtSchedule(scheduleData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default PTScheduleViewModel;
