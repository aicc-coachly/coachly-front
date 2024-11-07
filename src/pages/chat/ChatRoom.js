import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../components/common/ModalProvider';
import { UserChatButtons, TrainerChatButtons } from '../../components/common/Buttons';
import { addMessage } from '../../redux/silce/chatSlice';
import { fetchChatMessages } from '../../redux/thunks/chatThunks';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8000'); // 서버 주소를 env로 관리

const ChatRoom = ({ roomId }) => {
  const { openModal } = useModal();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const messages = useSelector((state) => state.chat.messages); // Redux에서 메시지 가져오기
  const isTrainer = false; // 트레이너 여부에 따라 변경

  useEffect(() => {
    // 채팅방 참가
    socket.emit('joinRoom', roomId);

    // 메시지 수신 이벤트 설정
    socket.on('messageReceived', (message) => {
      dispatch(addMessage(message)); // Redux에 메시지 추가
    });

    // 기존 메시지 로딩
    dispatch(fetchChatMessages(roomId)); // fetchChatMessages로 변경

    // 컴포넌트 언마운트 시 방을 떠나기
    return () => {
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, dispatch]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = { roomId, content: input, senderName: isTrainer ? "Trainer" : "User" };
      socket.emit('sendMessage', message); // 메시지 서버로 전송
      dispatch(addMessage(message)); // 전송한 메시지를 Redux 상태에 추가
      setInput('');
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      <div className="bg-gray-300 p-4 text-center text-black font-bold">
        {isTrainer ? "트레이너" : "삼대몇 회원님"}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 mb-20 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.senderName === "User" ? "justify-end" : "justify-start"}`}>
            <div
              className={`relative ${msg.senderName === "User" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} 
                p-4 rounded-lg w-2/3 ${msg.senderName === "User" ? "mr-2" : "ml-2"}`}
            >
              <p>{msg.content}</p>
              <div className={`absolute ${msg.senderName === "User" ? "right-0 bottom-0 transform translate-x-full translate-y-1/2" : "left-0 bottom-0 transform -translate-x-full translate-y-1/2"}`}>
                <div className={`w-0 h-0 ${msg.senderName === "User" ? "border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent" : "border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Input Bar */}
      <div className="bg-gray-200 p-4 flex items-center justify-between fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px]">
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? '✕' : '+'}
        </button>

        {menuOpen && (
          <div className="absolute bottom-16 left-4 z-50 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 max-w-[350px] w-full">
            {isTrainer ? <TrainerChatButtons onClick={() => setMenuOpen(false)} /> : <UserChatButtons onClick={() => setMenuOpen(false)} />}
          </div>
        )}

        <input 
          type="text" 
          placeholder="메시지를 입력하세요..." 
          className="flex-1 mx-2 p-2 rounded-full bg-white outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="text-xl text-black">
          ⬆️
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
