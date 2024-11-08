import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Buttons from '../common/Buttons';
import { useModal } from '../common/ModalProvider';
import PTModal from './PTModal'; // PTModal을 import

export const TrainerInfoModal = ({ trainer }) => {

  const { closeModal, openModal } = useModal();
  const [image, setImage] = useState(null);
  const path = "http://localhost:8000";

  // trainer_id로 트레이너 이미지를 가져오기
  useEffect(() => {
    // 서버의 uploads 폴더에서 이미지를 가져오는 경로
    if (trainer.image) {
      const imagePath = `${path}/${trainer.image}`; // 트레이너의 이미지 경로 설정
      setImage(imagePath);
    }
  }, [trainer.image]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // PT 신청하기 버튼 클릭 시 PTModal 열기
  const handlePTRequest = () => {
    openModal(<PTModal trainer_id={trainer.trainer_id} />);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="max-w-sm w-full p-6 rounded-lg relative bg-white shadow-lg">
        <div className="flex flex-col items-center">
          {/* 트레이너 이미지 */}
          <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
            {image ? (
              <img
                src={`${path}/${trainer.image}`}
                alt={`${trainer.name} 사진`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )}
          </div>

          {/* 트레이너 정보 */}
          <h3 className="text-xl font-semibold">{trainer.name} 트레이너</h3>
          <p className="text-sm bg-gray-400 px-2 py-1 rounded-md inline-block mt-2">
            {trainer.trainer_detail_address}
          </p>
          <div className="flex gap-2 justify-center mt-2">
            {trainer.service_options.map((option, index) => (
              <span
                key={index}
                className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full"
              >
                {option}
              </span>
            ))}
          </div>
          <p className="text-sm mt-2">20회 4만원/회</p> /
          <p className="text-sm mb-4">
            안녕하세요. 회원님과 오래 건강하고 싶은 {trainer.name} 트레이너입니다.
          </p>

          {/* PT 신청 및 상담 버튼 */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={handlePTRequest} // PT 신청하기 버튼 클릭 시 모달 열기
              className="bg-pink-200 text-black rounded-md py-2 text-sm"
            >
              PT 신청하기
            </button>
            <button className="bg-blue-200 text-black rounded-md py-2 text-sm">
              1:1 상담 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfoModal;
