// src/pages/auth/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserType } from '../../redux/slices/authSlice';
import { loginUser } from '../../redux/thunks/authThunks';
import Buttons from '../../components/common/Buttons';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setUserTypeLocal] = useState('trainer'); // 로컬 상태로 회원타입 관리
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 개별 필드 검증
    if (!id) {
      alert('아이디를 입력해 주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }

    const handleLogin = async () => {
      if (!id) {
        alert('아이디를 입력해 주세요.');
        return;
      }
      if (!password) {
        alert('비밀번호를 입력해 주세요.');
        return;
      }
  
      // 로그인 요청 보내기
      const loginData = { id, password };
      const resultAction = await dispatch(loginUser(loginData));
  
      // 로그인 성공 시 페이지 이동
      if (loginUser.fulfilled.match(resultAction)) {
        dispatch(setUserType(userType));
        navigate(userType === 'trainer' ? '/trainermypage' : '/usermypage');
      }
    };

    // 선택된 회원 타입을 Redux 전역 상태에 설정
    dispatch(setUserType(userType));

    // 로그인 후 페이지 이동
    if (userType === 'trainer') {
      navigate('/trainermypage'); // 트레이너 메인 페이지로 이동
    } else {
      navigate('/usermypage'); // 유저 메인 페이지로 이동
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center">
      <div className="w-full max-w-[390px] mt-8 flex flex-col items-center p-6 bg-[#edf1f6]">
        <h2 className="text-2xl font-semibold text-[#081f5c] mb-6 text-center">
          AI 챗봇과 전문 트레이너가 함께하는<br /> 나만의 피트니스 여정을 시작해보세요
        </h2>
        
        {/* 회원 구분 선택 */}
        <div className="flex w-full max-w-xs mb-4">
          <button
            onClick={() => setUserType('trainer')}
            className={`flex-1 py-2 rounded-l-lg ${userType === 'trainer' ? 'bg-[#4831D4] text-[#CCF381]' : 'bg-[#CCF381] text-[#081f5c]'}`}
          >
            트레이너
          </button>
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 py-2 rounded-r-lg ${userType === 'user' ? 'bg-[#4831D4] text-[#CCF381]' : 'bg-[#CCF381] text-[#081f5c]'}`}
          >
            유저
          </button>
        </div>

        {/* 아이디 입력 */}
        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full max-w-xs px-4 py-2 mb-4 border rounded bg-white text-[#081f5c] border-[#d0e3ff] focus:outline-none"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-xs px-4 py-2 mb-6 border rounded bg-white text-[#081f5c] border-[#d0e3ff] focus:outline-none"
        />

        {/* 로그인 버튼 */}
        <Buttons size="middle" onClick={handleLogin}>
          로그인 
        </Buttons>

        {/* 회원가입 안내 */}
        <p className="text-center text-[#081f5c] my-7">아직 계정이 없으신가요?</p>
        <Link to="/sortsignup">
          <Buttons size="middle">
            회원가입
          </Buttons>
        </Link>
      </div>
    </div>
  );
}

export default Login;
