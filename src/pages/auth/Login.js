import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Buttons from '../../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { trainerLogin, userLogin } from '../../redux/silce/authSlice';

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("trainer");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { data, error, userType: loggedInUserType } = useSelector((state) => state.auth);

  useEffect(() => {
    if (data && loggedInUserType) {
      if (loggedInUserType === "trainer") {
        navigate("/trainermypage");
      } else if (loggedInUserType === "user") {
        navigate("/usermypage");
      }
    }
    if (error) {
      alert('로그인에 실패했습니다.');
    }
  }, [data, error, loggedInUserType, navigate]);

  const handleLogin = () => {
    const loginData =
      userType === 'trainer'
        ? { trainer_id: id, pass: password }
        : { user_id: id, pass: password };

    // 로그인 전 유저 타입 초기화
    localStorage.removeItem("userType");

    if (userType === "trainer") {
      dispatch(trainerLogin(loginData)).then((result) => {
        if (result.type.endsWith("/fulfilled")) {
          localStorage.setItem("userType", "trainer"); // 로그인 성공 시 유저 타입 저장
        }
      });
    } else {
      dispatch(userLogin(loginData)).then((result) => {
        if (result.type.endsWith("/fulfilled")) {
          localStorage.setItem("userType", "user"); // 로그인 성공 시 유저 타입 저장
        }
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#edf1f6] flex flex-col items-center">
      <div className="w-full max-w-[390px] mt-8 flex flex-col items-center p-6 bg-[#edf1f6]">
        <h2 className="text-2xl font-semibold text-[#081f5c] mb-6 text-center">
          AI 챗봇과 전문 트레이너가 함께하는
          <br /> 나만의 피트니스 여정을 시작해보세요
        </h2>

        <div className="flex w-full max-w-xs mb-4">
          <button
            onClick={() => setUserType('trainer')}
            className={`flex-1 py-2 rounded-l-lg ${
              userType === "trainer" ? "bg-[#4831D4] text-white" : "bg-[#CCF381] text-[#081f5c]"
            }`}
          >
            트레이너
          </button>
          <button
            onClick={() => setUserType('user')}
            className={`flex-1 py-2 rounded-r-lg ${
              userType === "user" ? "bg-[#4831D4] text-white" : "bg-[#CCF381] text-[#081f5c]"
            }`}
          >
            유저
          </button>
        </div>

        <input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full max-w-xs px-4 py-2 mb-4 border rounded bg-white text-[#081f5c] border-[#d0e3ff] focus:outline-none"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-xs px-4 py-2 mb-6 border rounded bg-white text-[#081f5c] border-[#d0e3ff] focus:outline-none"
        />

        <Buttons size="middle" onClick={handleLogin}>
          로그인
        </Buttons>

        <p className="text-center text-[#081f5c] my-7">아직 계정이 없으신가요?</p>
        <Link to="/sortsignup">
          <Buttons size="middle">회원가입</Buttons>
        </Link>
      </div>
    </div>
  );
}

export default Login;
