import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Buttons from '../common/Buttons';
import { useModal } from '../common/ModalProvider';
import { PTModal } from './PTModal'; // PTModal을 import
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerPtCost } from '../../redux/slice/trainerSlice';

export const TrainerInfoModal = ({ trainer }) => {
  const storedData = JSON.parse(sessionStorage.getItem("userData"));
  const data = storedData?.data;
  const userType = storedData?.userType;
  const user_number = userType === "user" ? data?.user_number : null;
  const user_name = userType === "user" ? data?.user_name : null;
  const dispatch = useDispatch();
  const { closeModal, openModal } = useModal();
  const trainer_number = trainer?.trainer_id;
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const path = 'http://localhost:8000';
  // console.log(trainer);

  // Redux에서 PT 비용 데이터 선택
  const {
    data: trainerPtCostData,
    loading,
    error,
  } = useSelector((state) => state.trainer);
  console.log("현재 Redux의 trainerPtCostData:", trainerPtCostData);

  // PT 비용 정보 가져오기
  useEffect(() => {
    if (trainer && trainer.trainer_number) {
      dispatch(getTrainerPtCost(trainer.trainer_number));
      console.log("데이터 가져오기 :", trainer.trainer_number);
    }
  }, [trainer, dispatch]);

  // 데이터 필터링
  const filteredPtCostData =
    trainerPtCostData && Array.isArray(trainerPtCostData)
      ? trainerPtCostData.map(
          ({ amount_number, option, amount, frequency }) => ({
            amount_number,
            option,
            amount,
            frequency,
          })
        )
      : [];

  console.log("트레이너 PT 비용 정보:", filteredPtCostData);
  console.log("trainerPtCostData:", trainerPtCostData);

  // trainer_id로 트레이너 이미지를 가져오기
  useEffect(() => {
    // 서버의 uploads 폴더에서 이미지를 가져오는 경로
    if (trainer.image) {
      const imagePath = `${path}/${trainer.image}`; // 트레이너의 이미지 경로 설정
      setImage(imagePath);
    }
  }, [trainer.image]);
  console.log(user_number);
  console.log(user_name);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  console.log(trainer);
  // PT 신청하기 버튼 클릭 시 PTModal 열기
  const handlePTRequest = () => {
    openModal(
      <PTModal
        trainer={trainer}
        pt_cost_option={trainer.pt_cost_options}
        trainer_number={trainer.trainer_number}
        trainer_name={trainer.name}
        user_number={user_number}
        user_name={user_name}
      />
    );
  };
  // console.log(trainer.trainer_number);

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
          <p className="text-sm bg-[#4831D4] text-white px-2 py-1 rounded-md inline-block mt-2">
            {trainer.trainer_address}
            {trainer.trainer_detail_address}
          </p>
          <div className="flex gap-2 justify-center mt-2">
            {trainer.service_options.map((option, index) => (
              <span
                key={index}
                className="text-xs bg-[#CCF381] text-[#4831D4] px-2 py-1 rounded-full"
              >
                {option}
              </span>
            ))}
          </div>
          <p className="text-sm mt-2">{}</p>
          <div className="flex flex-col gap-2 mt-2">
            {trainer.pt_cost_options && trainer.pt_cost_options.length > 0 ? (
              trainer.pt_cost_options.map((option, index) => (
                <p key={index} className="text-sm">
                  {option.option === '원데이 클래스'
                    ? '원데이 클래스'
                    : '패키지'}{' '}
                  -{option.frequency}회 {option.amount}원
                </p>
              ))
            ) : (
              <p className="text-sm">가격 정보가 없습니다.</p>
            )}
          </div>

          <p className="text-sm mb-4">
            안녕하세요. 회원님과 오래 건강하고 싶은 {trainer.name}{' '}
            트레이너입니다.
          </p>

          {/* PT 신청 및 상담 버튼 */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={handlePTRequest} // PT 신청하기 버튼 클릭 시 모달 열기
              className="bg-[#4831D4]  text-white rounded-md py-2 text-sm"
            >
              PT 신청하기
            </button>
            <button
              onClick={() => navigate("/chatroom")}
              className="bg-[#4831D4] text-white rounded-md py-2 text-sm"
            >
              1:1 상담 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfoModal;
