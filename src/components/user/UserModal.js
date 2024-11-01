import React from 'react';
import { useModal } from '../common/ModalProvider';
import { BodyCompositionModal } from './BodyCompositionModal';

export const UserModal = () => {
  const { openModal } = useModal();

  // BodyCompositionModal을 열 때 호출되는 함수
  const handleOpenModal = (date) => {
    openModal(<BodyCompositionModal date={date} />);
  };

  // 더미 날짜 데이터 (실제 데이터베이스 연결 시 대체 필요)
  const dates = ["2024-07-19 06:00", "2024-08-19 19:00", "2024-09-17 07:00"];

  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-4">풀도핑 회원님</h2>

      {/* 사용자 정보 */}
      <div className="text-sm text-center mb-4">
        <p>연령: 만 27세  성별: 여</p>
        <p>전화번호: 010-1234-7777</p>
      </div>

      {/* 체성분 정보 타이틀 */}
      <div className="text-sm font-semibold text-center mb-2">
        체성분 정보
      </div>

      {/* 날짜 버튼 리스트 */}
      <div className="flex flex-col gap-2">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => handleOpenModal(date)}
            className="w-full bg-pink-200 py-2 rounded text-black font-semibold"
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};
