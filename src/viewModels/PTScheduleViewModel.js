import {
  fetchPtSchedules,
  createPtSchedule,
  completePtSchedule,
  completePaycheck,
  updatePtSchedule,
  deletePtSchedule,
} from '../redux/thunks/ptScheduleThunks';
import store from '../redux/store';

class PTScheduleViewModel {
  // 모든 PT 일정 조회
  static async fetchSchedules() {
    try {
      const result = await store.dispatch(fetchPtSchedules());
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // PT 일정 생성
  static async createSchedule(scheduleData) {
    try {
      const result = await store.dispatch(createPtSchedule(scheduleData));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // PT 일정 완료 처리
  static async completeSchedule(scheduleNumber) {
    try {
      const result = await store.dispatch(completePtSchedule(scheduleNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // 페이 체크 완료 처리
  static async completePaycheck(paycheckNumber) {
    try {
      const result = await store.dispatch(completePaycheck(paycheckNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // PT 일정 수정
  static async updateSchedule(scheduleNumber, scheduleData) {
    try {
      const result = await store.dispatch(
        updatePtSchedule({ scheduleNumber, scheduleData })
      );
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // PT 일정 삭제
  static async deleteSchedule(scheduleNumber) {
    try {
      const result = await store.dispatch(deletePtSchedule(scheduleNumber));
      return result.payload;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default PTScheduleViewModel;

