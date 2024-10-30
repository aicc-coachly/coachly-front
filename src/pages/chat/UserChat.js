import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { RefundPTModal } from '../../components/user/RefundPTModal';
import { PTModal } from '../../components/trainer/PTModal';

const UserChat = () => {
    const { openModal } = useModal();
  return (
    <div>UserChat
        <button onClick={() => openModal(<PTModal/>)}>결제하기</button>
        <button onClick={() => openModal(<RefundPTModal/>)}>결제취소/환불</button>

    </div>
  )
}

export default UserChat