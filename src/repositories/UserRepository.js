import axios from 'axios';

const UserRepository = {
  getUserProfile: (userId) => axios.get(`/api/user/profile/${userId}`),
  updateUserProfile: (userData) =>
    axios.put(`/api/user/profile/${userData.id}`, userData),
};

export default UserRepository;
