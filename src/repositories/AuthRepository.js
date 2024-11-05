import axios from 'axios';

const AuthRepository = {
  // 회원용 엔드포인트
  loginUser: (credentials) => axios.post('/user/login', credentials),
  registerUser: (userData) => axios.post('/user/signup', userData),

  // 트레이너용 엔드포인트
  loginTrainer: (credentials) =>
    axios.post(`${url}/trainer/login`, credentials),
  registerTrainer: (trainerData) =>
    axios.post(`${url}/trainer/signup`, trainerData),
};

export default AuthRepository;
