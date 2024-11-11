import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { UserChatButtons, TrainerChatButtons } from '../../components/common/Buttons';
import { addMessage } from '../../redux/slice/chatSlice';
import { fetchChatMessages } from '../../redux/thunks/chatThunks';
import { useParams } from 'react-router-dom';

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8000');

const ChatRoom = ({ userNumber, trainerNumber }) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTrainer, setIsTrainer] = useState(false); 
  const messages = useSelector((state) => state.chat.messages); 

  console.log("userNumber:", userNumber, "trainerNumber:", trainerNumber, "roomId:", roomId);

  useEffect(() => {
    // 로컬 스토리지에서 유저 타입 확인
    const userType = localStorage.getItem("userType");
    setIsTrainer(userType === "trainer");

    // 채팅방 참가
    socket.emit('joinRoom', roomId);

    // 메시지 수신 이벤트 설정
    const handleReceivedMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on('messageReceived', handleReceivedMessage);

    // 기존 메시지 로딩
    dispatch(fetchChatMessages(roomId));

    // 컴포넌트 언마운트 시 이벤트 해제와 방 나가기
    return () => {
      socket.off('messageReceived', handleReceivedMessage);
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, dispatch]);

  useEffect(() => {
    // 외부 클릭 시 메뉴 닫기
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

  const sendMessage = useCallback(() => {
    if (input.trim()) {
      const message = { 
        roomId,  // roomId를 메시지와 함께 전송
        userNumber, 
        trainerNumber,
        content: input, 
        senderId: userNumber, 
        senderName: isTrainer ? "Trainer" : "User" 
      };
      socket.emit('sendMessage', message); 
      dispatch(addMessage(message)); 
      setInput('');
    }
  }, [input, roomId, userNumber, trainerNumber, isTrainer, dispatch]);

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
          <div 
            key={index} 
            className={`flex ${msg.senderId === userNumber ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative ${msg.senderId === userNumber ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} 
                p-4 rounded-lg w-2/3 ${msg.senderId === userNumber ? "mr-2" : "ml-2"}`}
            >
              <p>{msg.content}</p>
              <div className={`absolute ${msg.senderId === userNumber ? "right-0 bottom-0 transform translate-x-full translate-y-1/2" : "left-0 bottom-0 transform -translate-x-full translate-y-1/2"}`}>
                <div className={`w-0 h-0 ${msg.senderId === userNumber ? "border-t-[10px] border-t-blue-500 border-l-[10px] border-l-transparent" : "border-t-[10px] border-t-gray-300 border-r-[10px] border-r-transparent"}`}></div>
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
          <div className="absolute bottom-16 left-4 z-50 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 max-w-[350px] w-full menu-container">
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
