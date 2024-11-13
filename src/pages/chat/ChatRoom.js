import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { UserChatButtons, TrainerChatButtons } from '../../components/common/Buttons';
import { useParams } from 'react-router-dom';

// Redux Thunks
import { leaveChatRoom, fetchChatMessages, fetchChatRoom } from '../../redux/thunks/chatThunks';
import { addMessage } from '../../redux/slice/chatSlice';

const ChatRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [isTrainer, setIsTrainer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [otherPartyName, setOtherPartyName] = useState(""); // 상대방 이름 상태

  // Redux 상태에서 필요한 정보 가져오기ß
  const userType = useSelector((state) => state.auth.userType);
  const userNumber = useSelector((state) => state.auth.user?.user_number);
  const trainerNumber = useSelector((state) => state.auth.trainer?.trainer_number);
  const messages = useSelector((state) => state.chat.messages);

  // userType에 따른 userNumber 선택
  const idToSend = userType === "user" ? userNumber : trainerNumber;

  // 상대방 이름 가져오기
  useEffect(() => {
    const fetchOtherPartyName = async () => {
      try {
        // 상대방 이름 불러오기
        const response = await dispatch(fetchChatRoom({ roomId, userNumber: idToSend })).unwrap();
        setOtherPartyName(response.other_party_name);
      } catch (error) {
        console.error("Error fetching chat room details:", error);
      }
    };

    fetchOtherPartyName();

    return () => {
      dispatch(leaveChatRoom(roomId));
    };
  }, [dispatch, roomId, idToSend]);

  // Socket 연결 설정
  const socket = io(process.env.REACT_APP_API_URL || "http://localhost:8000");

  socket.on('connect', () => {
    console.log('Connected to server:', socket.id);
  });

  useEffect(() => {
    setIsTrainer(userType === "trainer");
    socket.emit("joinRoom", roomId);

    const handleReceivedMessage = (message) => {
      dispatch(addMessage(message));
    };

    socket.on('messageReceived', handleReceivedMessage);
    dispatch(fetchChatMessages(roomId));

    return () => {
      socket.off('messageReceived', handleReceivedMessage);
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId, dispatch, userType]);

  const sendMessage = useCallback(() => {
    if (input.trim()) {
      const message = { 
        roomId, 
        userNumber: idToSend, // userType에 따라 선택된 userNumber 값 사용
        content: input, 
        senderId: idToSend, 
        senderName: isTrainer ? "Trainer" : "User" 
      };
      socket.emit("sendMessage", message);
      dispatch(addMessage(message));
      setInput("");
    }
  }, [input, roomId, idToSend, isTrainer, dispatch]);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      <div className="bg-gray-300 p-4 text-center text-black font-bold">
        <span>{otherPartyName} {isTrainer ? "회원" : "트레이너"}</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 mb-20 overflow-y-auto">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.senderId === idToSend ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative ${msg.senderId === idToSend ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} 
                p-4 rounded-lg w-2/3 ${msg.senderId === idToSend ? "mr-2" : "ml-2"}`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Input Bar */}
      <div className="bg-gray-200 p-4 flex items-center justify-between fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px]">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? "✕" : "+"}
        </button>

        {menuOpen && (
          <div className="absolute bottom-16 left-4 z-50 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-2 max-w-[350px] w-full menu-container">
            {isTrainer ? (
              <TrainerChatButtons onClick={() => setMenuOpen(false)} />
            ) : (
              <UserChatButtons onClick={() => setMenuOpen(false)} />
            )}
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
