import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { EditScheduleModal } from '../../components/trainer/EditScheduleModal';
import { CreateScheduleModal } from '../../components/trainer/CreateScheduleModal';
import { UserModal } from '../../components/user/UserModal';



const TrainerMypage = () => {
    const { openModal } = useModal();

    return (
        <div>
            <h1>Other Page</h1>
            <button onClick={() => openModal(<EditScheduleModal/>)}>편집하기</button>
            <button onClick={() => openModal(<CreateScheduleModal/>)}>추가하기</button>
            <button onClick={() => openModal(<UserModal/>)}>추가하기</button>
         </div>
  )
}

export default TrainerMypage
