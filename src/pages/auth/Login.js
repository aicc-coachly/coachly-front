// src/pages/auth/Login.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Buttons from "../../components/common/Buttons";
import { useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/thunks/userThunk";

function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("trainer"); // 'trainer' 또는 'user'
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("로컬스토리지에 저장된 사용자 정보:", storedUser);
      localStorage.removeItem("user"); // 이전 정보가 있다면 삭제
    } else {
      console.log("로컬스토리지에 사용자 정보 없음");
    }
  }, []);

  const handleLogin = async () => {
    const endpoint = userType === "trainer" ? "trainer/login" : "user/login";
    const idField = userType === "trainer" ? "trainer_id" : "user_id"; // 'trainer'일 때 'trainer_id'를, 'user'일 때 'user_id'를 사용

    try {
      const response = await axios.post(`http://localhost:8000/${endpoint}`, {
        [idField]: id,
        pass: password,
      });

      if (response.status === 200) {
        // 로그인 성공 시 localStorage에 사용자 정보 저장
        const userData = response.data; // 서버에서 받은 로그인된 사용자 정보 (예: { id, name, role })

        // 트레이너와 일반 사용자를 구분하여 로컬스토리지에 저장
        if (userType === "trainer") {
          localStorage.setItem("trainer", JSON.stringify(userData)); // 트레이너 정보 저장
        } else {
          localStorage.setItem("user", JSON.stringify(userData)); // 사용자 정보 저장
        }

        // console.log(`${userType} 정보 저장:`, userData);

        // 로그인 성공 후 페이지 이동
        if (userType === "trainer") {
          navigate("/trainermypage"); // 트레이너 페이지로 이동
        } else {
          navigate("/usermypage"); // 사용자 페이지로 이동
        }
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // relative flex justify-between items-center p-4 bg-[#edf1f6]
  return (
    <div className="w-full  min-h-screen bg-[#edf1f6] flex flex-col items-center">
      <div className="w-full max-w-[390px] mt-8 flex flex-col items-center p-6 bg-[#edf1f6]">
        <h2 className="text-2xl font-semibold text-[#081f5c] mb-6 text-center">
          AI 챗봇과 전문 트레이너가 함께하는
          <br /> 나만의 피트니스 여정을 시작해보세요
        </h2>
        {/* 회원 구분 선택 */}
        <div className="flex w-full max-w-xs mb-4">
          <button
            onClick={() => setUserType("trainer")}
            className={`flex-1 py-2 rounded-l-lg ${
              userType === "trainer"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff] text-[#081f5c]"
            }`}
          >
            트레이너
          </button>
          <button
            onClick={() => setUserType("user")}
            className={`flex-1 py-2 rounded-r-lg ${
              userType === "user"
                ? "bg-[#081f5c] text-white"
                : "bg-[#d0e3ff] text-[#081f5c]"
            }`}
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
        <p className="text-center text-[#081f5c] my-7">
          아직 계정이 없으신가요?
        </p>
        <Link to="/sortsignup">
          <Buttons size="middle">회원가입</Buttons>
        </Link>
      </div>
    </div>
  );
}

export default Login;
