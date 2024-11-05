import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { EditScheduleModal } from "../../components/trainer/EditScheduleModal";
import { CreateScheduleModal } from "../../components/trainer/CreateScheduleModal";
import { UserModal } from "../../components/user/UserModal";
import { useNavigate } from "react-router-dom";
import { fetchTrainerProfile } from "../../redux/thunks/trainerThunks";
import { useDispatch, useSelector } from "react-redux";

const TrainerMypage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [trainer, setTrainer] = useState(null);

  // useSelector로 profile을 안전하게 가져오기
  const profile = useSelector((state) => state?.trainers?.profile || {});
  const trainerId = trainer?.trainer_number;

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedTrainer = localStorage.getItem("trainer");

    if (storedTrainer) {
      setTrainer(JSON.parse(storedTrainer));
    }
  }, []);

  useEffect(() => {
    if (trainerId) {
      dispatch(fetchTrainerProfile(trainerId));
    }
  }, [trainerId, dispatch]);

  console.log("프로필 정보:", profile);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 내 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={() => navigate("/trainerProfile")}
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden">
            {/* 프로필 사진 자리 */}
          </div>
          <div className="flex-1">
            <div className="flex justify-end">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-gray-300 rounded-md"
                />
                <span className="ml-2 text-sm">수업 그만 받기</span>
              </label>
            </div>
            <p className="mt-2 text-base font-medium">{profile?.name || "정보 없음"}</p>
            <p className="text-sm text-gray-500">{profile?.phone || "정보 없음"}</p>
            <div className="flex mt-2 space-x-2">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.address || "정보 없음"}
              </p>
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
            onClick={() => navigate("/trainerChat")}
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
