import React from 'react';
import { useModal } from '../common/ModalProvider';

export const CheckScheduleModal = () => {
  const { closeModal } = useModal();

  return (
    <div>
      <h2>일정 확인</h2>
      <p>여기에 일정 관련 내용을 표시합니다.</p>
      <button onClick={closeModal}>나가기</button>
    </div>
  );
};


export const OpenModalButtons = () => {
  const { openModal } = useModal();

  return (
    <div>
      <button onClick={() => openModal(<CheckScheduleModal />)}>Open Info Modal</button>
    </div>
  );
};
