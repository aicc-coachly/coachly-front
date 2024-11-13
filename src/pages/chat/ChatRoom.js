import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const socketRef = useRef(null); // useRef로 소켓 인스턴스를 저장

  const [input, setInput] = useState("");
  const [isTrainer, setIsTrainer] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [otherPartyName, setOtherPartyName] = useState(""); 

  const userType = useSelector((state) => state.auth.userType);
  const userNumber = useSelector((state) => state.auth.user?.user_number);
  const trainerNumber = useSelector((state) => state.auth.trainer?.trainer_number);
  const messages = useSelector((state) => state.chat.messages);

  const idToSend = userType === "user" ? userNumber : trainerNumber;

  useEffect(() => {
    const fetchOtherPartyName = async () => {
      try {
        let response;
        if (userType === "user" && userNumber) {
          response = await dispatch(fetchChatRoom({ roomId, userNumber })).unwrap();
        } else if (userType === "trainer" && trainerNumber) {
          response = await dispatch(fetchChatRoom({ roomId, trainerNumber })).unwrap();
        } else {
          console.warn("유효한 userNumber 또는 trainerNumber가 없습니다.");
          return;
        }

        if (response) {
          setOtherPartyName(response.other_party_name);
        }
      } catch (error) {
        console.error("Error fetching chat room details:", error);
      }
    };

    fetchOtherPartyName();

    return () => {
      dispatch(leaveChatRoom(roomId));
    };
  }, [dispatch, roomId, userType, userNumber, trainerNumber]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_API_URL || "http://localhost:8000");
  
      socketRef.current.on("connect", () => {
        console.log("Connected to server:", socketRef.current.id);
      });
  
      // messageReceived 이벤트 리스너가 중복 등록되지 않도록 한 번만 설정
      const handleMessageReceived = (message) => {
        console.log("Message received from server:", message);
        dispatch(addMessage(message));
      };
  
      socketRef.current.on("messageReceived", handleMessageReceived);
  
      // Clean up to avoid multiple listeners
      return () => {
        socketRef.current.off("messageReceived", handleMessageReceived);
        socketRef.current.disconnect();
        socketRef.current = null;
      };
    }
  }, [roomId, dispatch, userType]);

  const sendMessage = useCallback(() => {
    if (input.trim()) {
      console.log("Sending message from client:", input);
      const message = { 
        roomId, 
        userNumber: idToSend,
        content: input, 
        senderId: idToSend, 
        senderName: isTrainer ? "Trainer" : "User" 
      };
      socketRef.current.emit("sendMessage", message);
      dispatch(addMessage(message));
      setInput("");
    }
  }, [input, roomId, idToSend, isTrainer, dispatch]);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      <div className="bg-gray-300 p-4 text-center text-black font-bold">
        <span>{otherPartyName} {isTrainer ? "회원" : "트레이너"}</span>
      </div>

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
