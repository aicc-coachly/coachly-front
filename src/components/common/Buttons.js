import { Link } from 'react-router-dom';

function Buttons({ size, color = '#081f5c', children, onClick }) {
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
        color: color === '#081f5c' ? 'white' : '#081f5c',
      }}
    >
      {children}
    </button>
  );
}

// MenuButton 컴포넌트 정의
export function MenuButton({ label, to, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-sm p-2 rounded bg-[#081f5c] text-white hover:bg-[#041c3d] flex justify-center items-center"
    >
      {label}
    </Link>
  );
}

// Header MenuBar에서 나오는 메뉴 버튼들
export function UserMenuButtons({ onClick }) {
  return (
    <>
      <MenuButton label="마이페이지" to="/usermypage" onClick={onClick} />
      <MenuButton label="트레이너 찾기" to="/trainersearch" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
    </>
  );
}

export function TrainerMenuButtons({ onClick }) {
  return (
    <>
      <MenuButton label="마이페이지" to="/trainermypage" onClick={onClick} />
      <MenuButton label="내 수업 가격" to="/pricelist" onClick={onClick} />
      <MenuButton label="내 채팅방" to="/chatlist" onClick={onClick} />
    </>
  );
}

export default Buttons;
