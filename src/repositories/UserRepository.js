import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const UserRepository = {
  getUserProfile: (userId) => axios.get(`${url}/page/${userId}`),
  updateUserProfile: (userData) =>
    axios.put(`/api/user/profile/${userData.id}`, userData),
};

export default UserRepository;
