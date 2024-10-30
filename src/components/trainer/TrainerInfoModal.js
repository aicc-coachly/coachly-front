import React from 'react'
import { useModal } from '../common/ModalProvider'
import { PTModal } from './PTModal';

export const TrainerInfoModal = () => {
  const { openModal } = useModal();
  return (
    <div>
      <h2>일정 확인</h2>
      <p>여기에 일정 관련 내용을 표시합니다.</p>
      <button onClick={() => openModal(<PTModal/>)}>추가하기</button>
    </div>
  );
}


