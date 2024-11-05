import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { PaymentListModal } from '../../components/trainer/PaymentListModal';

const TrainerChat = () => {
    const { openModal } = useModal();
    return (
        <div>TrainerChat
            <button onClick={() => openModal(<PaymentListModal/>)}>결제요청하기</button>
        </div>
  )
}

export default TrainerChat