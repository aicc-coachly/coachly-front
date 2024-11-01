import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { EditScheduleModal } from '../../components/trainer/EditScheduleModal';
import { CreateScheduleModal } from '../../components/trainer/CreateScheduleModal';
import { UserModal } from '../../components/user/UserModal';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const TrainerMypage = () => {
    const { openModal } = useModal();
    const navigate = useNavigate(); // navigate 함수 생성

    return (
        <div className="max-w-[390px] mx-auto bg-gray-100 p-4">
            
            {/* 내 정보 섹션 */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
                <h2 className="text-lg font-semibold mb-2">내 정보</h2>
                <button 
                    onClick={() => navigate('/trainerProfile')}  // 페이지 이동 설정
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
                        <button className="px-3 py-1 bg-gray-300 text-sm rounded-md">수업 그만 받기</button>
                        <p className="text-base font-medium">정혜현</p>
                        <p className="text-sm text-gray-500">010-1234-5678</p>
                        <p className="text-sm text-gray-500">j_trainer@gmail.com</p>
                    </div>
                </div>
                <div className="flex mt-2 space-x-2">
                    <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">종로구</p>
                    <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">동대문구</p>
                </div>
            </div>

            {/* 내 회원 관리 섹션 */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">내 회원 관리</h2>
                <div className="flex items-center justify-between">
                    <p className="text-base">풀도핑 (fulldoping12) 회원님</p>
                    <button 
                    onClick={() => navigate('/trainerChat')}  // 페이지 이동 설정
                    className="px-3 py-1 bg-gray-300 text-sm rounded-md"
                >
                    1:1 채팅하기
                </button>
                </div>
            </div>

            {/* 예약된 수업 섹션 */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">예약된 수업</h2>
                <div className="flex items-center justify-between">
                    <p className="text-base">풀도핑 (fulldoping12) 회원님</p>
                    <button 
                        onClick={() => openModal(<UserModal />)}
                        className="px-3 py-1 bg-pink-300 text-sm rounded-md hover:bg-pink-400"
                    >
                        회원 상세보기
                    </button>
                    <div>
                        <span className="text-sm text-gray-500">24-11-01</span>
                        <span className="ml-2 text-sm text-gray-500">등근 헬스장</span>
                    </div>
                </div>
                <button 
                    onClick={() => openModal(<CreateScheduleModal />)} 
                    className="mt-2 w-full text-center px-3 py-1 bg-pink-300 text-sm rounded-md hover:bg-pink-400"
                >
                    추가하기
                </button>
                <button 
                    onClick={() => openModal(<EditScheduleModal />)} 
                    className="mt-2 w-full text-center px-3 py-1 bg-blue-300 text-sm rounded-md hover:bg-blue-400"
                >
                    수정하기
                </button>
            </div>
        </div>
    );
}

export default TrainerMypage;
