// src/components/common/Buttons.js
import React from 'react';
import { Link } from 'react-router-dom';

function Buttons({ size, color = '#ACD0F2', children, onClick }) {
  // 버튼 크기에 따라 클래스 지정
  let buttonClasses = 'rounded font-semibold flex items-center justify-center';

  switch (size) {
    case 'big':
      buttonClasses += ' px-8 py-4 text-lg';
      break;
    case 'middle':
      buttonClasses += ' px-6 py-3 text-base';
      break;
    case 'small':
      buttonClasses += ' px-4 py-2 text-sm';
      break;
    default:
      buttonClasses += ' px-6 py-3 text-base'; // 기본적으로 middle 크기로 설정
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClasses}`}
      style={{
        backgroundColor: color,
        color: color === '#F3F2EE' ? 'white' : '#F3F2EE',
      }}
    >
      {children}
    </button>
  );
  
}
// src/components/common/Buttons.js

export function UserMenuButtons({ onClick }) {
  return (
    <>
      <MenuButton label="마이페이지" to="/usermypage" onClick={onClick} />
      <MenuButton label="트레이너 찾기" to="/trainersearch" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/userchat" onClick={onClick} />
    </>
  );
}

export function TrainerMenuButtons({ onClick }) {
  return (
    <>
      <MenuButton label="마이페이지" to="/trainermypage" onClick={onClick} />
      <MenuButton label="내 수업 가격" to="/trainerpricing" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/trainerchat" onClick={onClick} />
    </>
  );
}

export function MenuButton({ label, to, onClick }) {
  return (
    <button className="text-sm z-50 p-2 rounded bg-[#081f5c] text-white hover:bg-[#041c3d]" onClick={onClick}>
      <Link to={to}>{label}</Link>
    </button>
  );
}


export default Buttons;
