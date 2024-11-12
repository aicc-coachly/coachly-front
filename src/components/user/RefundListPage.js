// src/pages/RefundListPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRefund, getAllRefunds } from '../../redux/slice/refundSlice';
import { useModal } from '../common/ModalProvider';
import { RefundPTModal } from './RefundPTModal';
import { getPtschedule } from '../../redux/slice/paymentSlice';

const RefundListPage = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const error = useSelector((state) => state.refund.error);
  const user_number = useSelector((state) => state.user.userInfo?.user_number);
  const [localRefunds, setLocalRefunds] = useState([]);
  const [ptScheduleNumbers, setPtScheduleNumbers] = useState([]);

  useEffect(() => {
    // getPtschedule에 { user_number } 객체 형태로 전달
    dispatch(getPtschedule({ user_number }))
      .unwrap()
      .then((schedules) => {
        const userSchedules = schedules
          .filter((schedule) => schedule.user_number === user_number)
          .map((schedule) => schedule.pt_number);
        setPtScheduleNumbers(userSchedules);

        // ptScheduleNumbers를 기반으로 getAllRefunds 호출
        return dispatch(getAllRefunds()).unwrap();
      })
      .then((fetchedRefunds) => {
        // 'delete' 상태가 아니며 사용자의 스케줄에 해당하는 환불 항목만 저장
        const activeRefunds = fetchedRefunds.filter(
          (refund) =>
            refund.status !== 'delete' &&
            ptScheduleNumbers.includes(refund.pt_number)
        );
        setLocalRefunds(activeRefunds);
      })
      .catch((error) => {
        console.error('목록을 불러오는 중 오류가 발생했습니다:', error);
      });
  }, [dispatch, user_number]);

  const handleCancelRefund = (refund_number) => {
    dispatch(deleteRefund(refund_number))
      .unwrap()
      .then(() => {
        console.log('Refund canceled successfully');
        setLocalRefunds((prevRefunds) =>
          prevRefunds.filter((refund) => refund.refund_number !== refund_number)
        );
      })
      .catch((error) => {
        console.error('환불을 취소하는 중 오류가 발생했습니다:', error);
      });
  };

  const handleEditRefund = (refund) => {
    const onEditSuccess = (updatedRefund) => {
      setLocalRefunds((prevRefunds) =>
        prevRefunds.map((item) =>
          item.refund_number === updatedRefund.refund_number
            ? updatedRefund
            : item
        )
      );
    };

    openModal(
      <RefundPTModal
        refundData={refund}
        isEditMode={true}
        onEditSuccess={onEditSuccess}
      />
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center p-4">
      <div className="w-full max-w-[390px] mt-4">
        <h1 className="text-2xl font-bold mb-4 text-[#081f5c] text-center">
          환불 요청 목록
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        {!error && localRefunds.length > 0 ? (
          <ul className="space-y-4">
            {localRefunds.map((refund) => (
              <li
                key={refund.refund_number}
                className="p-4 bg-white border border-[#d0e3ff] rounded-lg shadow-md"
              >
                <p className="font-semibold text-[#081f5c]">
                  환불 등록 일시:{' '}
                  {new Date(refund.refund_date).toISOString().split('T')[0]}
                </p>
                <p className="font-semibold text-[#081f5c]">
                  환불 사유: {refund.refund_reason}
                </p>
                <p className="text-[#081f5c]">
                  환불 상태:{' '}
                  <span
                    className={`font-semibold ${
                      refund.status === 'completed'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }`}
                  >
                    {refund.status === 'completed' ? '완료' : '진행 중'}
                  </span>
                </p>
                {refund.status !== 'completed' && (
                  <div className="flex mt-4 space-x-2">
                    <button
                      className="px-4 py-2 w-1/2 bg-[#081f5c] text-white rounded hover:bg-[#4831D4]"
                      onClick={() => handleEditRefund(refund)}
                    >
                      수정
                    </button>
                    <button
                      className="px-4 py-2 w-1/2 bg-[#00A5E3] text-white rounded hover:bg-[#006F8C]"
                      onClick={() => handleCancelRefund(refund.refund_number)}
                    >
                      환불 취소
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-[#081f5c] mt-6">
            환불 요청이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default RefundListPage;
