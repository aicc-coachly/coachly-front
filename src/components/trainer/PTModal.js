import React from 'react';
import { useModal } from '../common/ModalProvider';

export const InfoModal = () => (
  <div>
    <h2>Info Modal</h2>
    <p>This is some information in the modal.</p>
  </div>
);

export const OpenModalButtons = () => {
  const { openModal } = useModal();

  return (
    <div>
      <button onClick={() => openModal(<InfoModal />)}>Open Info Modal</button>
    </div>
  );
};
