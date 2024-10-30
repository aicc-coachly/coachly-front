import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { BodyCompositionModal } from '../../components/user/BodyCompositionModal';
import { CheckScheduleModal } from '../../components/trainer/CheckScheduleModal';


const UserMypage = () => {
    const { openModal } = useModal();

    return (
        <div>UserMypage
        <button onClick={() => openModal(<BodyCompositionModal/>)}>체성분 추가하기</button>
        <button onClick={() => openModal(<CheckScheduleModal/>)}>일정 자세히보기</button>
    </div>
  )
}

export default UserMypage