import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import Buttons from '../common/Buttons';
import { useModal } from '../common/ModalProvider';
import {PTModal} from './PTModal'; // PTModal을 import
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerPtCost } from '../../redux/slice/trainerSlice'; 


export const TrainerInfoModal = ({ trainer }) => {
  const dispatch = useDispatch(); // Redux dispatch 훅
  const { closeModal, openModal } = useModal();
   const trainer_number = trainer?.trainer_id;
  
  const path = "http://localhost:8000";

  //props로 PTModal에 데이터 전달
  const handlePTRequest = () => {
    openModal(<PTModal trainer={trainer} />);
  };
  
  // Redux에서 PT 비용 데이터 선택
  const { data: trainerPtCostData, loading, error } = useSelector((state) => state.trainer);
  console.log('현재 Redux의 trainerPtCostData:', trainerPtCostData);

  // PT 비용 정보 가져오기
  useEffect(() => {
    if (trainer && trainer.trainer_number) {
      dispatch(getTrainerPtCost(trainer.trainer_number));
      console.log('데이터 가져오기 :', trainer.trainer_number);
    }
  }, [trainer, dispatch]);

  // 데이터 필터링
  const filteredPtCostData = trainerPtCostData && Array.isArray(trainerPtCostData)
    ? trainerPtCostData.map(({ amount_number, option, amount, frequency }) => ({
        amount_number,
        option,
        amount,
        frequency,
      }))
    : [];

  console.log('트레이너 PT 비용 정보:', filteredPtCostData);
  console.log('trainerPtCostData:', trainerPtCostData);


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
console.log(trainer)
  // PT 신청하기 버튼 클릭 시 PTModal 열기
  // const handlePTRequest = () => {
  //   openModal(<PTModal trainer_id={trainer.trainer_id} />);
  // };
  const [image, setImage] = useState(null);

  // trainer_id로 트레이너 이미지를 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8000/trainers/${trainer.trainer_id}/image`)
      .then((response) => {
        setImage(response.data.image); // API가 { image: "imageURL" } 형태로 반환한다고 가정
        console.log('Is pt_cost_option an array?:', Array.isArray(trainer.pt_cost_option));
        console.log('pt_cost_option value:', trainer.pt_cost_option);
      })
      .catch((error) => console.error("Error fetching trainer image:", error));
  }, [trainer.trainer_id]);


  const navigate = useNavigate();

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
          
              {/* 가격 옵션 표시 */}
          <div className="mt-4 text-center">
            <h4 className="text-xl font-semibold">가격 옵션</h4>
            {loading ? (
              <p>불러오는 중...</p>
            ) : error ? (
              <p className="text-red-500">가격 정보 가져오기 실패</p>
            ) : filteredPtCostData.length > 0 ? (
              filteredPtCostData.map((option) => (
                <div key={option.amount_number} className="text-sm">
                  {option.option}: {option.amount}원
                  {option.frequency && `, ${option.frequency}회`}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">가격 정보 없음</p>
            )}
          </div>

          {/* PT 신청 및 상담 버튼 */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <button
              onClick={handlePTRequest} // PT 신청하기 버튼 클릭 시 모달 열기
              className="bg-[#4831D4]  text-white rounded-md py-2 text-sm"
            >
              PT 신청하기
            </button>
            <button 
            onClick={() => navigate('/chatRoom')}
            className="bg-[#4831D4] text-white rounded-md py-2 text-sm">
              1:1 상담 받기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfoModal;
