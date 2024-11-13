import React, { useEffect, useState } from 'react';
import { useModal } from '../../components/common/ModalProvider';
import { useNavigate } from 'react-router-dom';
import { CheckScheduleModal } from '../../components/trainer/CheckScheduleModal';
import { BodyCompositionModal } from '../../components/user/BodyCompositionModal';
import { EditBodyCompositionModal } from '../../components/user/EditBodyCompositionModal';

import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserInbody } from '../../redux/slice/userSlice';
import { setUser } from '../../redux/slice/authSlice';
import { getPtschedule } from '../../redux/slice/paymentSlice';
import { getScheduleRecord } from '../../redux/slice/scheduleSlice';

// 중복 트레이너 제거 함수
const getUniqueTrainers = (schedule) => {
  const uniqueTrainers = [];
  const trainerNames = new Set();

  for (const item of schedule) {
    if (!trainerNames.has(item.trainer_name)) {
      uniqueTrainers.push(item);
      trainerNames.add(item.trainer_name);
    }
  }

  return uniqueTrainers;
};
import { createChatRoom } from "../../redux/thunks/chatThunks";

function UserMypage() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const user_number = useSelector((state) => state.auth?.user?.user_number);

  const inbodyData = useSelector((state) => {
    const userInbodyData = Array.isArray(state.user?.inbodyData)
      ? state.user.inbodyData
      : [];
    return userInbodyData.filter((data) => data.user_number === user_number);
  });
  const [scheduleRecords, setScheduleRecords] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const maxPageButtons = 5;
  const profile = useSelector((state) => state.user?.userInfo);
  const pt_schedule = useSelector((state) => state.payment?.data) || [];
  const userInfo = useSelector((state) => state.user?.userInfo);

  // 페이지네이션 상태 추가
  const [trainerPage, setTrainerPage] = useState(1);
  const [classPage, setClassPage] = useState(1);

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  };

  useEffect(() => {
    if (user_number) {
      dispatch(getUser(user_number));
      dispatch(getUserInbody(user_number));
    } else {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        dispatch(setUser(storedUser));
      }
    }
  }, [dispatch, user_number]);

  const fetchScheduleRecords = async () => {
    try {
      const allRecords = await Promise.all(
        ptNumbers.map(async (pt_number) => {
          const result = await dispatch(getScheduleRecord(pt_number));
          return result.payload;
        })
      );

      const mergedRecords = allRecords
        .map((record) => record.schedule_records)
        .flat();

      setScheduleRecords(mergedRecords);
      setIsFetched(true);
    } catch (error) {
      console.error('Error fetching schedule records:', error);
    }
  };

  useEffect(() => {
    if (user_number) {
      dispatch(getPtschedule({ user_number }));
    }
  }, [dispatch, user_number]);

  const ptNumbers = Array.isArray(pt_schedule)
    ? pt_schedule.map((item) => item.pt_number)
    : [];

  useEffect(() => {
    if (ptNumbers.length > 0 && !isFetched) {
      fetchScheduleRecords();
    }
  }, [ptNumbers, isFetched]);

  const filteredScheduleRecord = scheduleRecords.filter(
    (schedule) => schedule.status !== 'deleted'
  );

  const filteredItems = inbodyData.filter((inbody) => inbody.status);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 중복을 제거한 트레이너 목록 생성
  const uniqueTrainers = getUniqueTrainers(pt_schedule);

  // 각 섹션의 페이지네이션 계산
  const trainerItems = uniqueTrainers.slice(
    (trainerPage - 1) * itemsPerPage,
    trainerPage * itemsPerPage
  );
  const trainerTotalPages = Math.ceil(uniqueTrainers.length / itemsPerPage);

  const classItems = filteredScheduleRecord.slice(
    (classPage - 1) * itemsPerPage,
    classPage * itemsPerPage
  );
  const classTotalPages = Math.ceil(
    filteredScheduleRecord.length / itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleTrainerPageChange = (pageNumber) => setTrainerPage(pageNumber);
  const handleClassPageChange = (pageNumber) => setClassPage(pageNumber);

  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleTrainerNext = () =>
    setTrainerPage((prev) => Math.min(prev + 1, trainerTotalPages));
  const handleClassNext = () =>
    setClassPage((prev) => Math.min(prev + 1, classTotalPages));

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleTrainerPrev = () =>
    setTrainerPage((prev) => Math.max(prev - 1, 1));
  const handleClassPrev = () => setClassPage((prev) => Math.max(prev - 1, 1));

  const getPageNumbers = (total) => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(total, startPage + maxPageButtons - 1);
    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // console.log(userId);
  // console.log(profile);
  // navigate("/userptschedule");
  const handleRefundPage = () => {
    navigate("/userptschedule", { state: { pt_schedule } });
  };

  const handleMyInfoUpdate = () => {
    navigate("/userprofile", { state: { userInfo } });
  };

  const handleChat = async (trainer_number) => {
    try {
      if (!user_number || !trainer_number) {
        console.log("pt_schedule:", pt_schedule);
        console.error("user_number 또는 trainer_number가 정의되지 않았습니다.", { user_number, trainer_number });
        return; // 값이 없으면 함수 종료
      }
  
      // 채팅방 생성/확인 요청
      const response = await dispatch(
        createChatRoom({ user_number, trainer_number })
      );
      
      if (response?.payload?.room_id) {
        console.log("채팅방 생성 성공, room_id:", response.payload.room_id);
        navigate(`/chatRoom/${response.payload.room_id}`);
      } else {
        console.warn("API 응답에서 room_id가 반환되지 않았습니다.", response.payload);
      }
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
    }
  };
  

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={handleRefundPage}
          className="absolute top-4 right-[100px] px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          환불신청
        </button>
        <button
          onClick={handleMyInfoUpdate}
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden"></div>
          <div className="flex-1">
            <div className="flex justify-end">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.user_detail_address}
              </p>
            </div>
            <p className="mt-2 text-base font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <p className="text-sm text-gray-500">{profile?.gender}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
        {trainerItems.map((trainer, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-300 p-1 mb-2"
          >
            <p className="text-base text-sm">{trainer.trainer_name}</p>
             <button
                  onClick={() => handleChat(trainer.trainer_number)}
                  className="px-3 py-1 bg-pink-300 text-sm rounded-md"
                >
                  1:1 채팅하기
                </button>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleTrainerPrev}
            disabled={trainerPage === 1}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            이전
          </button>
          {getPageNumbers(trainerTotalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleTrainerPageChange(pageNumber)}
              className={`mx-1 px-2 py-1 ${
                trainerPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleTrainerNext}
            disabled={trainerPage === trainerTotalPages}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            다음
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">예약된 수업</h2>
        {classItems.length > 0 ? (
          classItems.map((schedule) => (
            <div
              key={schedule.schedule_number}
              className="flex items-center justify-between bg-gray-300 p-1 mb-2"
            >
              <p className="text-base text-sm">{schedule.trainer_name}</p>
              <span className="text-sm text-gray-500">
                {new Date(schedule.class_date).toLocaleDateString()}
                {schedule.status === 'completed' && (
                  <span className="text-green-500 ml-2">완료됨</span>
                )}
              </span>
              <button
                onClick={() =>
                  openModal(<CheckScheduleModal schedule={schedule} />)
                }
                className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
              >
                자세히 보기
              </button>
            </div>
          ))
        ) : (
          <p>예약된 수업이 없습니다.</p>
        )}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClassPrev}
            disabled={classPage === 1}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            이전
          </button>
          {getPageNumbers(classTotalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClassPageChange(pageNumber)}
              className={`mx-1 px-2 py-1 ${
                classPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleClassNext}
            disabled={classPage === classTotalPages}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            다음
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <div className="flex justify-between p-2">
          <h2 className="text-lg font-semibold">나의 체성분 기록</h2>
          <button
            onClick={() => openModal(<BodyCompositionModal />)}
            className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {filteredItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((inbody, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-300 p-1 mb-2"
            >
              <p className="text-base text-sm">
                측정날짜: {formatDate(inbody.user_measurement_date)}
              </p>
              <button
                onClick={() =>
                  openModal(<EditBodyCompositionModal inbodyData={inbody} />)
                }
                className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
              >
                더보기
              </button>
            </div>
          ))}

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="mx-1 px-2 py-1 bg-gray-300 rounded-md"
          >
            이전
          </button>
          {getPageNumbers(totalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-2 py-1 ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber}
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
      </div>
    </div>
  );
}

export default UserMypage;
