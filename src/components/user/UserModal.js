import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../common/ModalProvider";
import { BodyCompositionModal } from "./BodyCompositionModal";
import { InbodyDetailModal } from "./InbodyDetailModal"; // 새로운 모달 임포트
import { getUser, getUserInbody } from "../../redux/slice/userSlice"; // 인바디 정보 조회 함수 임포트

export const UserModal = ({ pt_number }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const user_number = pt_number.user_number; // 유저 번호
  const inbodyInfo = useSelector((state) => state.user?.inbodyData); // Redux에서 인바디 정보 가져오기
  const userInfo = useSelector((state) => state.user?.userInfo);

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    // 생일 정보가 'YYYY-MM-DDTHH:mm:ss.sssZ' 형식으로 되어 있으면
    const birth = new Date(birthDate);
    const today = new Date();

    // 생일이 올바르게 처리되지 않았다면 반환할 수 있도록 처리
    if (isNaN(birth)) {
      console.error("Invalid birth date", birthDate);
      return null;
    }

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // 생일이 지나지 않았으면 나이를 하나 뺀다
    if (
      month < birth.getMonth() ||
      (month === birth.getMonth() && day < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(userInfo?.birth);

  // console.log(userInfo);

  useEffect(() => {
    // user_number를 이용해 인바디 정보 가져오기
    if (user_number) {
      dispatch(getUserInbody(user_number));
      dispatch(getUser(user_number));
    }
  }, [dispatch, user_number]);

  // BodyCompositionModal을 열 때 호출되는 함수
  const handleOpenBodyCompositionModal = (date) => {
    openModal(<BodyCompositionModal date={date} />);
  };

  // 날짜 클릭 시 해당 날짜의 인바디 상세 정보 보기
  const handleOpenInbodyDetailModal = (date) => {
    const selectedInbody = inbodyInfo.filter(
      (info) =>
        new Date(info.user_measurement_date).toLocaleDateString() === date
    )[0]; // 선택된 날짜에 해당하는 인바디 정보 찾기
    openModal(<InbodyDetailModal inbodyInfo={selectedInbody} />); // 해당 날짜의 인바디 정보 전달
  };

  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-4">{userInfo?.name}</h2>

      {/* 사용자 정보 */}
      <div className="text-sm text-center mb-4">
        <p>
          연령: 만{age} 성별: {userInfo?.gender === "male" ? "남" : "여"}
        </p>
        <p>전화번호: {userInfo?.phone}</p>
      </div>

      {/* 체성분 정보 타이틀 */}
      <div className="text-sm font-semibold text-center mb-2">체성분 정보</div>

      {/* 날짜 버튼 리스트 */}
      <div className="flex flex-col gap-2">
        {inbodyInfo && inbodyInfo.length > 0 ? (
          inbodyInfo.map((info) => (
            <button
              key={info.user_inbody_number}
              onClick={() =>
                handleOpenInbodyDetailModal(
                  new Date(info.user_measurement_date).toLocaleDateString()
                )
              }
              className="w-full bg-pink-200 py-2 rounded text-black font-semibold"
            >
              {new Date(info.user_measurement_date).toLocaleDateString()}
            </button>
          ))
        ) : (
          <p>인바디 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
