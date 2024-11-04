import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const AuthRepository = {
  // 회원용 엔드포인트
  loginUser: (credentials) => axios.post(`${url}/user/login`, credentials),
  registerUser: (userData) => axios.post(`${url}/user/signup`, userData),

  // 트레이너용 엔드포인트
  loginTrainer: (credentials) => axios.post("/trainer/login", credentials),
  registerTrainer: (trainerData) => axios.post("/trainer/signup", trainerData),
};

export default AuthRepository;
