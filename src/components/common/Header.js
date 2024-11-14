import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserMenuButtons, TrainerMenuButtons } from './Buttons';
import logo from '../../assets/images/newlogo.png';

function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const storedData = JSON.parse(sessionStorage.getItem('userData'));
  const data = storedData?.data;
  const userType = storedData?.userType;
  // userType에 따른 user_number 또는 trainer_number 할당
  const user_number = userType === 'user' ? data?.user_number : null;
  const trainer_number = userType === 'trainer' ? data?.trainer_number : null;

  // 새로고침 후에도 isLoggedIn 상태를 유지하기 위해
  const isLoggedIn = userType === 'user' || userType === 'trainer';

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // 로그인 상태가 변경될 때마다 메뉴를 닫음
    setMenuOpen(false);
  }, [isLoggedIn]);

  // 특정 페이지에서 메뉴바 숨김
  const hideMenuBar = [
    '/',
    '/sortsignup',
    '/trainersignup',
    '/usersignup',
  ].includes(location.pathname);

  return (
    <header className="relative flex justify-between items-center p-4 bg-[#edf1f6] shadow-md max-w-[390px] mx-auto rounded-b-lg">
      {/* 왼쪽 빈 공간으로 로고 가운데 정렬 */}

      {/* 가운데 로고 */}
      <Link
        to={{
          pathname:
            userType === 'user'
              ? '/usermypage'
              : userType === 'trainer'
              ? '/trainermypage'
              : '/',
          state: {
            user_number: user_number,
            trainer_number: trainer_number,
            userType: userType,
          },
        }}
        className="flex justify-center flex-grow"
      >
        <img
          src={logo}
          alt="로고"
          className="w-12 sm:w-16 h-auto transition-transform duration-200 hover:scale-105"
        />
      </Link>

      {/* 오른쪽 메뉴 버튼 */}
      {!hideMenuBar && isLoggedIn && (
        <>
          <button
            onClick={toggleMenu}
            className="absolute right-4 text-2xl text-gray-600 hover:text-gray-800 transition-colors"
          >
            {menuOpen ? '✕' : '≡'}
          </button>

          {/* 메뉴 드롭다운 */}
          {menuOpen && (
            <div className="text-center absolute right-4 top-16 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col space-y-2 animate-fadeIn">
              {userType === 'trainer' && (
                <TrainerMenuButtons
                  trainer_number={trainer_number}
                  onClick={() => setMenuOpen(false)}
                />
              )}
              {userType === 'user' && (
                <UserMenuButtons
                  user_number={user_number}
                  onClick={() => setMenuOpen(false)}
                />
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;
