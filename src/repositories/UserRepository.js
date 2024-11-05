import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const UserRepository = {
  // 모든 사용자 조회
  getAllUsers: () => axios.get('/users'),

  // 특정 사용자 페이지 정보 조회
  getUserPage: (userId) => axios.get(`/page/${userId}`),

  // 특정 사용자의 인바디 정보 조회
  getUserInbody: (userId) => axios.get(`/inbody/${userId}`),

  // 사용자 인바디 정보 저장
  postUserInbody: (inbodyData) => axios.post('/inbody', inbodyData),

  // 사용자 기본 정보 업데이트
  updateUserInfo: (userId, userData) =>
    axios.patch(`/user/${userId}/info`, userData),

  // 사용자 주소 정보 업데이트
  updateUserAddress: (userId, addressData) =>
    axios.patch(`/user/${userId}/address`, addressData),

  // 사용자 인바디 정보 업데이트
  updateUserInbody: (userId, inbodyData) =>
    axios.patch(`/user/${userId}/inbody`, inbodyData),

  // 사용자 소프트 삭제
  deleteUser: (userId) => axios.delete(`/${userId}`),

  // 사용자 인바디 정보 소프트 삭제
  deleteUserInbody: (userId) => axios.delete(`/inbody/${userId}`),

  // 사용자 주소 소프트 삭제
  deleteUserAddress: (userId) => axios.delete(`/address/${userId}`),
};

export default UserRepository;
