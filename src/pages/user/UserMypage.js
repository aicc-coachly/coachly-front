import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { Link, useNavigate } from "react-router-dom"; // useNavigate 추가
import { CheckScheduleModal } from "../../components/trainer/CheckScheduleModal";
import { BodyCompositionModal } from "../../components/user/BodyCompositionModal";
import { EditBodyCompositionModal } from "../../components/user/EditBodyCompositionModal";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInbody } from "../../redux/slice/userSlice";
import { setUser } from "../../redux/slice/authSlice";
import { getPtschedule } from "../../redux/slice/paymentSlice";
import { getScheduleRecord } from "../../redux/slice/scheduleSlice";
import PtScheduleList from "../../components/user/PtScheduleList";

function UserMypage() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth?.user?.user_id);
  const user_number = useSelector((state) => state.auth?.user?.user_number);
  const inbodyData = useSelector((state) => {
    // inbodyData가 배열이 아닌 경우 빈 배열로 초기화
    const userInbodyData = Array.isArray(state.user?.inbodyData)
      ? state.user.inbodyData
      : [];
    return userInbodyData.filter((data) => data.user_number === user_number); // 현재 유저의 인바디 데이터만 반환
  });
  const schedule_record = useSelector(
    (state) => state.schedule?.data?.schedule_records
  );
  const [scheduleRecords, setScheduleRecords] = useState([]); // 모든 예약 정보를 합쳐서 관리
  const [isFetched, setIsFetched] = useState(false); // 데이터가 이미 fetch되었는지 확인

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const maxPageButtons = 5;

  // 인바디 데이터 가져오기
  const profile = useSelector((state) => state.user?.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const pt_schedule = useSelector((state) => state.payment?.data);
  // const pt_schedule = useSelector((state) =>
  //   Array.isArray(state.payment?.data) ? state.payment.data : []
  // );
  const pt_number = pt_schedule
    ? pt_schedule.map((item) => item.pt_number)
    : [];

  // console.log(pt_schedule);
  // console.log(inbodyData);
  // console.log(schedule_record);
  // 측정 날짜가 유효한 경우만 포맷하고, 유효하지 않으면 빈 문자열을 반환
  const formatDate = (date) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  // console.log(inbodyData);

  useEffect(() => {
    if (user_number) {
      dispatch(getUser(user_number));
      dispatch(getUserInbody(user_number)); // 유저의 인바디 데이터 불러오기
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        dispatch(setUser(storedUser));
      }
    }
  }, [dispatch, user_number]);

  useEffect(() => {
    if (inbodyData) {
    }
  }, [inbodyData]);

  useEffect(() => {
    if (user_number) {
      // user_number 또는 trainer_number 중 하나만 있으면 스케줄을 가져옵니다.
      dispatch(
        getPtschedule({
          user_number: user_number,
        })
      );
    }
  }, [dispatch, user_number]); // user_number 또는 trainer_number가 변경될 때마다 호출

  const ptNumbers = pt_schedule
    ? pt_schedule.map((item) => item.pt_number)
    : []; // pt_number 배열로 가져오기
  // console.log(ptNumbers);
  // fetchScheduleRecords 함수
  const fetchScheduleRecords = async () => {
    try {
      // 여러 pt_number로부터 schedule record를 받아와 하나의 배열로 합침
      const allRecords = await Promise.all(
        ptNumbers.map(async (pt_number) => {
          const result = await dispatch(getScheduleRecord(pt_number));
          return result.payload; // 각 요청의 결과를 반환
        })
      );

      // `allRecords`는 여러 객체들을 포함하며, 각 객체에는 `schedule_records`가 배열로 포함됨
      // `schedule_records`만 추출하여 하나의 배열로 결합
      const mergedRecords = allRecords
        .map((record) => record.schedule_records) // 각 객체에서 schedule_records 추출
        .flat(); // 다차원 배열을 1차원 배열로 합침

      // console.log("Merged Schedule Records:", mergedRecords); // 확인용 로그
      setScheduleRecords(mergedRecords); // 하나의 배열로 상태 업데이트
      setIsFetched(true); // 데이터 fetch 완료 상태 업데이트
    } catch (error) {
      console.error("Error fetching schedule records:", error);
    }
  };
  // console.log(inbodyData);

  useEffect(() => {
    if (!isFetched) {
      fetchScheduleRecords();
    }
  }, [isFetched, ptNumbers]);

  // 예약된 수업 필터링 (deleted 제외)
  const filteredScheduleRecord = schedule_record?.filter(
    (schedule) => schedule.status !== "deleted"
  );

  // status가 true인 항목 필터링
  const filteredItems = inbodyData.filter((inbody) => inbody.status);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 현재 페이지의 항목 가져오기
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

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

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 내 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
        <button
          onClick={() => handleRefundPage(pt_schedule)}
          className="absolute top-4 right-[100px] px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          환불신청
        </button>
        <button
          onClick={() => navigate("/userprofile")} // 페이지 이동 설정
          className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
        >
          수정하기
        </button>
        <div className="flex items-start mt-4 space-x-4">
          {/* 프로필 사진 */}
          <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden">
            {/* <img 
                    // src="https://via.placeholder.com/64" // 프로필 사진 URL 또는 경로로 대체
                    alt="프로필 사진" 
                    className="object-cover w-full h-full"
                  /> */}
          </div>

          {/* 텍스트 정보와 체크박스 */}
          <div className="flex-1">
            {/* 체크박스 */}
            <div className="flex justify-end">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">
                {profile?.user_detail_address}
              </p>
            </div>

            {/* 텍스트 정보 */}
            <p className="mt-2 text-base font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
            <p className="text-sm text-gray-500">{profile?.phone}</p>
            <p className="text-sm text-gray-500">{profile?.gender}</p>
          </div>
        </div>
      </div>

      {/* 담당 트레이너 */}
      {pt_schedule && pt_schedule.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-2 mb-4">
          <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
          {pt_schedule.map((trainer, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-300 p-1 mb-2"
            >
              <p className="text-base text-sm">{trainer.trainer_name}</p>
              <button
                onClick={() => navigate("/UserChat")}
                className="px-3 py-1 bg-pink-300 text-sm rounded-md"
              >
                1:1 채팅하기
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {/* 예약된 수업 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">예약된 수업</h2>
        {filteredScheduleRecord && filteredScheduleRecord.length > 0 ? (
          filteredScheduleRecord.map((schedule) => (
            <div
              key={schedule.schedule_number}
              className="flex items-center justify-between bg-gray-300 p-1 mb-2"
            >
              <p className="text-base text-sm">{schedule.trainer_name}</p>
              <span className="text-sm text-gray-500">
                {new Date(schedule.class_date).toLocaleDateString()}{" "}
                {/* 날짜 포맷팅 */}
                {schedule.status === "completed" && (
                  <span className="text-green-500 ml-2">완료됨</span> // 완료 상태일 경우 "완료됨" 표시
                )}
              </span>
              <button
                onClick={() =>
                  openModal(<CheckScheduleModal schedule={schedule} />)
                } // 모달에 schedule 데이터 넘기기
                className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
              >
                자세히 보기
              </button>
            </div>
          ))
        ) : (
          <p>예약된 수업이 없습니다.</p>
        )}
      </div>

      {/* 인바디 세션 */}
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

        {currentItems
          .filter((inbody) => inbody.status === true) // status가 true인 항목만 필터링
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
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mx-1 px-2 py-1 ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
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
