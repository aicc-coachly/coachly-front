import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate()
  const [addressSections, setAddressSections] = useState([1]); // 기본 주소관리 섹션 1개

  // 새로운 주소관리 섹션을 추가하는 함수
  const addAddressSection = () => {
    setAddressSections([...addressSections, addressSections.length + 1]);
  }

  // 특정 주소관리 섹션을 삭제하는 함수
  const removeAddressSection = (index) => {
    if (addressSections.length > 1) { // 최소 1개의 섹션을 유지하는 조건
      setAddressSections(addressSections.filter((_, i) => i !== index));
    }
  }

  return (
    <div className="max-w-[390px] mx-auto h-auto bg-gray-100 p-4">
      {/* 제목 */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">내 정보</h2>
      </div>

      {/* 프로필 사진 */}
      <div className="w-[16rem] h-[16rem] bg-gray-200 mx-auto mb-4 overflow-hidden">
        {/* <img 
          // src="https://via.placeholder.com/64" // 프로필 사진 URL 또는 경로로 대체
          alt="프로필 사진" 
          className="object-cover w-full h-full"
        /> */}
      </div>

      {/* 사용자 정보 */}
      <div className="text-center mb-4">
        <p className="text-base font-medium">헬린이</p>
        <p className="text-sm text-gray-500">010-1234-5678</p>
        <p className="text-sm text-gray-500">healthbaby@gmail.com</p>
      </div>

      {/* 주소 관리 섹션 */}
      <div className="mb-4">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-2">주소관리</h2>
          <button 
            onClick={addAddressSection} 
            className="px-3 py-1 bg-gray-300 text-sm rounded-md"
          >
            추가하기
          </button>
        </div>

        {/* 동적 주소관리 섹션들 */}
        {addressSections.map((section, index) => (
          <div key={index} className="mb-4 border-t pt-2 relative">
            <h2 className="text-md font-normal px-3 mb-2">장소명 입력</h2>
            <div className="flex justify-between px-4 mb-4">
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">구</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">동</p>
              <p className="px-3 py-1 bg-gray-300 text-sm rounded-md">상세주소</p>
            </div>
            {/* 삭제 버튼 (오른쪽 상단) */}
            <button 
              onClick={() => removeAddressSection(index)} 
              className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 저장하기 버튼 */}
      <button 
        onClick={() => navigate('/UserMyPage')}  // 페이지 이동 설정
        className="w-full py-2 bg-pink-300 text-sm font-medium rounded-md"
      >
        저장하기
      </button>
    </div>
  )
}

export default UserProfile
