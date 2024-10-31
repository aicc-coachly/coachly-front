import React from 'react'
import Buttons from '../common/Buttons'

export const PTModal = () => {
  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* 트레이너 정보 섹션 */}
      <div className="flex gap-4 mb-6">
        <picture className="w-32 h-32 bg-gray-200 rounded-lg">
          <img src="/path-to-image.jpg" alt="트레이너 프로필" className="w-full h-full object-cover rounded-lg"/>
        </picture>
        
        <div className="flex flex-col gap-2">
          <p className="font-bold text-lg">이건트레이너</p>
          <p className="text-gray-600">동대문구 회기동</p>
          <div className="flex gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">교정/재활</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">여성전문</span>
          </div>
        </div>
      </div>

      {/* 가격 선택 섹션 */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="oneday" className="w-5 h-5"/>
            <label htmlFor="oneday" className="font-medium">원데이 클래스</label>
          </div>
          <p className="text-gray-600">50분 5만원</p>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="ferprice" className="w-5 h-5"/>
            <label htmlFor="ferprice" className="font-medium">회당 가격</label>
          </div>
          <p className="text-gray-600">20회 시간당 4만원</p>
        </div>

        <p className="text-red-400 text-sm">회원님은 선택하신 회차/시간대 선택을 하셔야 합니다</p>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex flex-col gap-3 mt-auto">
        <Buttons size="middle" color="#081f5c">
          1:1 채팅하기
        </Buttons>
        <Buttons size="middle" color="#ff4b4b">
          결제 요청하기
        </Buttons>
      </div>
    </div>
  )
}


