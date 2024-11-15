// src/pages/PtScheduleList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPtschedule } from '../../redux/slice/paymentSlice';
import { createRefund } from '../../redux/slice/refundSlice';
import { useModal } from '../common/ModalProvider';
import { RefundPTModal } from './RefundPTModal';
import { Link, useLocation } from 'react-router-dom';

const PtScheduleList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const user_number = useSelector(
    (state) => state.auth?.user?.user_number || state.user?.user_number
  );

  const [ptSchedules, setPtSchedules] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false); // 완료된 스케줄 보기 토글
  const [showInProgress, setShowInProgress] = useState(true); // 진행 중인 스케줄 보기 토글
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 3; // 페이지 당 항목 수

  useEffect(() => {
    dispatch(getPtschedule({ user_number }))
      .unwrap()
      .then((schedules) => {
        const userSchedules = schedules.filter(
          (schedule) => schedule.user_number === user_number
        );
        setPtSchedules(userSchedules);
      })
      .catch((error) => {
        console.error('PT 스케줄을 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [dispatch, user_number]);

  const handleRefundRequest = (schedule) => {
    const onRequestSuccess = (newRefund) => {
      console.log('환불 신청이 완료되었습니다:', newRefund);
    };

    openModal(
      <RefundPTModal
        schedule={schedule}
        onRequestSuccess={onRequestSuccess}
        isEditMode={false} // 새로운 환불 신청 모드
      />
    );
  };

  // 완료된 스케줄과 진행 중인 스케줄을 필터링
  const filteredSchedules = ptSchedules.filter((schedule) => {
    if (showCompleted && schedule.status === 'completed') return true;
    if (showInProgress && schedule.status !== 'completed') return true;
    return false;
  });

  // 페이지네이션
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const paginatedSchedules = filteredSchedules.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">
        <h1 className="text-2xl font-bold mb-6 text-[#081f5c] text-center">
          내 PT 스케줄
        </h1>

        {/* 필터 체크박스 */}
        <div className="flex justify-around mb-6">
          <label className="flex items-center text-[#081f5c] font-medium">
            <input
              type="checkbox"
              checked={showInProgress}
              onChange={() => setShowInProgress(!showInProgress)}
              className="mr-2"
            />
            진행 중
          </label>
          <label className="flex items-center text-[#081f5c] font-medium">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="mr-2"
            />
            완료
          </label>
        </div>

        {/* 필터링된 PT 스케줄 목록 */}
        {paginatedSchedules.length > 0 ? (
          <ul className="space-y-4">
            {paginatedSchedules.map((schedule) => (
              <li
                key={schedule.pt_number}
                className="p-4 bg-white border border-[#d0e3ff] rounded-lg shadow-md"
              >
                <p className="font-semibold text-[#081f5c] mb-2">
                  PT 트레이너:{' '}
                  <span className="text-gray-700">{schedule.trainer_name}</span>
                </p>
                <p className="text-[#081f5c] mb-2">
                  상태:{' '}
                  <span
                    className={`font-semibold ${
                      schedule.status === 'completed'
                        ? 'text-green-500'
                        : schedule.status === 'refund'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {schedule.status === 'completed'
                      ? '완료'
                      : schedule.status === 'refund'
                      ? '환불 진행 중'
                      : '수업 진행 중'}
                  </span>
                </p>
                {schedule.status !== 'completed' && (
                  <button
                    className="mt-4 w-full px-4 py-2 bg-[#00A5E3] text-white rounded hover:bg-[#006F8C]"
                    onClick={() => handleRefundRequest(schedule)}
                  >
                    환불 신청
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[#081f5c] mt-6">
            조건에 맞는 스케줄이 없습니다.
          </p>
        )}

        {/* 페이지네이션 버튼 */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md text-sm`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            다음
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-md shadow-md mt-4 mb-4">
        <p className="text-gray-700">
          환불 내역을 확인하려면 아래 링크를 클릭하세요.
        </p>
        <Link
          to={{ pathname: '/userrefund', state: { user_number } }}
          className="text-blue-500 font-semibold hover:underline block mt-2"
        >
          환불 신청 내역
        </Link>
      </div>
    </div>
  );
};

export default PtScheduleList;
