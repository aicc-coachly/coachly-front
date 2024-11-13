import React from 'react';
import Buttons from '../common/Buttons';

const TrainerCard = ({ trainerNumber, handleCreateChatRoom }) => {
  return (
    <div className="w-2/5 h-1/3 bg-white rounded-lg shadow-lg flex flex-col items-center p-4">
      {/* 사진 영역 */}
      <div className="w-full h-1/2 flex justify-center mb-4">
        <picture className="w-40 h-40 overflow-hidden">
          <img 
            // src="/path-to-image.jpg" 
            alt="트레이너 프로필" 
            className="w-full h-full object-cover"
          />
        </picture>
      </div>

      {/* 트레이너 이름 */}
      <div className="text-xl font-bold mb-auto">
        트레이너 이름
      </div>

      {/* 상담 버튼 */}
      <Buttons 
        size="middle" 
        color="#081f5c"
        onClick={() => handleCreateChatRoom(trainerNumber)}
      >
        1:1 상담받기
      </Buttons>
    </div>
  );
}

export default TrainerCard;
