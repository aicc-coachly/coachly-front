import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 추가

// ModalContext 및 커스텀 훅 생성
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const location = useLocation(); // 현재 경로 정보 가져오기

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  // 경로가 변경될 때마다 모달을 닫음
  useEffect(() => {
    if (isOpen) {
      closeModal();
    }
  }, [location.pathname]); // 경로가 변경될 때 실행

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
      <div className="w-[85%] max-w-sm bg-gray-300 p-6 rounded-lg relative">
        <button className="absolute top-4 right-4 text-lg font-bold" onClick={closeModal}>X</button>
        {modalContent}
      </div>
    </div>
  );
};

export default ModalProvider;
