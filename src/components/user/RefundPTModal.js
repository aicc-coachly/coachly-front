// src/components/user/RefundPTModal.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRefund, updateRefund } from '../../redux/slice/refundSlice';
import { useModal } from '../common/ModalProvider';

export const RefundPTModal = ({
  schedule = {}, // 기본값 설정
  refundData = {},
  isEditMode = false,
}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const userNumber = useSelector((state) => state.auth.user.user_number);

  const [showOtherReason, setShowOtherReason] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    oneDayClass: false,
    ptSessions: false,
  });

  // 진행된 일정을 안전하게 계산
  const completedSessions = schedule.data
    ? schedule.data.filter((item) => item.status === 'completed').length
    : 0;

  const remainingSessions = schedule.frequency
    ? schedule.frequency - completedSessions
    : 0;

  useEffect(() => {
    if (isEditMode) {
      setSelectedReason(refundData.refund_reason || '');
      setAccountNumber(refundData.account || '');
      setBankName(refundData.bank_name || '');
      setAccountHolder(refundData.account_name || '');
      setSelectedItems(
        refundData.refund_items || { oneDayClass: false, ptSessions: false }
      );
      setShowOtherReason(refundData.refund_reason === '기타');
    }
  }, [isEditMode, refundData]);

  const toggleSelectedItem = (item) => {
    setSelectedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleRefundRequest = async () => {
    if (!userNumber || !schedule.pt_number) {
      alert('필요한 정보가 없습니다. 다시 시도해 주세요.');
      return;
    }

    if (
      !agreeTerms ||
      !selectedReason ||
      !accountNumber ||
      !bankName ||
      !accountHolder
    ) {
      alert('모든 항목을 입력하고 약관에 동의해주세요.');
      return;
    }

    const refundDataToSubmit = {
      pt_number: schedule.pt_number,
      refund_reason: selectedReason === '기타' ? otherReason : selectedReason,
      account: accountNumber,
      bank_name: bankName,
      account_name: accountHolder,
      refund_items: selectedItems,
    };

    try {
      if (isEditMode) {
        await dispatch(
          updateRefund({
            refund_number: refundData.refund_number,
            updateData: refundDataToSubmit,
          })
        ).unwrap();
        alert('환불 정보가 성공적으로 수정되었습니다.');
      } else {
        await dispatch(createRefund(refundDataToSubmit)).unwrap();
        alert('환불 요청이 성공적으로 접수되었습니다.');
      }
      closeModal();
    } catch (error) {
      alert(
        isEditMode ? '환불 수정에 실패했습니다.' : '환불 요청에 실패했습니다.'
      );
    }
  };

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setShowOtherReason(reason === '기타');
  };

  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">
        {isEditMode ? '환불 정보 수정' : '결제 취소 및 환불'}
      </h2>

      {/* 환불할 항목 확인 */}
      <div className="flex flex-col items-start justify-between mb-4">
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selectedItems.ptSessions}
            onChange={() => toggleSelectedItem('ptSessions')}
            className="mr-2"
          />
          <span>PT 세션 환불</span>
        </label>
        <div className="ml-6 text-sm text-gray-700">
          <p>
            남은 진행 횟수:
            {remainingSessions ? `${remainingSessions}회` : '0회'}
          </p>
          <p>
            예상 환불 금액:
            {schedule.amount && remainingSessions
              ? `${schedule.amount / remainingSessions}원`
              : '금액 없음'}
          </p>
        </div>
      </div>

      {/* 환불 규정 */}
      <div className="bg-gray-200 p-4 rounded mb-4 text-sm overflow-auto h-24">
        <p>1. 개인 사정으로 첫 수업 전 환불 규정</p>
        <p>2. 결제 후 7일 이내: 전액 환불</p>
        <p>3. 결제 후 7일 경과 후: 위약금 (결제금액의 10%) 제외 환불</p>
        <p>4. 첫 수업 진행 후 환불 규정</p>
      </div>

      {/* 환불 받을 계좌 정보 입력 */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">
          환불 받을 계좌 입력 (본인 명의 계좌만 가능)
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className="w-full bg-gray-200 p-2 rounded mb-2"
          placeholder="계좌번호 입력"
        />
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full bg-gray-200 p-2 rounded mb-2"
          placeholder="은행명 입력"
        />
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          className="w-full bg-gray-200 p-2 rounded"
          placeholder="예금주명 입력"
        />
      </div>

      {/* 환불 사유 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">환불사유</label>
        <div className="bg-gray-200 rounded p-2">
          {['단순변심', '트레이너 문제', '기타'].map((reason) => (
            <div key={reason} className="flex items-center mb-2">
              <input
                type="radio"
                name="refundReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => handleReasonChange(reason)}
                className="mr-2"
              />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 기타 사유 입력 박스 */}
      {showOtherReason && (
        <div className="mb-4">
          <textarea
            placeholder="기타 사유를 입력해주세요."
            value={otherReason}
            onChange={(e) => setOtherReason(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded h-24"
          />
        </div>
      )}

      {/* 환불 및 교환 약정 동의 */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={() => setAgreeTerms(!agreeTerms)}
          className="mr-2"
        />
        <span className="text-sm">환불 및 교환 약정 동의</span>
      </div>

      {/* 환불 요청 버튼 */}
      <button
        onClick={handleRefundRequest}
        className="w-full bg-pink-200 py-2 rounded text-black font-semibold"
      >
        {isEditMode ? '수정하기' : '환불요청'}
      </button>
    </div>
  );
};
