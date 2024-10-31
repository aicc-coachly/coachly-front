import React from 'react'
import { useModal } from '../common/ModalProvider'
import { PTModal } from './PTModal';

export const TrainerInfoModal = () => {
  const { openModal } = useModal();

return (
  <div className="relative w-[90%] max-w-lg max-h-[80vh] bg-gray-200 rounded-lg p-6">
    <button className="absolute top-4 right-4 text-lg font-bold">X</button>
    
    <div className="flex flex-col items-center">
      {/* 상단 이미지 영역 */}
      <div className="w-full h-36 bg-gray-300 mb-4"></div>

      {/* 트레이너 정보 */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">정혜현 트레이너</h3>
        <span className="text-sm bg-gray-400 px-2 py-1 rounded-md inline-block mt-2">동대문구 회기동</span>

        <div className="flex gap-2 justify-center mt-2">
          <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">교정/재활</span>
          <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">여성전문</span>
        </div>

        <div className="text-sm mt-2">20회 4만원/회</div>
      </div>

      {/* 소개 내용 */}
      <ul className="text-sm list-disc pl-5 mb-2">
        <li>생활체육지도자 2급 (보디빌딩)</li>
        <li>20xx NABBA 비키니 3nd</li>
      </ul>
      <p className="text-sm mb-2">
        안녕하세요. 회원님과 오래 건강하고 싶은 정혜현 트레이너입니다. 어깨가 지켜줄 ~~~
      </p>
      <p className="text-sm mb-4">
        더 궁금하신 점이 있으시면 편하게 1:1 상담 걸어주세요 ^^
      </p>

      {/* 버튼 */}
      <div className="flex flex-col gap-2 w-full">
         <button onClick={() => openModal(<PTModal/>)}>PT 신청하기</button>
        <button className="bg-pink-200 text-black rounded-md py-2 text-sm">1:1 채팅하기</button>
      </div>
    </div>
  </div>
);
}