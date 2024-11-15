import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { useNavigate } from "react-router-dom";
import { CheckScheduleModal } from "../../components/trainer/CheckScheduleModal";
import { BodyCompositionModal } from "../../components/user/BodyCompositionModal";
import { EditBodyCompositionModal } from "../../components/user/EditBodyCompositionModal";

import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserInbody } from '../../redux/slice/userSlice';
import { setUser } from '../../redux/slice/authSlice';
import { getPtschedule } from '../../redux/slice/paymentSlice';
import { getScheduleRecord } from '../../redux/slice/scheduleSlice';
import { createChatRoom } from '../../redux/thunks/chatThunks';
import img from '../../assets/images/newlogo.png';

function UserMypage() {
  const [showCompleted, setShowCompleted] = useState(false);
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
    } else {
      console.warn('user_number가 존재하지 않습니다.');
    }
  }, [dispatch, user_number]);

  useEffect(() => {
    console.log('pt_schedule 데이터:', pt_schedule);
  }, [pt_schedule]);

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

  const handleCheckboxChange = (e) => {
    setShowCompleted(e.target.checked);
  };

  const filteredScheduleRecord = scheduleRecords.filter(
    (schedule) => schedule.status !== 'deleted'
  );

  const displayedClassItems = filteredScheduleRecord.filter((schedule) =>
    showCompleted
      ? schedule.status === 'completed'
      : schedule.status !== 'completed'
  );
  const filteredClassTotalPages = Math.ceil(
    displayedClassItems.length / itemsPerPage
  );
  const paginatedClassItems = displayedClassItems.slice(
    (classPage - 1) * itemsPerPage,
    classPage * itemsPerPage
  );

  const filteredItems = inbodyData.filter((inbody) => inbody.status);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const getUniqueTrainers = (schedule) => {
    // schedule이 배열인지 확인하여, 배열이 아닌 경우 빈 배열로 처리
    if (!Array.isArray(schedule)) {
      console.warn('Expected an array for schedule, but got:', schedule);
      schedule = [];
    }

    const uniqueTrainers = [];
    const trainerIds = new Set(); // trainer_number로 중복을 관리

    for (const item of schedule) {
      if (
        item.trainer_number !== null &&
        !trainerIds.has(item.trainer_number)
      ) {
        uniqueTrainers.push({
          trainer_name: item.trainer_name,
          trainer_number: item.trainer_number,
        });
        trainerIds.add(item.trainer_number);
      }
    }

    return uniqueTrainers;
  };
  // 중복을 제거한 트레이너 목록 생성
  const uniqueTrainers = getUniqueTrainers(pt_schedule);
  console.log(getUniqueTrainers);
  console.log(uniqueTrainers);
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

  const handleRefundPage = () => {
    navigate('/userptschedule', { state: { pt_schedule } });
  };
  const handleMyInfoUpdate = () => {
    navigate('/userprofile', { state: { userInfo } });
  };

  const handleChat = async (trainer_number) => {
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
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 내 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">내 정보</h2>
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
          <div className="flex-1">
            <div className="flex justify-end">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md text-gray-500">
                {profile?.user_detail_address}
              </p>
            </div>
            <p className="mt-2 text-base font-medium text-gray-700">
              {profile?.name}
            </p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <p className="text-sm text-gray-500">
              {profile?.gender === 'male' ? '남' : '여'}
            </p>
          </div>
        </div>
      </div>

      {/* 담당 트레이너 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          담당 트레이너
        </h2>
        {trainerItems.map((trainer, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-600">
              {trainer.trainer_name}
            </p>
            <button
              onClick={() => handleChat(trainer.trainer_number)}
              className="px-3 py-1 bg-blue-500 text-sm rounded-md text-white font-semibold"
            >
              1:1 채팅하기
            </button>
          </div>
        ))}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handleTrainerPrev}
            disabled={trainerPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            이전
          </button>
          {getPageNumbers(trainerTotalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleTrainerPageChange(pageNumber)}
              className={`px-3 py-1 ${
                trainerPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md text-sm`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleTrainerNext}
            disabled={trainerPage === trainerTotalPages}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            다음
          </button>
        </div>
      </div>

      {/* 예약된 수업 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">
          예약된 수업
        </h2>
        <div className="flex items-center mb-4">
          <label className="text-sm mr-2 text-gray-600">
            완료된 수업만 보기
          </label>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={handleCheckboxChange}
            className="form-checkbox"
          />
        </div>
        {paginatedClassItems.length > 0 ? (
          paginatedClassItems.map((schedule) => (
            <div
              key={schedule.schedule_number}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-600">
                {schedule.trainer_name}
              </p>
              <span className="text-sm text-gray-500">
                {new Date(schedule.class_date).toLocaleDateString()}
                {schedule.status === "completed" && (
                  <span className="text-green-500 ml-2">완료됨</span>
                )}
              </span>
              <button
                onClick={() =>
                  openModal(<CheckScheduleModal schedule={schedule} />)
                }
                className="px-3 py-1 bg-blue-500 text-sm rounded-md text-white font-semibold"
              >
                자세히 보기
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            해당 조건의 수업이 없습니다.
          </p>
        )}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handleClassPrev}
            disabled={classPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            이전
          </button>
          {getPageNumbers(filteredClassTotalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handleClassPageChange(pageNumber)}
              className={`px-3 py-1 ${
                classPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md text-sm`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleClassNext}
            disabled={classPage === filteredClassTotalPages}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            다음
          </button>
        </div>
      </div>

      {/* 체성분 기록 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            나의 체성분 기록
          </h2>
          <button
            onClick={() => openModal(<BodyCompositionModal />)}
            className="px-3 py-1 bg-blue-500 text-sm rounded-md text-white font-semibold"
          >
            추가하기
          </button>
        </div>

        {filteredItems
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((inbody, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-2 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-600">
                측정날짜: {formatDate(inbody.user_measurement_date)}
              </p>
              <button
                onClick={() =>
                  openModal(<EditBodyCompositionModal inbodyData={inbody} />)
                }
                className="px-3 py-1 bg-blue-500 text-sm rounded-md text-white font-semibold"
              >
                더보기
              </button>
            </div>
          ))}

        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            이전
          </button>
          {getPageNumbers(totalPages).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1 ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300'
              } rounded-md text-sm`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded-md text-sm"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMypage;
