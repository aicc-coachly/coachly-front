import axios from 'axios';

const AuthRepository = {
  // 회원용 엔드포인트
  loginUser: (credentials) => axios.post('/api/user/auth/login', credentials),
  registerUser: (userData) => axios.post('/api/user/auth/register', userData),

  // 트레이너용 엔드포인트
  loginTrainer: (credentials) =>
    axios.post('/api/trainer/auth/login', credentials),
  registerTrainer: (trainerData) =>
    axios.post('/api/trainer/auth/register', trainerData),
};

export default AuthRepository;
