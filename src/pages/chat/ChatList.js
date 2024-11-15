import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms } from '../../redux/thunks/chatThunks';
import { selectChatRooms } from '../../redux/slice/chatSlice';

const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatRooms = useSelector(selectChatRooms);

  // Redux에서 유저 타입과 번호 가져오기
  const userType = useSelector((state) => state.auth.userType);
  const userNumber = useSelector((state) => state.auth.user?.user_number);
  const trainerNumber = useSelector((state) => state.auth.trainer?.trainer_number);

  useEffect(() => {
    // 유저 타입에 따라 유저 넘버 또는 트레이너 넘버로 채팅방 리스트 조회
    if (userType === "user" && userNumber) {
      dispatch(fetchChatRooms({ userNumber }));
    } else if (userType === "trainer" && trainerNumber) {
      dispatch(fetchChatRooms({ trainerNumber }));
    }
  }, [dispatch, userType, userNumber, trainerNumber]);

  const handleClick = (roomId) => {
    navigate(`/chatRoom/${roomId}`);
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4 min-h-screen">
      {/* 유저 타입이 "user"인 경우 "AI 트레이너" 채팅방 표시 */}
      {userType === "user" && (
        <div 
          onClick={() => handleClick('ai')}
          style={{ backgroundColor: '#e0e0e0', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '5px', cursor: 'pointer' }}
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

      {/* 채팅방 리스트 렌더링 - 최신 메시지가 있는 채팅방이 위로 오도록 정렬 */}
      {Array.isArray(chatRooms) && chatRooms.length > 0 ? (
        [...chatRooms]
          .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
          .map((room) => (
            <div 
              key={room.room_id}
              onClick={() => handleClick(room.room_id)}
              style={{
                backgroundColor: '#e0e0e0',
                padding: '10px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              <span>{room.other_party_name} {userType === "user" ? "트레이너" : "회원"}</span>
              <span style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem'
              }}>new</span>
            </div>
          ))
      ) : (
        <p className="text-center text-gray-500">현재 참여 중인 채팅방이 없습니다.</p>
      )}
    </div>
  );
};

export default ChatList;
