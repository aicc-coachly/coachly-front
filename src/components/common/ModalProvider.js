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
      <div className="w-[90%] max-w-sm bg-gray-300 p-6 rounded-lg relative">
        <button className="absolute top-4 right-4 text-lg font-bold" onClick={closeModal} >X</button>
        {modalContent}
      </div>
    </div>
  );
};

export default ModalProvider;
