import React, { useState } from 'react';

export const RefundPTModal = () => {
  const [showOtherReason, setShowOtherReason] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setShowOtherReason(reason === '기타');
  };

  return (
    <div className="w-[90%] max-w-md bg-gray-300 p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">결제 취소 및 환불</h2>
      <button className="absolute top-4 right-4 text-lg font-bold">X</button>

      {/* 환불할 항목 선택 */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>원데이 클래스</span>
        </label>
        <span>50000 원</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>총 20회 중 3회 수강</span>
        </label>
      </div>

      {/* 환불 규정 */}
      <div className="bg-gray-200 p-4 rounded mb-4 text-sm overflow-auto h-24">
        <p>1. 개인 사정으로 첫 수업 전 환불 규정</p>
        <p>2. 결제 후 7일 이내: 전액 환불</p>
        <p>3. 결제 후 7일 경과 후: 위약금 (결제금액의 10%) 제외 환불</p>
        <p>4. 첫 수업 진행 후 환불 규정</p>
      </div>

      {/* 환불 받을 계좌 입력 */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">환불 받을 계좌 입력 (본인 명의 계좌만 가능)</label>
        <input type="text" className="w-full bg-gray-200 p-2 rounded" />
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
            className="w-full bg-gray-200 p-2 rounded h-24"
          />
        </div>
      )}

      {/* 환불 및 교환 약정 동의 */}
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" />
        <span className="text-sm">환불 및 교환 약정 동의</span>
      </div>

      {/* 환불 요청 버튼 */}
      <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold">
        환불요청
      </button>
    </div>
  );
};
