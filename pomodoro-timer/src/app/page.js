"use client";
import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';
import UserNameForm from '../../components/ui/UserNameForm';
import MemoryMatch from '../../components/ui/MemoryMatch';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import JokeFetcher from '../../components/ui/JokerFetcher';
import ApiFetcher from '../../components/ApiFetcher';
import ParentComponent from '../../components/ParentComponent'; 
import PomodoroFaq from '../../components/ui/PomodoFAQs';
import SessionEnding from '../../components/SessionEnd';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [showDailyTask, setShowDailyTask] = useState(false);

  useEffect(() => {
    // Abrir el modal al cargar la página
    onOpen();
  }, [onOpen]);

  const handleUserNameFormSubmit = (submittedUsername) => {
    // Al enviar el formulario, cierra el modal y guarda el username
    setUsername(submittedUsername);
    onClose();
    setShowDailyTask(true); // Muestra ParentComponent después de enviar el formulario
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <TimerDisplay />
    
      {showDailyTask && <ParentComponent username={username} />} 

      <MemoryMatch />
      <BreakTimeModal />
      <JokeFetcher />
      <ApiFetcher />
      <SessionEnding />
      <PomodoroFaq />

      {/* Modal para el formulario de nombre de usuario */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {!username && (
              <UserNameForm onSubmit={handleUserNameFormSubmit} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
