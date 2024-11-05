import React from 'react';
import { Link } from 'react-router-dom';
import { PTModal } from '../trainer/PTModal';
import { PaymentListModal } from '../trainer/PaymentListModal';
import { RefundPTModal } from '../user/RefundPTModal';
import { useModal } from '../../components/common/ModalProvider';

function Buttons({ size, color = '#4831D4', children, onClick }) {
  // 버튼 크기에 따라 클래스 지정
  let buttonClasses = "rounded font-semibold flex items-center justify-center";

  switch (size) {
    case "big":
      buttonClasses += " px-8 py-4 text-lg";
      break;
    case "middle":
      buttonClasses += " px-6 py-3 text-base";
    case 'middle':
      buttonClasses += ' px-6 py-3 text-base ' ;
      break;
    case "small":
      buttonClasses += " px-4 py-2 text-sm";
      break;
    default:
      buttonClasses += " px-6 py-3 text-base"; // 기본적으로 middle 크기로 설정
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonClasses}`}
      style={{
        backgroundColor: color,
        color: color === "#4831D4" ? "white" : "#CCF381",
        color: color === '#4831D4' ? 'white' : '#CCF381',
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
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="/" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="" onClick={onClick} />

    </>
  );
}

export function TrainerMenuButtons({ onClick }) {
  return (
    <>
      <MenuButton label="마이페이지" to="/trainermypage" onClick={onClick} />
      <MenuButton label="내 수업 가격" to="/pricelist" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="/" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="" onClick={onClick} />

    </>
  );
}

export function MenuButton({ label, to, onClick }) {
  return (
    <button className="text-sm z-50 p-2 rounded bg-[#4831D4] text-[#CCF381] " onClick={onClick}>
      <Link to={to}>{label}</Link>
    </button>
  );
}

// ChatRoom navbar

export function UserChatButtons({ onClick }) {
  const { openModal } = useModal();
  return (
    <>
       <button onClick={() => openModal(<PTModal/>)}>결제하기</button>
       <button onClick={() => openModal(<RefundPTModal/>)}>결제취소/환불</button>
    </>
  );
}

export function TrainerChatButtons({ onClick }) {
  const { openModal } = useModal();
  return (
    <>
       <button onClick={() => openModal(<PaymentListModal/>)}>결제요청하기</button>
    </>
  );
}




export default Buttons;
