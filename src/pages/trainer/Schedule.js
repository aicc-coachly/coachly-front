import React from 'react'
import { useModal } from '../../components/common/ModalProvider';


const Schedule = () => {
    const { openModal } = useModal();

    return (
        <div>
            <h1>Other Page</h1>
            <button onClick={() => openModal(<p>다른 페이지에서 열린 모달입니다!</p>)}>
      모달 띄우기
            </button>
         </div>
  )
}

export default Schedule

