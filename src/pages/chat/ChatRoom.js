import React from 'react'
import { useModal } from '../../components/common/ModalProvider';

const ChatRoom = () => {
    const { openModal } = useModal();

  return (
    <div className="max-w-[390px] mx-auto bg-gray-100 p-4 min-h-screen">
        ChatRoom


        {/* <div>UserChat
        <button onClick={() => openModal(<PTModal/>)}>결제하기</button>
        <button onClick={() => openModal(<RefundPTModal/>)}>결제취소/환불</button>

        </div> */}

        {/* <div>TrainerChat
            <button onClick={() => openModal(<PaymentListModal/>)}>결제요청하기</button>
        </div> */}
    </div>
  )
}

export default ChatRoom