import React from 'react';

export const CheckScheduleModal = () => {
  return (
    <div className="w-[90%] max-w-sm bg-gray-300 p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">트레이너 이름</h2>
      <button className="absolute top-4 right-4 text-lg font-bold">X</button>

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
      
    </div>
  );
};
