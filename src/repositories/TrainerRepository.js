import axios from 'axios';

const TrainerRepository = {
  getProfile: (trainerId) => axios.get(`/api/trainer/${trainerId}`),
  updateProfile: (profileData) =>
    axios.put(`/api/trainer/${profileData.id}`, profileData),
};

export default TrainerRepository;
