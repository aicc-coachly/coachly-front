import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { aiSendMessage } from '../../redux/thunks/chatThunks';
import { addMessage } from '../../redux/slice/chatSlice';

const ChatAI = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);
  const userNumber = useSelector((state) => state.auth.user?.user_number);
  const trainerNumber = useSelector((state) => state.auth.trainer?.trainer_number);
  const messages = useSelector((state) => state.chat.messages);
  const idToSend = userType === "user" ? userNumber : trainerNumber;
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null); // WebSocket 인스턴스를 상태로 관리

  // WebSocket 연결 설정
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:6000/ws/chat");
    setSocket(ws);

    // WebSocket 이벤트 핸들러
    ws.onopen = () => {
      console.log("Connected to the AI WebSocket server.");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Received AI response:", response.response);
      // AI 응답 메시지를 store에 추가하는 로직
      dispatch(addMessage({ messageId: uuidv4(), content: response.response, sender_name: "AI" }));
    };
    ws.onclose = () => {
      console.log("Disconnected from the AI WebSocket server.");
    };
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  // 메시지 전송 함수
  const sendMessage = useCallback(() => {
    if (input.trim()) {
      const messageId = uuidv4(); // 메시지마다 고유 ID 생성
      console.log("Sending message from client:", input);

      // 메시지 전송 (AI에게 보낼 메시지)
      dispatch(
        aiSendMessage({
          roomId,
          message: input,
        })
      );

      // 로컬 상태 업데이트 (유저 메시지 추가)
      dispatch(addMessage({ messageId, content: input, sender_name: userType }));
      setInput(""); // 입력창 초기화
    }
  }, [input, roomId, dispatch, userType]);

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 min-h-screen flex flex-col relative">
      <div className="bg-gray-300 p-4 text-center text-black font-bold">
        <span>AI 코치리</span>
      </div>

      <div className="flex-1 p-4 space-y-4 mb-20 overflow-y-auto chat-messages-container">
        {messages.map((msg, index) => (
          <div 
          key={msg.messageId || index} 
          className={`flex ${msg.sender_name && userType && msg.sender_name.toLowerCase() === userType.toLowerCase() ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative ${msg.sender_name && userType && msg.sender_name.toLowerCase() === userType.toLowerCase() ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} 
                p-4 rounded-lg w-2/3 ${msg.sender_name && userType && msg.sender_name.toLowerCase() === userType.toLowerCase() ? "mr-2" : "ml-2"}`}
            >
              <p>{msg.message || msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-200 p-4 flex items-center justify-between fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[390px]">
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

export default ChatAI;
