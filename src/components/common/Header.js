// src/components/common/Header.js
import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserMenuButtons, TrainerMenuButtons } from './Buttons';
import logo from '../../assets/images/logo.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userType, isLoggedIn } = useSelector((state) => state.auth); // Redux 상태 가져오기

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // userType이 null인 경우에 메뉴바 숨김
  const hideMenuBar = userType === null;

  return (
    <header className="relative flex justify-between items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto">
      {/* 왼쪽 빈 공간으로 로고 가운데 정렬 */}
      <div className="w-8"></div>

      {/* 가운데 로고 */}
      <Link to="/" className="flex justify-center flex-grow">
        <img src={logo} alt="로고" className="w-12 sm:w-16 h-auto" />
      </Link>

      {/* 로그인 후에만 토글 버튼 보이기 */}
      {!hideMenuBar && isLoggedIn && (
        <>
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? '✕' : '≡'}
          </button>
          {menuOpen && (
            <div className="absolute right-4 z-50 top-16 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2">
              {/* 로그인한 회원의 타입에 따라 메뉴 표시 */}
              {userType === 'trainer' && <TrainerMenuButtons onClick={() => setMenuOpen(false)} />}
              {userType === 'user' && <UserMenuButtons onClick={() => setMenuOpen(false)} />}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
