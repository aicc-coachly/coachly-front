import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserMenuButtons, TrainerMenuButtons } from './Buttons';
import logo from '../../assets/images/logo.png';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("userType")); // 초기값을 로컬 스토리지에서 가져옴

  useEffect(() => {
    // 로컬 스토리지의 유저 타입 변경을 실시간으로 반영
    const handleStorageChange = () => {
      setUserType(localStorage.getItem("userType"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // 로그인이나 로그아웃 후 즉시 userType 상태 업데이트
    setUserType(localStorage.getItem("userType"));
  }, [location.pathname]); // 페이지 경로가 바뀔 때마다 유저 타입을 확인

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative flex justify-between items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto">
      <div className="w-8"></div>
      <div className="flex justify-center flex-grow">
        <img src={logo} alt="로고" className="w-12 sm:w-16 h-auto" />
      </div>

      { userType && (
        <>
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? '✕' : '≡'}
          </button>
          {menuOpen && (
            <div className="absolute right-4 z-50 top-16 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2">
              {userType === "trainer" && <TrainerMenuButtons onClick={() => setMenuOpen(false)} />}
              {userType === "user" && <UserMenuButtons onClick={() => setMenuOpen(false)} />}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
