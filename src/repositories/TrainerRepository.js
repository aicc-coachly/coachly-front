import axios from "axios";
const url = process.env.REACT_APP_API_URL;

const TrainerRepository = {
  getProfile: (trainerId) => axios.get(`${url}/trainer/${trainerId}`),
  updateProfile: (profileData) =>
    axios.put(`/api/trainer/${profileData.id}`, profileData),
};

export default TrainerRepository;
