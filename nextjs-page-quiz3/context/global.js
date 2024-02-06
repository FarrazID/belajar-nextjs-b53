import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [id, setId] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  //TODO: define params. for component: useDisclosure() --> isOpen, onOpen, onClose
  const { isOpen: isConfirmed, onOpen: openConfirmation, onClose: closeConfirmation } = useDisclosure()

  //TODO: define function to open & close modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //TODO: define variable: state & handler
  const state = {
    isModalOpen,
    id, setId,
    isConfirmed,
    openConfirmation,
    closeConfirmation,
  };

  const handleFunction = { openModal, closeModal }

  return (
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {children}
    </GlobalContext.Provider>
  )
};