"use client";
import React, { useState } from 'react';
import TimerDisplay from '../../components/ui/TimerDisplay';
import Onboarding from "../../components/Onboarding";
import MemoryMatch from '../../components/ui/MemoryMatch';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import ApiFetcher from '../../components/ApiFetcher';
import PomodoroFaq from '../../components/ui/PomodoFAQs';
import SessionEnding from '../../components/SessionEnd';
import Navbar from '../../components/ui/Navbar';
import UserCard from '../../components/ui/UserCard';

const Home = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [userData, setUserData] = useState(null); // Estado para usuario
  const [showSessionEnd, setShowSessionEnd] = useState(false);

  const handleLeave = () => {
    setShowSessionEnd(true);
  };

  const handleRejoin = () => {
    setShowSessionEnd(false);
    setUserData(null); // Reinicia el estado de usuario
    setIsOnboardingComplete(false); // Vuelve a empezar si es necesario
  };

  const handleOnboardingComplete = (username, activity) => {
    setUserData({ username, activity });
    setIsOnboardingComplete(true); // Marca el onboarding como completo
  };

  return (
    <div className="bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
      <Navbar onLeave={handleLeave} /> 

      {showSessionEnd ? (
        <SessionEnding onRejoin={handleRejoin} /> 
      ) : !userData ? ( 
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <UserCard username={userData.username} activity={userData.activity} /> 
          <TimerDisplay username={userData.username} activity={userData.activity} />
          <BreakTimeModal />
        <ApiFetcher />
          <PomodoroFaq />
        </>
      )}
    </div>
  );
};

export default Home;
