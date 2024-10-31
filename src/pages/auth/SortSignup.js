// src/pages/auth/SortSignup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Buttons from '../../components/common/Buttons';

function SortSignup() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center ">
        <div className='mt-20'>

        </div>

      <div className="w-full max-w-[390px] mt-8 flex flex-col items-center p-6 bg-[#edf1f6]">
        <h2 className="text-2xl font-semibold text-[#081f5c] mb-4">회원가입</h2>
        <p className="text-[#081f5c] mb-6">어떤 계정으로 시작하시겠어요?</p>

        {/* 회원으로 시작하기 버튼 */}
        <div className="w-full flex justify-center mb-4">
          <Buttons size="middle" onClick={() => navigate('/user-signup')}>
            회원으로 시작하기
          </Buttons>
        </div>

        {/* 트레이너로 시작하기 버튼 */}
        <div className="w-full flex justify-center mb-4">
          <Buttons size="middle" onClick={() => navigate('/trainer-signup')}>
            트레이너로 시작하기
          </Buttons>
        </div>

  
      </div>
    </div>
  );
}

export default SortSignup;
