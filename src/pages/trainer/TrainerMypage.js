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
import { getPtschedule } from "../../redux/slice/paymentSlice";
import {
  deletePtSchedule,
  getScheduleRecord,
  patchPtSchedule,
} from "../../redux/slice/scheduleSlice";
import { getUser } from "../../redux/slice/userSlice";

const TrainerMypage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate(); // navigate 함수 생성
  const dispatch = useDispatch();
  const [paidUsers, setPaidUsers] = useState([]);
  const [isFetched, setIsFetched] = useState(false); // 데이터가 이미 fetch되었는지 확인
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 예약 정보를 상태로 관리
  const [scheduleRecords, setScheduleRecords] = useState([]); // 모든 예약 정보를 합쳐서 관리

  // 유저 프로필 정보와 상태 관리
  const trainer_number = useSelector(
    (state) => state.auth?.trainer?.trainer_number
  );
  const profile = useSelector((state) => state.trainer?.data);
  const [isChecked, setIsChecked] = useState(false);
  const path = "http://localhost:8000";
  const pt_schedule = useSelector((state) => state.payment?.data) || [];
  const pt_number = pt_schedule.map((item) => item.pt_number);
  const schedule_record = useSelector(
    (state) => state.schedule?.data?.schedule_records
  );

  // console.log(schedule_record);

  useEffect(() => {
    if (trainer_number) {
      dispatch(getTrainer(trainer_number)); // trainerNumber가 존재할 때 트레이너 정보 불러오기
    } else {
      const storedTrainer = JSON.parse(localStorage.getItem("trainer"));
      if (storedTrainer) {
        dispatch(setTrainer(storedTrainer)); // localStorage에서 트레이너 정보 가져오기
      }
    }
  }, [dispatch, trainer_number]);

  useEffect(() => {
    if (profile) {
      // 트레이너 상태에 따라 체크박스 초기 상태 설정
      setIsChecked(profile.status === "inactive");
    }
  }, [profile]);

  useEffect(() => {
    if (trainer_number) {
      dispatch(getPtschedule({ trainer_number: trainer_number }))
        .then((response) => {
          if (response.payload) {
            // 응답에서 유저 정보를 추출하여 중복 제거
            const users = response.payload.reduce((acc, curr) => {
              if (!acc.some((user) => user.user_number === curr.user_number)) {
                acc.push({
                  user_number: curr.user_number,
                  user_name: curr.user_name,
                });
              }
              return acc;
            }, []);
            setPaidUsers(users);
          }
        })
        .catch((error) => console.error("Error fetching PT schedule:", error));
    }
  }, [dispatch, trainer_number]);

  const ptNumbers = pt_schedule.map((item) => item.pt_number); // pt_number 배열로 가져오기

  // fetchScheduleRecords 함수
  const fetchScheduleRecords = async () => {
    try {
      // pt_number 배열을 순차적으로 처리
      await Promise.all(
        ptNumbers.map((pt_number) => dispatch(getScheduleRecord(pt_number)))
      );
      setIsFetched(true); // 데이터 fetch가 완료된 후 상태 업데이트
    } catch (error) {
      console.error("Error fetching schedule records:", error);
    }
  };

  useEffect(() => {
    // ptNumbers가 비어있지 않고, isFetched가 false일 때만 데이터 fetch
    if (ptNumbers.length > 0 && !isFetched) {
      fetchScheduleRecords();
    }
  }, [dispatch, ptNumbers, isFetched]); // ptNumbers나 isFetched 상태가 변경될 때만 호출

  useEffect(() => {
    if (schedule_record) {
      console.log("Schedule Record:", schedule_record);
    }
  }, [schedule_record]); // schedule_record가 변경될 때만 호출

  useEffect(() => {
    // pt_schedule에서 유저 번호를 가져와 유저 정보를 가져오기
    pt_schedule.forEach((schedule) => {
      if (schedule.user_number) {
        dispatch(getUser(schedule.user_number)) // 유저 번호를 통해 유저 정보 가져오기
          .catch((error) => console.error("Error fetching user info:", error));
      }
    });
  }, [pt_schedule, dispatch]);

  // console.log(paidUsers);

  const handleCheckboxChange = async (e) => {
    const newStatus = e.target.checked ? "inactive" : "active";
    setIsChecked(e.target.checked); // 로컬 상태 업데이트

    // 서버에 새로운 상태 업데이트
    await dispatch(
      updateTrainerStatus({ trainer_number: trainer_number, status: newStatus })
    );

    // 상태 업데이트 후 최신 트레이너 정보 가져오기
    dispatch(getTrainer(trainer_number));
  };

  // 유저 모달 열기, user_number를 UserModal에 전달
  const handleOpenUserModal = (pt_number) => {
    openModal(<UserModal pt_number={pt_number} />);
  };

  // 수업 예약 모달 열기, pt_number와 user_number를 전달
  const handleOpenScheduleModal = (pt_number, user_number) => {
    openModal(
      <CreateScheduleModal
        pt_number={pt_number}
        user_number={user_number} // 올바르게 해당 유저의 user_number를 전달
      />
    );
  };

  const handleOpenEditModal = (schedule) => {
    setSelectedSchedule(schedule); // 선택된 예약 정보 저장
    openModal(
      <EditScheduleModal
        schedule={schedule}
        onUpdate={handleUpdateSchedule}
        onDelete={handleDeleteSchedule}
      />
    ); // 수정 모달 열기
  };

  const handleDeleteSchedule = (schedule_number) => {
    dispatch(deletePtSchedule(schedule_number)); // 예약 삭제 액션 dispatch
  };

  const handleUpdateSchedule = (updatedSchedule) => {
    dispatch(patchPtSchedule(updatedSchedule)); // 예약 수정 액션 dispatch
  };

  // console.log(user_number);
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
          {/* 프로필 사진 */}
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

          {/* 텍스트 정보와 체크박스 */}
          <div className="flex-1">
            {/* 체크박스 */}
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
      {pt_schedule && pt_schedule.length > 0
        ? pt_schedule.map((schedule) => (
            <div
              key={schedule.pt_number}
              className="bg-white rounded-lg shadow-md p-4 mb-4"
            >
              <h2 className="text-lg font-semibold mb-2">내 회원 관리</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p>{schedule.user_name} 회원님</p> {/* 유저 이름 */}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenUserModal(schedule)} // 유저 정보 확인
                    className="px-3 py-1 bg-blue-300 text-sm rounded-md"
                  >
                    유저 인바디 확인하기
                  </button>
                  <button
                    onClick={() => navigate("/trainerChat")} // 1:1 채팅 페이지로 이동
                    className="px-3 py-1 bg-pink-300 text-sm rounded-md"
                  >
                    1:1 채팅하기
                  </button>
                  <button
                    onClick={() => handleOpenScheduleModal(schedule)} // PT 번호와 함께 수업 예약 모달 열기
                    className="px-3 py-1 bg-green-300 text-sm rounded-md"
                  >
                    수업 예약하기
                  </button>
                </div>
              </div>
            </div>
          ))
        : null}

      {/* 예약된 수업 섹션 */}
      {Array.isArray(schedule_record) && schedule_record.length > 0 ? (
        schedule_record.map((schedule) => (
          <div
            key={schedule.schedule_number}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">예약된 수업</h2>
              <span className="text-sm text-gray-500">
                {new Date(schedule.class_date).toLocaleDateString()}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                {schedule.address}
              </span>
              <button
                onClick={() =>
                  handleOpenScheduleModal(
                    schedule.pt_number,
                    schedule.user_number
                  )
                } // 예약 수정 모달 호출
                className="text-center px-3 py-1 bg-blue-300 text-sm rounded-md"
              >
                수업 예약하기
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>예약된 수업이 없습니다.</p>
      )}
    </div>
  );
};

export default TrainerMypage;
