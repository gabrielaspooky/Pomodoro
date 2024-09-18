"use client"
import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';
import UserNameForm from '../../components/ui/UserNameForm';
import MemoryMatch from '../../components/ui/MemoryMatch.tsx';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import JokeFetcher from '../../components/ui/JokerFetcher';
import ApiFetcher from '../../components/ApiFetcher';
import SetDailyTask from '../../components/ui/DailyTask';
import PomodoroFaq from '../../components/ui/PomodoFAQs';
import UserLeftToast from '../../components/ui/LeaveToast';
import { ToastContainer } from 'react-toastify';
import SessionEnding from '../../components/SessionEnd';



const Home = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

    // Usamos useEffect para abrir la modal cuando el componente se monta
    useEffect(() => {
      onOpen()
    }, [onOpen])

    return (
      <>
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Pom />
      <TimerDisplay />
      <MemoryMatch />
      <BreakTimeModal />
      <JokeFetcher />
    <ApiFetcher />
    <SetDailyTask />
    <SessionEnding />
    <PomodoroFaq />
    </div>

    <>
    </>
        
        {/* Modal que contiene el formulario */}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
          
              <UserNameForm /> 
          </ModalContent>
        </Modal>
      </>
    )
  }




export default Home;

