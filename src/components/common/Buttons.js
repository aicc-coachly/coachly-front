// src/components/common/Buttons.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PTModal } from '../trainer/PTModal';
import { PaymentListModal } from '../trainer/PaymentListModal';
import { RefundPTModal } from '../user/RefundPTModal';
import { useModal } from '../../components/common/ModalProvider';
import { useDispatch } from 'react-redux';
import { logout as authLogout } from '../../redux/slice/authSlice';
import { persistor } from '../../redux/store';
import { logout as chatLogout } from '../../redux/slice/chatSlice';
import { logout as paymentLogout } from '../../redux/slice/paymentSlice';
import { logout as refundLogout } from '../../redux/slice/refundSlice';
import { logout as scheduleLogout } from '../../redux/slice/scheduleSlice';
import { logout as trainerLogout } from '../../redux/slice/trainerSlice';
import { logout as userLogout } from '../../redux/slice/userSlice';

function Buttons({ size, color = '#4831D4', children, onClick }) {
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
      className={`py-2 px-4 text-center rounded-md font-semibold tracking-wide transition duration-200 shadow-md hover:shadow-lg ${buttonClasses}`}
      style={{
        backgroundColor: color,
        color: color === '#3B82F6' ? '#3B3B3B' : 'white',
        border: color === '#CCF381' ? '2px solid #3B3B3B' : 'none',
      }}
    >
      {children}
    </button>
  );
}

// src/components/common/Buttons.js

export function UserMenuButtons({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(authLogout());
    await dispatch(chatLogout());
    await dispatch(paymentLogout());
    await dispatch(refundLogout());
    await dispatch(scheduleLogout());
    await dispatch(trainerLogout());
    await dispatch(userLogout());
    await persistor.purge(); // persisted 상태 초기화
    localStorage.removeItem('persist:root'); // 추가적으로 localStorage에서 제거
    navigate('/');
  };

  return (
    <>
      <MenuButton label="마이페이지" to="/usermypage" onClick={onClick} />
      <MenuButton label="트레이너 찾기" to="/trainersearch" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="/" onClick={handleLogout} />
    </>
  );
}

export function TrainerMenuButtons({ onClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(authLogout());
    await dispatch(chatLogout());
    await dispatch(paymentLogout());
    await dispatch(refundLogout());
    await dispatch(scheduleLogout());
    await dispatch(trainerLogout());
    await dispatch(userLogout());
    await persistor.purge(); // persisted 상태 초기화
    localStorage.removeItem('persist:root'); // 추가적으로 localStorage에서 제거
    navigate('/'); // 로그인 페이지로 리디렉션
  };

  return (
    <>
      <MenuButton label="마이페이지" to="/trainermypage" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
      <MenuButton label="로그아웃" to="/" onClick={handleLogout} />
    </>
  );
}

export function MenuButton({ label, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) onClick();
      }}
      className="text-sm z-50 p-2 rounded bg-[#4831D4] text-white"
    >
      {label}
    </Link>
  );
}

// ChatRoom navbar

export function UserChatButtons({ onClick }) {
  const { openModal } = useModal();
  return (
    <>
      <button onClick={() => openModal(<PTModal />)}>결제하기</button>
      <button onClick={() => openModal(<RefundPTModal />)}>
        결제취소/환불
      </button>
    </>
  );
}

export function TrainerChatButtons({ onClick }) {
  const { openModal } = useModal();
  return (
    <>
      <button onClick={() => openModal(<PaymentListModal />)}>
        결제요청하기
      </button>
    </>
  );
}

export default Buttons;
