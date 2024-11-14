import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../common/ModalProvider';
import { BodyCompositionModal } from './BodyCompositionModal';
import { InbodyDetailModal } from './InbodyDetailModal'; // 새로운 모달 임포트
import { getUser, getUserInbody } from '../../redux/slice/userSlice'; // 인바디 정보 조회 함수 임포트

export const UserModal = ({ schedule }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();

  const user_number = schedule.user_number; // 유저 번호
  const inbodyInfo = useSelector((state) => state.user?.inbodyData); // Redux에서 인바디 정보 가져오기
  const userInfo = useSelector((state) => state.user?.userInfo);
  console.log(userInfo?.birth);
  console.log(user_number);

  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const today = new Date();

    if (isNaN(birth)) {
      console.error('Invalid birth date', birthDate);
      return null;
    }

    let age = today.getFullYear() - birth.getFullYear();

    // 생일이 지나지 않았다면 나이를 1 감소
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const age = calculateAge(userInfo?.birth);
  console.log('User age:', age);

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
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-md mx-auto relative">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-700">
        {userInfo?.name}
      </h2>

      {/* 사용자 기본 정보 */}
      <div className="text-center mb-6">
        <p className="text-gray-600">
          <strong>연령:</strong> 만{age}
          <span className="ml-4">
            <strong>성별:</strong> {userInfo?.gender === 'male' ? '남' : '여'}
          </span>
        </p>
        <p className="text-gray-600">
          <strong>전화번호:</strong> {userInfo?.phone}
        </p>
      </div>

      {/* 체성분 정보 타이틀 */}
      <div className="text-center text-gray-700 font-semibold text-lg mb-4">
        체성분 정보
      </div>

      {/* 날짜 버튼 리스트 */}
      <div className="grid gap-2">
        {inbodyInfo && inbodyInfo.length > 0 ? (
          inbodyInfo.map((info) => (
            <button
              key={info.user_inbody_number}
              onClick={() =>
                handleOpenInbodyDetailModal(
                  new Date(info.user_measurement_date).toLocaleDateString()
                )
              }
              className="w-full bg-pink-200 py-2 rounded-lg text-gray-800 font-semibold hover:bg-pink-300 transition-colors"
            >
              {new Date(info.user_measurement_date).toLocaleDateString()}
            </button>
          ))
        ) : (
          <p className="text-center text-gray-500">인바디 정보가 없습니다.</p>
        )}
      </div>
    </div>
  );
};
