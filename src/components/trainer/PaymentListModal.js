import React from 'react';

export const PaymentListModal = () => {
  return (
    <div className="w-[90%] max-w-md bg-gray-300 p-6 rounded-lg text-center">
      <h2 className="text-lg font-bold mb-4">결제요청하기</h2>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>원데이 클래스 :</span>
        </label>
        <input
          type="text"
          className="w-20 bg-gray-200 p-1 text-center rounded"
        />
        <span>원</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>회당 가격</span>
        </label>
        <span>10 회</span>
        <span>60000 원</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>회당 가격</span>
        </label>
        <span>15 회</span>
        <span>55000 원</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>회당 가격</span>
        </label>
        <span>20 회</span>
        <span>50000 원</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          <span>회당 가격</span>
        </label>
        <input
          type="text"
          className="w-10 bg-gray-200 p-1 text-center rounded"
        />
        <span>회</span>
        <input
          type="text"
          className="w-20 bg-gray-200 p-1 text-center rounded"
        />
        <span>원</span>
      </div>

      <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold mt-4">
        추가하기
      </button>
    </div>
  );
};
