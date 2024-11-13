// src/components/common/Header.js
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { UserMenuButtons, TrainerMenuButtons } from './Buttons';
import logo from '../../assets/images/logo.png';
import { useSelector } from 'react-redux';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const userType = useSelector((state) => state.auth.userType);
  console.log(userType);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 특정 페이지에서 메뉴바 숨김
  const hideMenuBar = [
    '/',
    '/sortsignup',
    '/trainersignup',
    '/usersignup',
  ].includes(location.pathname);

  return (
    <header className="relative flex justify-between items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto">
      {/* 왼쪽 빈 공간으로 로고 가운데 정렬 */}
      <div className="w-8"></div>

      {/* 가운데 로고 */}
      <Link
        to={
          userType === 'user'
            ? '/usermypage'
            : userType === 'trainer'
            ? '/trainermypage'
            : '/'
        }
        className="flex justify-center flex-grow"
      >
        <img src={logo} alt="로고" className="w-12 sm:w-16 h-auto" />
      </Link>

      {/* 오른쪽 메뉴 버튼 */}
      {!hideMenuBar && (
        <>
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? '✕' : '≡'}
          </button>
          {menuOpen && (
            <div className="absolute right-4 z-50 top-16 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2">
              {userType === 'trainer' && (
                <TrainerMenuButtons onClick={() => setMenuOpen(false)} />
              )}
              {userType === 'user' && (
                <UserMenuButtons onClick={() => setMenuOpen(false)} />
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
