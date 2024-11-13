import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../components/common/ModalProvider';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css'; // 날짜 선택을 위한 스타일
import {
  patchPtSchedule,
  deletePtSchedule,
  completePtSchedule, // 완료 액션 임포트
} from '../../redux/slice/scheduleSlice'; // Redux 액션 임포트

export const CheckScheduleModal = ({ schedule, onUpdate, onDelete }) => {
  const { closeModal } = useModal(); // 모달 닫기 함수
  const dispatch = useDispatch(); // Redux dispatch
  const [newAddress, setNewAddress] = useState(schedule?.address || ''); // 수정 가능한 장소
  const [newClassTime, setNewClassTime] = useState(schedule?.class_time || ''); // 수정 가능한 시간
  const [newClassDate, setNewClassDate] = useState(
    schedule ? new Date(schedule.class_date) : new Date()
  ); // 수정 가능한 날짜
  const scheduleData = useSelector(
    (state) => state.schedule?.data?.schedule_records
  ); // 상태 선택
  const trainerId = useSelector((state) => state.trainer?.data?.trainer_id);
  const userId = useSelector((state) => state.auth?.user?.user_id);
  // console.log(user);

  // 일정 수정 처리
  const handleUpdate = async () => {
    try {
      const updatedSchedule = {
        schedule_number: schedule.schedule_number,
        class_date: newClassDate, // 새로 선택된 날짜
        class_time: newClassTime, // 새로 선택된 시간
        address: newAddress, // 새로 입력된 장소
      };

      // 업데이트 액션 dispatch (서버로 요청)
      await dispatch(
        patchPtSchedule({
          schedule_number: schedule.schedule_number,
          updateData: updatedSchedule,
        })
      );

      // 상태 업데이트가 성공한 후 모달을 닫음
      closeModal();
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  // PT 일정 완료 처리 (유저가 클릭할 때)
  const handleComplete = async () => {
    try {
      // PT 일정 완료 요청을 보냄
      await dispatch(completePtSchedule(schedule.schedule_number));
      closeModal(); // 완료 후 모달 닫기
    } catch (error) {
      console.error('완료 처리 실패', error);
      // 실패 처리 (예: 알림 표시)
    }
  };

  // 일정 삭제 처리
  const handleDelete = () => {
    const updateData = {
      status: 'deleted',
      class_date: null,
      class_time: null,
      address: null,
    }; // 상태만 전달
    dispatch(
      deletePtSchedule({
        schedule_number: schedule.schedule_number,
        updateData,
      })
    );
    closeModal(); // 모달 닫기
  };

  // "확인" 버튼 클릭 시 모달 닫기
  const handleConfirm = () => {
    closeModal();
  };

  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg relative">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
        {schedule.user_name}님의 예약
      </h2>

      {/* 장소 수정 */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-2">
          장소
        </label>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="bg-gray-100 text-sm text-gray-700 p-2 rounded w-full border border-gray-200 focus:border-blue-300 focus:outline-none"
        />
      </div>

      {/* 일시 수정 */}
      <div className="mb-5">
        <label className="text-sm font-semibold text-gray-600 block mb-2">
          일시
        </label>
        <div className="flex gap-3">
          {/* 날짜 선택 */}
          <DatePicker
            selected={newClassDate}
            onChange={(date) => setNewClassDate(date)} // 날짜 선택 시 상태 업데이트
            dateFormat="yyyy-MM-dd"
            className="bg-gray-100 text-sm text-gray-700 p-2 rounded w-full border border-gray-200 focus:border-blue-300 focus:outline-none"
            placeholderText="날짜 선택"
          />

          {/* 시간 선택 */}
          <input
            type="time"
            value={newClassTime}
            onChange={(e) => setNewClassTime(e.target.value)} // 시간 선택 시 상태 업데이트
            className="bg-gray-100 text-sm text-gray-700 p-2 rounded w-24 border border-gray-200 focus:border-blue-300 focus:outline-none"
          />
        </div>
      </div>

      {/* 수정, 완료 및 삭제 버튼 */}
      <div className="flex justify-between mt-6 space-x-3">
        {trainerId ? (
          // 트레이너일 경우
          <>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded font-medium hover:bg-blue-600 transition"
              onClick={handleUpdate} // 일정 수정
            >
              수정
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded font-medium hover:bg-red-600 transition"
              onClick={handleDelete} // 일정 삭제
            >
              삭제
            </button>
          </>
        ) : userId ? (
          // 유저일 경우
          <button
            className="bg-green-500 text-white py-2 px-4 rounded font-medium hover:bg-green-600 transition"
            onClick={handleComplete} // PT 일정 완료
          >
            완료
          </button>
        ) : null}

        {/* 공통 확인 버튼 */}
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded font-medium hover:bg-gray-600 transition"
          onClick={handleConfirm} // 확인 (모달 닫기)
        >
          확인
        </button>
      </div>
    </div>
  );
};
