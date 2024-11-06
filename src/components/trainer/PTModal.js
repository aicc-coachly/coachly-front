import React, { useEffect, useState } from 'react';
import Buttons from '../common/Buttons';
import axios from 'axios';
import { useModal } from '../common/ModalProvider';

export const PTModal = ({ trainer_id }) => {
  const { closeModal } = useModal();
  const [trainerImage, setTrainerImage] = useState(null);

  useEffect(() => {
    // Fetch the trainer image based on trainer_id
    axios
      .get(`http://localhost:8000/trainers/${trainer_id}/image`)
      .then((response) => {
        setTrainerImage(response.data.image); // Assuming the API returns an image URL
      })
      .catch((error) => console.error('Error fetching trainer image:', error));
  }, [trainer_id]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-lg relative">
        {/* 트레이너 정보 섹션 */}
        <div className="flex gap-4 mb-6">
          <picture className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={trainerImage || '/path-to-placeholder.jpg'} // Placeholder if no image is available
              alt="트레이너 프로필"
              
              className="w-full h-full object-cover rounded-lg"
            />
          </picture>
          
          <div className="flex flex-col gap-2">
            <p className="font-bold text-lg">이건 트레이너</p>
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
              <input type="checkbox" id="oneday" className="w-5 h-5" />
              <label htmlFor="oneday" className="font-medium">원데이 클래스</label>
            </div>
            <p className="text-gray-600">50분 5만원</p>
          </div>

          <div className="border rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="perprice" className="w-5 h-5" />
              <label htmlFor="perprice" className="font-medium">회당 가격</label>
            </div>
            <p className="text-gray-600">20회 시간당 4만원</p>
          </div>

          <p className="text-red-400 text-sm">회차/시간을 선택하세요.</p>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex flex-col gap-3  mt-auto">
          <Buttons size="middle" color="#4831D4">
            1:1 채팅하기
          </Buttons>
          <Buttons size="middle" color="#4831D4">
            결제 요청하기
          </Buttons>
        </div>
      </div>
    </div>
  );
};

export default PTModal;
