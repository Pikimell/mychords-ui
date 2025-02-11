import { useCallback, useEffect, useState } from 'react';

export const useModal = () => {
  const [modalState, setState] = useState(false);

  const closeCallback = useCallback(
    e => {
      if (e.code === 'Escape') {
        setState(false);
      }
    },
    [setState],
  );

  const openModal = () => setState(true);
  const closeModal = () => setState(false);
  const toggleModal = () => setState(!modalState);

  useEffect(() => {
    if (modalState) {
      window.addEventListener('keydown', closeCallback);
    } else {
      window.removeEventListener('keydown', closeCallback);
    }
  }, [modalState, closeCallback]);
  return { modalState, openModal, closeModal, toggleModal };
};
