import React,{ useState, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';

const ChatAI = () => {

    const userType = useSelector((state) => state.auth.userType);
    const userNumber = useSelector((state) => state.auth.user?.user_number);
    const trainerNumber = useSelector((state) => state.auth.trainer?.trainer_number);
    const messages = useSelector((state) => state.chat.messages);
    const idToSend = userType === "user" ? userNumber : trainerNumber;
    const { roomId } = useParams();
    const [input, setInput] = useState("");

    const socket = new WebSocket("ws://localhost:6000/ws/chat");

        // 서버와 연결이 열리면 호출
        socket.onopen = function(event) {
            console.log("서버와 연결됨");
            socket.send("안녕하세요, 서버!"); // 서버로 메시지 전송
        };
        
        // 서버로부터 메시지를 받을 때 호출
        socket.onmessage = function(event) {
            console.log("서버로부터 받은 메시지:", event.data);
        };
        
        // 서버와의 연결이 닫힐 때 호출
        socket.onclose = function(event) {
            console.log("서버와의 연결이 종료됨");
        };
        
        // 오류가 발생할 때 호출
        socket.onerror = function(error) {
            console.error("WebSocket 오류:", error);
        };

const sendMessage = useCallback(() => {
    if (input.trim()) {
      const messageId = uuidv4(); // 메시지마다 고유 ID 생성
      console.log("Sending message from client:", input);
      const message = { 
        roomId, 
        userNumber: idToSend,
        content: input, 
        senderId: idToSend, 
        sender_name: userType,
        messageId // 고유 ID 추가
      };
      socket.current.emit("sendMessage", message); // 메시지 전송만, dispatch 제거
      setInput(""); // 입력창 초기화
    }
  }, [input, roomId, idToSend, userType]);



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
            <p>{msg.message || msg.content}</p> {/* msg.message 또는 msg.content */}
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
  )
}

export default ChatAI