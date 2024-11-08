import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { EditScheduleModal } from "../../components/trainer/EditScheduleModal";
import { CreateScheduleModal } from "../../components/trainer/CreateScheduleModal";
import { UserModal } from "../../components/user/UserModal";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTrainers,
  getTrainer,
  updateTrainerStatus,
} from "../../redux/slice/trainerSlice";
import { setTrainer } from "../../redux/slice/authSlice";

const TrainerMypage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 유저 프로필 정보와 상태 관리
  const trainerNumber = useSelector(
    (state) => state.auth?.trainer?.trainer_number
  );
  const profile = useSelector((state) => state.trainer?.data);
  const [isChecked, setIsChecked] = useState(false);
  const path = "http://localhost:8000";

  console.log(profile);

  useEffect(() => {
    if (trainerNumber) {
      dispatch(getTrainer(trainerNumber)); // trainerNumber가 존재할 때 트레이너 정보 불러오기
    } else {
      const storedTrainer = JSON.parse(localStorage.getItem("trainer"));
      if (storedTrainer) {
        dispatch(setTrainer(storedTrainer)); // localStorage에서 트레이너 정보 가져오기
      }
    }
  }, [dispatch, trainerNumber]);

  useEffect(() => {
    if (profile) {
      // 트레이너 상태에 따라 체크박스 초기 상태 설정
      setIsChecked(profile.status === "inactive");
    }
  }, [profile]);

  const handleCheckboxChange = async (e) => {
    const newStatus = e.target.checked ? "inactive" : "active";
    setIsChecked(e.target.checked); // 로컬 상태 업데이트

    // 서버에 새로운 상태 업데이트
    await dispatch(
      updateTrainerStatus({ trainer_number: trainerNumber, status: newStatus })
    );

    // 상태 업데이트 후 최신 트레이너 정보 가져오기
    dispatch(getTrainer(trainerNumber));
  };
  // console.log(trainerNumber);
  // console.log(profile);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 내 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={() => navigate("/trainerprofile")} // 페이지 이동 설정
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden">
            {profile?.image ? (
              <img
                src={`${path}/${profile.image}`} // 이미지 경로 설정
                alt="트레이너 프로필 사진"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-center text-gray-400">이미지 없음</p>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-end">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-300 rounded-md"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-sm">수업 그만 받기</span>
              </label>
            </div>

            {/* 텍스트 정보 */}
            <p className="mt-2 text-base font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>

            {/* 태그들 */}
            <div className="flex mt-2 space-x-2">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.trainer_detail_address}
              </p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">{}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 내 회원 관리 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">내 회원 관리</h2>
        <div className="flex items-center justify-between">
          <button onClick={() => openModal(<UserModal />)} className="px-1 py-1 text-sm text-base">
            <p>풀도핑 회원님</p>
            <p>(fulldoping12)</p>
          </button>
          <button
            onClick={() => navigate("/chatRoom")}
            className="px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            1:1 채팅하기
          </button>
        </div>
      </div>

      {/* 예약된 수업 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">예약된 수업</h2>
          <button
            onClick={() => openModal(<CreateScheduleModal />)}
            className="px-3 py-1 items-center bg-pink-300 text-sm rounded-md "
          >
            추가하기
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => openModal(<UserModal />)}
            className="px-1 py-1 text-sm text-base"
          >
            <p>풀도핑 회원님</p>
            <p>(fulldoping12)</p>
          </button>
          <span className="text-sm text-gray-500">24-11-01</span>
          <span className="ml-2 text-sm text-gray-500">득근 헬스장</span>
          <button
            onClick={() => openModal(<EditScheduleModal />)}
            className="text-center px-3 py-1 bg-blue-300 text-sm rounded-md"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerMypage;
