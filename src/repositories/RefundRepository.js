import axios from 'axios';

const RefundRepository = {
  // 모든 환불 사유 조회
  getAllRefunds: () => axios.get('/refund-reasons'),

  // 특정 환불 사유 조회
  getRefund: (refundNumber) => axios.get(`/refund-reasons/${refundNumber}`),

  // 환불 사유 생성
  createRefund: (refundData) => axios.post('/refund-reasons', refundData),

  // 환불 사유 수정
  updateRefund: (refundNumber, refundData) =>
    axios.patch(`/refund-reasons/${refundNumber}`, refundData),

  // 환불 사유 삭제 (상태 변경)
  deleteRefund: (refundNumber) =>
    axios.delete(`/refund-reasons/${refundNumber}`),
};

export default RefundRepository;
