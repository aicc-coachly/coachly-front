// src/pages/PtScheduleList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPtschedule } from '../../redux/slice/paymentSlice';
import { createRefund } from '../../redux/slice/refundSlice';
import { useModal } from '../common/ModalProvider';
import { RefundPTModal } from './RefundPTModal';

const PtScheduleList = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const user_number = useSelector((state) => state.user.userInfo?.user_number);
  const [ptSchedules, setPtSchedules] = useState([]);

  useEffect(() => {
    // 유저가 신청한 PT 스케줄을 가져옴
    dispatch(getPtschedule({ user_number }))
      .unwrap()
      .then((schedules) => {
        const userSchedules = schedules
          .filter((schedule) => schedule.user_number === user_number)
          .map((schedule) => ({
            pt_number: schedule.pt_number,
            pt_date: schedule.pt_date,
            status: schedule.status,
          }));
        setPtSchedules(userSchedules);
      })
      .catch((error) => {
        console.error('PT 스케줄을 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [dispatch, user_number]);

  const handleRefundRequest = (pt_number) => {
    const onRequestSuccess = (newRefund) => {
      console.log('환불 신청이 완료되었습니다:', newRefund);
    };

    openModal(
      <RefundPTModal
        pt_number={pt_number}
        onRequestSuccess={onRequestSuccess}
        isEditMode={false} // 새로운 환불 신청 모드
      />
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">
        <h1 className="text-2xl font-bold mb-4 text-[#081f5c] text-center">
          내 PT 스케줄
        </h1>
        {ptSchedules.length > 0 ? (
          <ul className="space-y-4">
            {ptSchedules.map((schedule) => (
              <li
                key={schedule.pt_number}
                className="p-4 bg-white border border-[#d0e3ff] rounded-lg shadow-md"
              >
                <p className="font-semibold text-[#081f5c]">
                  PT 날짜:{' '}
                  {schedule.created_at
                    ? new Date(schedule.created_at).toISOString().split('T')[0]
                    : '날짜 정보 없음'}
                </p>
                <p className="text-[#081f5c]">
                  상태:{' '}
                  <span
                    className={`font-semibold ${
                      schedule.status === 'completed'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {schedule.status === 'completed' ? '완료' : '진행 중'}
                  </span>
                </p>
                {schedule.status !== 'completed' && (
                  <button
                    className="mt-4 w-full px-4 py-2 bg-[#00A5E3] text-white rounded hover:bg-[#006F8C]"
                    onClick={() => handleRefundRequest(schedule.pt_number)}
                  >
                    환불 신청
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[#081f5c] mt-6">
            신청한 PT가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default PtScheduleList;
