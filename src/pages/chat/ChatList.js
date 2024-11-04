import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/trainerchat');
  };

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4 min-h-screen">
      <div 
        onClick={handleClick}
        style={{ backgroundColor: '#e0e0e0', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '5px', cursor: 'pointer' }}
      >
        <span>헬린이 회원님</span>
        <span style={{ backgroundColor: '#fff', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>new</span>
      </div>
    </div>
  );
};

export default ChatList;
