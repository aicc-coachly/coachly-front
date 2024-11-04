import axios from 'axios';

const PTScheduleRepository = {
  getSchedules: (userId) => axios.get(`/api/schedules/${userId}`),
  updateSchedule: (scheduleData) =>
    axios.put(`/api/schedules/${scheduleData.id}`, scheduleData),
};

export default PTScheduleRepository;
