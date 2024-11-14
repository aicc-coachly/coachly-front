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
import { createChatRoom } from '../../redux/thunks/chatThunks';

// 페이지네이션 컴포넌트 정의
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`mx-1 px-2 py-1 ${
            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
          } rounded-md`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
      >
        다음
      </button>
    </div>
  );
};

const TrainerMypage = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [scheduleRecords, setScheduleRecords] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [trainerPage, setTrainerPage] = useState(1);
  const [classPage, setClassPage] = useState(1);
  const itemsPerPage = 3;
  const trainer_number = useSelector(
    (state) => state.auth?.trainer?.trainer_number
  );
  const profile = useSelector((state) => state.trainer?.data);
  const pt_schedule = useSelector((state) => state.payment?.data) || [];
  const path = 'http://localhost:8000';

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

  useEffect(() => {
    if (profile) {
      setIsChecked(profile.status === 'inactive');
    }
  }, [profile]);

  useEffect(() => {
    if (trainer_number) {
      dispatch(getPtschedule({ trainer_number }));
    }
  }, [dispatch, trainer_number]);

  const fetchScheduleRecords = async () => {
    try {
      const allRecords = await Promise.all(
        pt_schedule.map(async (item) => {
          const result = await dispatch(getScheduleRecord(item.pt_number));
          return result.payload;
        })
      );
      const mergedRecords = allRecords.flatMap(
        (record) => record?.schedule_records || []
      );
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

  useEffect(() => {
    pt_schedule.forEach((schedule) => {
      if (schedule.user_number) {
        dispatch(getUser(schedule.user_number)).catch((error) =>
          console.error('Error fetching user info:', error)
        );
      }
    });
  }, [pt_schedule, dispatch]);

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

  const handleOpenUserModal = (pt_number) =>
    openModal(<UserModal pt_number={pt_number} />);
  const handleOpenScheduleModal = (schedule) =>
    openModal(<CreateScheduleModal schedule={schedule} />);
  const handleOpenPtScheduleModal = (schedule) =>
    openModal(
      <CheckScheduleModal
        schedule={schedule}
        onUpdate={handleUpdateSchedule}
        onDelete={handleDeleteSchedule}
      />
    );
  const handleDeleteSchedule = (schedule_number) =>
    dispatch(deletePtSchedule(schedule_number));
  const handleUpdateSchedule = (updatedSchedule) =>
    dispatch(patchPtSchedule(updatedSchedule));
  const handleMyInfoUpdate = () =>
    navigate('/trainerprofile', { state: { profile } });

  const uniqueSchedules = pt_schedule
    .filter((schedule) => schedule.status !== 'completed')
    .reduce((acc, schedule) => {
      if (!acc.some((item) => item.user_number === schedule.user_number)) {
        acc.push(schedule);
      }
      return acc;
    }, []);

  const trainerTotalPages = Math.ceil(uniqueSchedules.length / itemsPerPage);
  const trainerItems = uniqueSchedules.slice(
    (trainerPage - 1) * itemsPerPage,
    trainerPage * itemsPerPage
  );
  const classTotalPages = Math.ceil(scheduleRecords.length / itemsPerPage);
  const classItems = scheduleRecords
    .filter((schedule) => schedule.status !== 'deleted')
    .slice((classPage - 1) * itemsPerPage, classPage * itemsPerPage);

  const handleChat = async (user_number) => {
    if (!user_number || !trainer_number) {
      console.error('user_number 또는 trainer_number가 정의되지 않았습니다.', {
        user_number,
        trainer_number,
      });
      return;
    }

    try {
      const response = await dispatch(
        createChatRoom({ user_number, trainer_number })
      );

      if (response?.payload?.room_id) {
        navigate(`/chatRoom/${response.payload.room_id}`);
      } else {
        console.warn(
          'API 응답에서 room_id가 반환되지 않았습니다.',
          response.payload
        );
      }
    } catch (error) {
      console.error('채팅방 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">내 정보</h2>
        <button
          onClick={handleMyInfoUpdate}
          className="absolute top-4 right-4 px-4 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-gray-200"
        >
          수정하기
        </button>
        <div className="flex items-start mt-6 space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            {profile?.image ? (
              <img
                src={`${path}/${profile.image}`}
                alt="트레이너 프로필 사진"
                className="object-cover w-full h-full"
              />
            ) : (
              <p className="text-center text-gray-500 text-sm">이미지 없음</p>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-end mb-4">
              <label className="inline-flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-gray-400 rounded focus:ring-0"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm">수업 그만 받기</span>
              </label>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {profile?.name}
            </p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <div className="flex mt-4">
              <p className="px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-lg">
                {profile?.trainer_address} {profile?.trainer_detail_address}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 내 회원 관리 섹션 */}
      {uniqueSchedules.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">내 회원 관리</h2>
          {trainerItems.map((schedule) => (
            <div
              key={schedule.pt_number}
              className="border border-gray-200 rounded-lg p-4 mb-4 transition hover:shadow-md"
            >
              <p className="text-base font-medium text-gray-800 mb-2">
                {schedule.user_name} 회원님
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenUserModal(schedule.pt_number)}
                  className="px-3 py-1 bg-blue-100 text-sm text-blue-700 rounded-md hover:bg-blue-200"
                >
                  인바디 확인
                </button>
                <button
                  onClick={() => handleChat(schedule.user_number)}
                  className="px-3 py-1 bg-red-100 text-sm text-red-700 rounded-md hover:bg-pink-200"
                >
                  1:1 채팅
                </button>
                <button
                  onClick={() => handleOpenScheduleModal(schedule)}
                  className="px-3 py-1 bg-green-100 text-sm text-green-700 rounded-md hover:bg-green-200"
                >
                  수업 예약
                </button>
              </div>
            </div>
          ))}
          <Pagination
            currentPage={trainerPage}
            totalPages={trainerTotalPages}
            onPageChange={setTrainerPage}
          />
        </div>
      )}

      {/* 예약된 수업 섹션 */}
      {scheduleRecords.length > 0 ? (
        classItems.map((schedule) => (
          <div
            key={schedule.schedule_number}
            className="bg-white rounded-lg shadow-md p-6 mb-6 transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                예약된 수업
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {new Date(schedule.class_date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">
                  {schedule.address}
                </span>
              </div>
              <button
                onClick={() => handleOpenPtScheduleModal(schedule)}
                className="px-4 py-1 bg-blue-100 text-sm text-blue-700 rounded-md hover:bg-blue-200"
              >
                확인
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">예약된 수업이 없습니다.</p>
      )}
      <Pagination
        currentPage={classPage}
        totalPages={classTotalPages}
        onPageChange={setClassPage}
      />
    </div>
  );
};

export default TrainerMypage;
