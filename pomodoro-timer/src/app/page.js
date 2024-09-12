"use client"
import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';
import UserNameForm from '../../components/ui/UserNameForm';
import MemoryMatch from '../../components/ui/MemoryMatch.tsx';


const Home = () => {


  return (
    <ChakraProvider>
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Pom />
      <TimerDisplay />
      <UserNameForm />
      <MemoryMatch />
    </div>
    </ChakraProvider>
  );
};

export default Home;

