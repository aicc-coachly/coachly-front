import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // 로컬 스토리지에서 유저 타입 확인
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  const handleClick = () => {
    navigate("/chatRoom");
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4 min-h-screen">
      {/* 유저 타입이 "user"인 경우 "AI 트레이너" 채팅방 표시 */}
      {userType === "user" && (
        <div
          onClick={handleClick}
          style={{
            backgroundColor: "#e0e0e0",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <span>AI 트레이너</span>
          <span
            style={{
              backgroundColor: "#fff",
              color: "#000",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "0.8rem",
            }}
          >
            new
          </span>
        </div>
      )}

      {/* 공통 채팅방 예시 */}
      <div
        onClick={handleClick}
        style={{
          backgroundColor: "#e0e0e0",
          padding: "10px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <span>헬린이 회원님</span>
        <span
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "0.8rem",
          }}
        >
          new
        </span>
      </div>
    </div>
  );
};

export default ChatList;
