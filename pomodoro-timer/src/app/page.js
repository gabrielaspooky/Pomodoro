"use client"
import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';
import UserNameForm from '../../components/ui/UserNameForm';
import MemoryMatch from '../../components/ui/MemoryMatch.tsx';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import JokeFetcher from '../../components/ui/JokerFetcher';
import ApiFetcher from '../../components/ApiFetcher';
import SetDailyTask from '../../components/ui/DailyTask';
import PomodoroFaq from '../../components/ui/PomodoFAQs';




const Home = () => {


  return (
    <ChakraProvider>
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Pom />
      <TimerDisplay />
      <UserNameForm />
      <MemoryMatch />
      <BreakTimeModal />
      <JokeFetcher />
    <ApiFetcher />
    <SetDailyTask />
    <PomodoroFaq />
    </div>
    </ChakraProvider>
  );
};

export default Home;

