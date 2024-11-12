import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRooms } from '../../redux/thunks/chatThunks';
import { selectChatRooms } from '../../redux/slice/chatSlice';

const ChatList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState(null);
  const chatRooms = useSelector(selectChatRooms);

  useEffect(() => {
    // 로컬 스토리지에서 유저 타입 확인
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);

    // 유저 타입에 따라 채팅방 리스트 조회
    if (storedUserType === "user") {
      const userNumber = localStorage.getItem("userNumber"); // 유저 넘버
      dispatch(fetchChatRooms({ userNumber }));
    } else if (storedUserType === "trainer") {
      const trainerNumber = localStorage.getItem("trainerNumber"); // 트레이너 넘버
      dispatch(fetchChatRooms({ trainerNumber }));
    }
  }, [dispatch]);

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
          <span style={{ backgroundColor: '#fff', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>new</span>
        </div>
      )}

      {/* 채팅방 리스트 렌더링 - chatRooms가 배열일 때만 렌더링 */}
      {Array.isArray(chatRooms) && chatRooms.map((room) => (
        <div 
          key={room.roomId}
          onClick={() => handleClick(room.roomId)}
          style={{ backgroundColor: '#e0e0e0', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '5px', cursor: 'pointer' }}
        >
          <span>
            {userType === "user"
              ? `${room.trainerName} 트레이너`
              : `${room.userName} 회원`}
          </span>
          <span style={{ backgroundColor: '#fff', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>new</span>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
