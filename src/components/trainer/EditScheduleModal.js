import React from 'react';

export const EditScheduleModal = () => {
  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">수업 변경하기</h2>
      

      {/* 회원명 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">회원명</span>
        <input
          type="text"
          value="풀도핑 (fulldoping12)"
          readOnly
          className="bg-gray-200 text-sm p-1 rounded text-center"
        />
      </div>

      {/* 장소 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">장소</span>
        <input
          type="text"
          value="득근 헬스장 회기점"
          readOnly
          className="bg-gray-200 text-sm p-1 rounded text-center"
        />
      </div>

      {/* 일시 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">일시</span>
        <div className="flex gap-2">
          <input
            type="text"
            value="2024-11-01"
            readOnly
            className="bg-gray-200 text-sm p-1 rounded text-center w-24"
          />
          <input
            type="text"
            value="오후 7시"
            readOnly
            className="bg-gray-200 text-sm p-1 rounded text-center w-20"
          />
        </div>
      </div>

      {/* 수정하기 버튼 */}
      <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold mt-4">
        수정하기
      </button>
     {/* 삭제하기 버튼 */}
      <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold mt-4">
        식제하기
      </button>   
    </div>
  );
};

