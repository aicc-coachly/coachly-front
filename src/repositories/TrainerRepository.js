import axios from 'axios';

const TrainerRepository = {
  // 모든 트레이너 조회
  getAllTrainers: () => axios.get('/trainers'),

  // 특정 트레이너 조회
  getTrainer: (trainerId) => axios.get(`/trainer/${trainerId}`),

  // 특정 트레이너의 PT 가격 정보 조회
  getTrainerPtAmount: (trainerId) =>
    axios.get(`/trainer/${trainerId}/pt-cost-option`),

  // 특정 트레이너의 헬스장 주소 조회
  getTrainerGymAddress: (trainerId) =>
    axios.get(`/trainer/${trainerId}/gym-address`),

  // 특정 트레이너의 계좌 정보 조회
  getTrainerAccount: (trainerId) => axios.get(`/trainer/${trainerId}/account`),

  // 트레이너 소프트 삭제
  deleteTrainer: (trainerId) => axios.delete(`/trainer/${trainerId}`),

  // 트레이너 PT 가격 정보 소프트 삭제
  deleteTrainerPtAmount: (trainerId) =>
    axios.delete(`/trainer/${trainerId}/pt-cost-option`),

  // 트레이너 헬스장 주소 소프트 삭제
  deleteTrainerGymAddress: (trainerId) =>
    axios.delete(`/trainer/${trainerId}/gym-address`),

  // 트레이너 계좌 정보 소프트 삭제
  deleteTrainerAccount: (trainerId) =>
    axios.delete(`/trainer/${trainerId}/account`),

  // 트레이너 정보 업데이트
  updateTrainerInfo: (trainerId, profileData) =>
    axios.patch(`/trainer/${trainerId}/info`, profileData),

  // 트레이너 주소 업데이트
  updateTrainerAddress: (trainerId, addressData) =>
    axios.patch(`/trainer/${trainerId}/gym-address`, addressData),

  // 트레이너 PT 가격 정보 업데이트
  updateTrainerPtAmount: (trainerId, ptAmountData) =>
    axios.patch(`/trainer/${trainerId}/pt-cost-option`, ptAmountData),

  // 트레이너 계좌 정보 업데이트
  updateTrainerAccount: (trainerId, accountData) =>
    axios.patch(`/trainer/${trainerId}/account`, accountData),
};

export default TrainerRepository;
