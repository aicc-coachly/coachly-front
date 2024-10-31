import React, { createContext, useContext, useState } from 'react';

// ModalContext 및 커스텀 훅 생성
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} modalContent={modalContent} closeModal={closeModal} />
    </ModalContext.Provider>
  );
};

// 모달 컴포넌트 정의
const Modal = ({ isOpen, modalContent, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content relative w-4/5 h-3/4 bg-white rounded-lg p-6 overflow-auto">
        <button 
          onClick={closeModal} 
          className="absolute top-4 right-4 p-2 rounded-full"
        >
          나가기
        </button>
        {modalContent}
      </div>
    </div>
  );
};

export default ModalProvider;
