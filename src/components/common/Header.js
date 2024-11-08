import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserMenuButtons, TrainerMenuButtons } from './Buttons';
import logo from '../../assets/images/logo.png';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

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
    // 경로 변경 시 메뉴 닫기
    setMenuOpen(false);
  }, [location.pathname]); // 페이지 경로가 바뀔 때마다 유저 타입을 확인

  useEffect(() => {
    // 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.menu-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative flex justify-between items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto">
      <div className="w-8"></div>
      <div className="flex justify-center flex-grow">
        <img src={logo} alt="로고" className="w-12 sm:w-16 h-auto" />
      </div>

      {userType && (
        <>
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? '✕' : '≡'}
          </button>
          {menuOpen && (
            <div className="absolute right-4 z-50 top-16 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 menu-container">
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
