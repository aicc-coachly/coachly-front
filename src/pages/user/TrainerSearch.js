import React from 'react'
import { useModal } from '../../components/common/ModalProvider';
import { TrainerInfoModal } from '../../components/trainer/TrainerInfoModal';


const TrainerSearch = () => {
    const { openModal } = useModal();
    return (
        <div>TrainerSearch
            <button onClick={() => openModal(<TrainerInfoModal/>)}>트레이너 자세히보기</button>
        </div>
        
    )
}

export default TrainerSearch