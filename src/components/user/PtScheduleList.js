// src/pages/PtScheduleList.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPtschedule } from "../../redux/slice/paymentSlice";
import { createRefund } from "../../redux/slice/refundSlice";
import { useModal } from "../common/ModalProvider";
import { RefundPTModal } from "./RefundPTModal";
import { useLocation } from "react-router-dom";

const PtScheduleList = () => {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const user_number = useSelector((state) => state.user.userInfo?.user_number);
  const [ptSchedules, setPtSchedules] = useState([]);
  const location = useLocation();
  const { pt_schedule } = location.state || {};

  //   console.log(pt_schedule);

  useEffect(() => {
    if (user_number) {
      // user_number 또는 trainer_number 중 하나만 있으면 스케줄을 가져옵니다.
      dispatch(
        getPtschedule({
          user_number: user_number,
        })
      );
    }
  }, [dispatch, user_number]);

  const handleRefundRequest = (pt_number) => {
    const onRequestSuccess = (newRefund) => {
      console.log("환불 신청이 완료되었습니다:", newRefund);
    };

    openModal(
      <RefundPTModal
        pt_schedule={pt_schedule}
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
        {pt_schedule.length > 0 ? (
          <ul className="space-y-4">
            {pt_schedule.map((schedule) => (
              <li
                key={schedule.pt_number}
                className="p-4 bg-white border border-[#d0e3ff] rounded-lg shadow-md"
              >
                <p className="font-semibold text-[#081f5c]">
                  PT 담당 트레이너:
                  {schedule.trainer_name}
                </p>
                <p className="text-[#081f5c]">
                  상태:{" "}
                  <span
                    className={`font-semibold ${
                      schedule.status === "completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {schedule.status === "completed" ? "완료" : "수업 진행 중"}
                  </span>
                </p>
                {schedule.status !== "completed" && (
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
