import React, { useEffect, useState } from 'react';
import { useModal } from '../../components/common/ModalProvider';
import { EditScheduleModal } from '../../components/trainer/EditScheduleModal';
import { CreateScheduleModal } from '../../components/trainer/CreateScheduleModal';
import { UserModal } from '../../components/user/UserModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTrainer,
  updateTrainerStatus,
} from '../../redux/slice/trainerSlice';
import { setTrainer } from '../../redux/slice/authSlice';
import { getPtschedule } from '../../redux/slice/paymentSlice';
import {
  deletePtSchedule,
  getScheduleRecord,
  patchPtSchedule,
} from '../../redux/slice/scheduleSlice';
import { getUser } from '../../redux/slice/userSlice';
import { CheckScheduleModal } from '../../components/trainer/CheckScheduleModal';

const TrainerMypage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scheduleRecords, setScheduleRecords] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const trainer_number = useSelector(
    (state) => state.auth?.trainer?.trainer_number
  );
  const profile = useSelector((state) => state.trainer?.data);
  const pt_schedule = useSelector((state) => state.payment?.data) || [];

  const path = 'http://localhost:8000';

  // Trainer 정보를 가져오는 useEffect
  useEffect(() => {
    if (trainer_number) {
      dispatch(getTrainer(trainer_number));
    } else {
      const storedTrainer = JSON.parse(localStorage.getItem('trainer'));
      if (storedTrainer) {
        dispatch(setTrainer(storedTrainer));
      }
    }
  }, [dispatch, trainer_number]);

  // 트레이너 상태 설정
  useEffect(() => {
    if (profile) {
      setIsChecked(profile.status === 'inactive');
    }
  }, [profile]);

  // PT 스케줄 가져오기
  useEffect(() => {
    if (trainer_number) {
      dispatch(getPtschedule({ trainer_number }));
    }
  }, [dispatch, trainer_number]);

  // 스케줄 레코드 가져오기
  const fetchScheduleRecords = async () => {
    try {
      const allRecords = await Promise.all(
        pt_schedule.map(async (item) => {
          const result = await dispatch(getScheduleRecord(item.pt_number));
          return result.payload;
        })
      );

      const mergedRecords = allRecords
        .map((record) => record?.schedule_records || [])
        .flat();

      setScheduleRecords(mergedRecords);
      setIsFetched(true);
    } catch (error) {
      console.error('Error fetching schedule records:', error);
    }
  };

  useEffect(() => {
    if (!isFetched && pt_schedule.length > 0) {
      fetchScheduleRecords();
    }
  }, [isFetched, pt_schedule]);

  // 유저 정보 가져오기
  useEffect(() => {
    pt_schedule.forEach((schedule) => {
      if (schedule.user_number) {
        dispatch(getUser(schedule.user_number)).catch((error) =>
          console.error('Error fetching user info:', error)
        );
      }
    });
  }, [pt_schedule, dispatch]);

  // 트레이너 상태 변경 핸들러
  const handleCheckboxChange = async (e) => {
    const newStatus = e.target.checked ? 'inactive' : 'active';
    setIsChecked(e.target.checked);

    try {
      await dispatch(
        updateTrainerStatus({ trainer_number, status: newStatus })
      );
      dispatch(getTrainer(trainer_number));
    } catch (error) {
      console.error('Error updating trainer status:', error);
    }
  };

  // 모달 관련 핸들러
  const handleOpenUserModal = (pt_number) => {
    openModal(<UserModal pt_number={pt_number} />);
  };

  const handleOpenScheduleModal = (pt_number, user_number) => {
    openModal(
      <CreateScheduleModal pt_number={pt_number} user_number={user_number} />
    );
  };

  const handleOpenPtScheduleModal = (schedule) => {
    openModal(
      <CheckScheduleModal
        schedule={schedule}
        onUpdate={handleUpdateSchedule}
        onDelete={handleDeleteSchedule}
      />
    );
  };

  const handleDeleteSchedule = (schedule_number) => {
    dispatch(deletePtSchedule(schedule_number));
  };

  const handleUpdateSchedule = (updatedSchedule) => {
    dispatch(patchPtSchedule(updatedSchedule));
  };

  const handleMyInfoUpdate = () => {
    navigate('/trainerprofile', { state: { profile } });
  };

  // 중복된 유저 제거
  const uniqueSchedules = pt_schedule
    .filter((schedule) => schedule.status !== 'completed')
    .reduce((acc, schedule) => {
      if (!acc.some((item) => item.user_number === schedule.user_number)) {
        acc.push(schedule);
      }
      return acc;
    }, []);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={handleMyInfoUpdate}
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden">
            {profile?.image ? (
              <img
                src={`${path}/${profile.image}`}
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
            <p className="mt-2 text-base font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <div className="flex mt-2 space-x-2">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.trainer_address}
                {profile?.trainer_detail_address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {uniqueSchedules.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">내 회원 관리</h2>
          {uniqueSchedules.map((schedule) => (
            <div
              key={schedule.pt_number}
              className="flex items-center justify-between"
            >
              <p>{schedule.user_name} 회원님</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenUserModal(schedule)}
                  className="px-3 py-1 bg-blue-300 text-sm rounded-md"
                >
                  유저 인바디 확인하기
                </button>
                <button
                  onClick={() => navigate('/trainerChat')}
                  className="px-3 py-1 bg-pink-300 text-sm rounded-md"
                >
                  1:1 채팅하기
                </button>
                <button
                  onClick={() => handleOpenScheduleModal(schedule)}
                  className="px-3 py-1 bg-green-300 text-sm rounded-md"
                >
                  수업 예약하기
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {scheduleRecords.length > 0 ? (
        scheduleRecords
          .filter((schedule) => schedule.status !== 'deleted')
          .map((schedule) => (
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
                  onClick={() => handleOpenPtScheduleModal(schedule)}
                  className="text-center px-3 py-1 bg-blue-300 text-sm rounded-md"
                >
                  수업 확인
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
