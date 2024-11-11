import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { CheckScheduleModal } from "../../components/trainer/CheckScheduleModal";
import { BodyCompositionModal } from "../../components/user/BodyCompositionModal";
import { EditBodyCompositionModal } from "../../components/user/EditBodyCompositionModal";

import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserInbody } from "../../redux/slice/userSlice";
import { setUser } from "../../redux/slice/authSlice";
import { getPtschedule } from "../../redux/slice/paymentSlice";

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

  // 인바디 데이터 가져오기
  const profile = useSelector((state) => state.user?.userInfo);
  const [isLoading, setIsLoading] = useState(true);
  const pt_schedule = useSelector((state) => state.payment?.data);
  const pt_number = pt_schedule
    ? pt_schedule.map((item) => item.pt_number)
    : [];
  // console.log(pt_number);
  // console.log(inbodyData);
  // console.log(user_number);
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

  // useEffect(() => {
  //   if (profile) {
  //     setIsLoading(false);
  //   }
  // }, [profile]);

  // console.log(userId);
  // console.log(profile);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
      {/* 내 정보 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
        <h2 className="text-lg font-semibold mb-2">내 정보</h2>
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
      {/* 담당 트레이너 */}
      {pt_schedule && pt_schedule[0]?.trainer_name ? (
        <div className="bg-white rounded-lg shadow-md p-2 mb-4">
          <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
          <div className="flex items-center justify-between bg-gray-300 p-1">
            <p className="text-base text-sm">{pt_schedule[0].trainer_name}</p>
            <button
              onClick={() => navigate("/UserChat")} // 페이지 이동 설정
              className="px-3 py-1 bg-pink-300 text-sm rounded-md"
            >
              1:1 채팅하기
            </button>
          </div>
        </div>
      ) : null}

      {/* 예약된 수업 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">예약된 수업</h2>
        <div className="flex items-center justify-between bg-gray-300 p-1">
          <p className="text-base text-sm">이건 트레이너</p>
          <span className="text-sm text-gray-500">24-11-01</span>
          <button
            onClick={() => openModal(<CheckScheduleModal />)}
            className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            자세히 보기
          </button>
        </div>
      </div>
      {/* 인바디 세션*/}
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

        {Array.isArray(inbodyData) &&
          inbodyData.map((inbody, index) => (
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
      </div>
    </div>
  );
}

export default UserMypage;
