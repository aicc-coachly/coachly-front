import React, { useEffect, useState } from "react";
import { useModal } from "../../components/common/ModalProvider";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { CheckScheduleModal } from "../../components/trainer/CheckScheduleModal";
import { BodyCompositionModal } from "../../components/user/BodyCompositionModal";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/thunks/authThunk";
import { fetchUserProfile } from "../../redux/thunks/userThunk";

function UserMypage() {
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const navigate = useNavigate(); // navigate 함수 생성
  const userId = useSelector((state) => state.auth.user?.user_id); // Redux에서 user_id를 가져옵니다.
  const profile = useSelector((state) => state.users.profile); // Redux에서 프로필 정보 가져오기
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // userId가 존재하면 프로필을 fetchUserProfile로 가져옴
    if (userId) {
      dispatch(fetchUserProfile(userId)); // Redux로 프로필을 가져오는 액션 디스패치
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (profile) {
      dispatch(fetchUserProfile(profile.user_id));
      setIsLoading(false); // 프로필 로딩 완료되면 로딩 상태 변경
    }
  }, [profile, dispatch]);

  // 로딩 중이면 로딩 화면을 표시
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 프로필이 없으면 로그인 페이지로 리디렉션
  if (!profile) {
    navigate("/");
    return (
      <div>프로필 정보를 가져오지 못했습니다. 로그인 상태를 확인해주세요.</div>
    );
  }

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
                {profile.user_detail_address}
              </p>
            </div>

            {/* 텍스트 정보 */}
            <p className="mt-2 text-base font-medium">{profile.name}</p>
            <p className="text-sm text-gray-500">{profile.phone}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>
      </div>

      {/* 담당 트레이너 */}
      <div className="bg-white rounded-lg shadow-md p-2 mb-4">
        <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
        <div className="flex items-center justify-between bg-gray-300 p-1">
          <p className="text-base text-sm">이건 트레이너</p>
          <button
            onClick={() => navigate("/UserChat")} // 페이지 이동 설정
            className="px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            1:1 채팅하기
          </button>
        </div>
      </div>

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

        <div className="flex items-center justify-between bg-gray-300 p-1">
          <p className="text-base text-sm">첫번째 인바디</p>
          <span className="text-sm text-gray-500"></span>
          <button
            onClick={() => openModal(<BodyCompositionModal />)}
            className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
          >
            더보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMypage;
