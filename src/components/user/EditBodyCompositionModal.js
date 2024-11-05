import React from "react";

export const EditBodyCompositionModal = () => {
  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">첫번째 기록</h2>

      {/* 측정날짜 */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">측정날짜</label>
        <input
          type="text"
          className="w-full bg-gray-200 p-2 rounded text-center"
        />
      </div>

      {/* 2열 레이아웃 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 키 */}
        <div>
          <label className="block text-sm font-semibold">키(cm)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 체중 */}
        <div>
          <label className="block text-sm font-semibold">체중(kg)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 체지방량 */}
        <div>
          <label className="block text-sm font-semibold">체지방량(kg)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 골격근량 */}
        <div>
          <label className="block text-sm font-semibold">골격근량(kg)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 체수분 */}
        <div>
          <label className="block text-sm font-semibold">체수분(L)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 단백질 */}
        <div>
          <label className="block text-sm font-semibold">단백질(kg)</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 복부지방률 */}
        <div>
          <label className="block text-sm font-semibold">복부지방률</label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>

        {/* 내장지방레벨 */}
        <div>
          <label className="block text-sm font-semibold">
            내장지방레벨(Lv)
          </label>
          <input
            type="text"
            className="w-full bg-gray-200 p-2 rounded text-center"
          />
        </div>
      </div>

      {/* 수정하기, 삭제하기 버튼 */}
      <div className="flex gap-4 mt-4">
        <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold">
          수정하기
        </button>
        <button className="w-full bg-pink-200 py-2 rounded text-black font-semibold">
          삭제하기
        </button>
      </div>
    </div>
  );
};
