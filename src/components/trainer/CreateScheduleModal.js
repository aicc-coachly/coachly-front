import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/slice/userSlice'; // 적절한 경로로 설정
import { postPtSchedule } from '../../redux/slice/scheduleSlice'; // postPtSchedule 불러오기
import { useModal } from '../common/ModalProvider';

export const CreateScheduleModal = ({ schedule }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.user.userInfo);
  const [classDate, setClassDate] = useState('');
  const [classTime, setClassTime] = useState('');
  const [classAddress, setClassAddress] = useState(''); // 주소를 입력받을 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user_number = schedule.user_number;
  useEffect(() => {
    dispatch(getUser(user_number)); // 유저 정보 가져오기
  }, [dispatch, user_number]);

  // pt_number 값 출력해서 제대로 받았는지 확인
  console.log('PT Number:', schedule); // pt_number 값 출력

  const handleSubmit = async () => {
    // POST 요청으로 서버에 수업 예약 데이터 보내기
    const scheduleData = {
      pt_number: schedule.pt_number, // PT 번호
      class_date: classDate, // 수업 일자
      class_time: classTime, // 수업 시간
      address: classAddress, // 사용자 입력 주소
    };
    console.log(scheduleData);
    try {
      setIsSubmitting(true);
      // 슬라이스의 postPtSchedule을 사용하여 요청 보내기
      const response = await dispatch(postPtSchedule(scheduleData));
      if (response.error) {
        throw new Error(response.error.message); // 오류 처리
      }
      console.log('Schedule created successfully:', response.payload);
      setIsSubmitting(false);
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error('Failed to create schedule:', error);
      setIsSubmitting(false);
      // 실패 처리 로직 (예: 에러 메시지 표시)
    }
  };
  console.log(schedule.user_name);
  return (
    <div className="max-w-sm p-6 rounded-lg relative">
      <h2 className="text-lg font-bold text-center mb-6">수업 예약하기</h2>

      {/* 회원명 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">회원명</span>
        <input
          type="text"
          value={schedule ? `${schedule.user_name}` : ''}
          readOnly
          className="bg-gray-200 text-sm p-1 rounded text-center"
        />
      </div>

      {/* 장소 (사용자가 입력하는 곳) */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">장소</span>
        <input
          type="text"
          value={classAddress}
          onChange={(e) => setClassAddress(e.target.value)} // 주소 변경 처리
          className="bg-gray-200 text-sm p-1 rounded text-center"
          placeholder="수업 장소를 입력하세요"
        />
      </div>

      {/* 일시 */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold">일시</span>
        <div className="flex gap-2">
          <input
            type="date"
            value={classDate}
            onChange={(e) => setClassDate(e.target.value)}
            className="bg-gray-200 text-sm p-1 rounded text-center w-24"
          />
          <input
            type="time"
            value={classTime}
            onChange={(e) => setClassTime(e.target.value)}
            className="bg-gray-200 text-sm p-1 rounded text-center w-20"
          />
        </div>
      </div>

      {/* 저장하기 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full py-2 rounded text-black font-semibold mt-4 ${
          isSubmitting ? 'bg-gray-300' : 'bg-pink-200'
        }`}
      >
        {isSubmitting ? '수업 예약 중...' : '저장하기'}
      </button>
    </div>
  );
};
