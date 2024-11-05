import React, { useState } from 'react';
import { useModal } from '../../components/common/ModalProvider';
import { UserChatButtons, TrainerChatButtons } from '../../components/common/Buttons';

const ChatRoom = () => {
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // 예를 들어, 유저가 일반 사용자인지 트레이너인지 구분하는 상태 변수
  const isTrainer = false; // 트레이너 여부에 따라 변경

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      {/* Header */}
      <div className="bg-gray-300 p-4 text-center text-black font-bold">
        삼대몇 회원님
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 mb-20 overflow-y-auto">
        {/* User message */}
        <div className="flex justify-end">
          <div className="relative bg-blue-500 text-white p-4 rounded-lg w-2/3 mr-2">
            <p>사용자 메시지 예시</p>
            <div className="absolute right-0 bottom-0 transform translate-x-full translate-y-1/2">
              <div className="w-0 h-0 border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent"></div>
            </div>
          </div>
        </div>

        {/* Another message */}
        <div className="flex justify-start">
          <div className="relative bg-gray-300 text-black p-4 rounded-lg w-2/3 ml-2">
            <p>다른 사용자 메시지 예시</p>
            <div className="absolute left-0 bottom-0 transform -translate-x-full translate-y-1/2">
              <div className="w-0 h-0 border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Bar */}
      <div className="bg-gray-200 p-4 flex items-center justify-between fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px]">
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? '✕' : '+'}
        </button>

        {menuOpen && (
          <div className="absolute bottom-16 left-4 z-50 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 max-w-[350px] w-full">
            {/* 트레이너와 유저 구분하여 다른 메뉴 표시 */}
            {isTrainer ? <TrainerChatButtons onClick={() => setMenuOpen(false)} /> : <UserChatButtons onClick={() => setMenuOpen(false)} />}
          </div>
        )}

        <input 
          type="text" 
          placeholder="메시지를 입력하세요..." 
          className="flex-1 mx-2 p-2 rounded-full bg-white outline-none"
        />
        <button className="text-xl text-black">
          ⬆️
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
