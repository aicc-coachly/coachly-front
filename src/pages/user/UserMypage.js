import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { CheckScheduleModal } from '../../components/trainer/CheckScheduleModal';


function UserMypage() {
  const { openModal } = useModal();
    const navigate = useNavigate(); // navigate 함수 생성

    return (
        <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
            
            {/* 내 정보 섹션 */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
                <h2 className="text-lg font-semibold mb-2">내 정보</h2>
                <button 
                    onClick={() => navigate('/userprofile')}  // 페이지 이동 설정
                    className="absolute top-4 right-4 px-3 py-1 bg-gray-300 text-sm rounded-full"
                >
                    수정하기
                </button>
                <div className="flex items-center mt-4">
                    <div className="w-[8rem] h-[8rem] bg-gray-200 overflow-hidden">
                        <img 
                            // src="https://via.placeholder.com/64" // 프로필 사진 URL 또는 경로로 대체
                            alt="프로필 사진" 
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="ml-4">
                      <div className='flex justify-between'>
                      <p className="text-base font-medium">헬린이</p>
                      <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">종로구</p>
                      </div>
                        <p className="text-sm text-gray-500">010-1234-5678</p>
                        <p className="text-sm text-gray-500">healthbaby@gmail.com</p>
                    </div>
                </div>
                <div className="flex mt-2 space-x-2">
                </div>
            </div>

            {/* 담당 트레이너 */}
            <div className="bg-white rounded-lg shadow-md p-2 mb-4">
                <h2 className="text-lg font-semibold p-2">담당 트레이너</h2>
                <div className="flex items-center justify-between bg-gray-300 p-1">
                    <p className="text-base text-sm">이건 트레이너</p>
                    <button 
                    onClick={() => navigate('/UserChat')}  // 페이지 이동 설정
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
              <div className='flex justify-between p-2'>
              <h2 className="text-lg font-semibold">나의 체성분 기록</h2>
                <button 
                    onClick={() => openModal(<CheckScheduleModal />)} 
                    className="text-center px-3 py-1 bg-pink-300 text-sm rounded-md"
                >
                    추가하기
                </button>
              </div>
                
                <div className="flex items-center justify-between bg-gray-300 p-1">
                    <p className="text-base text-sm">첫번째 인바디</p>
                    <span className="text-sm text-gray-500">24-11-01</span>
                    <button 
                    onClick={() => openModal(<CheckScheduleModal />)} 
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
