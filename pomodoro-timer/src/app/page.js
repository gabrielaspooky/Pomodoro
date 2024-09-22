"use client";
import React, { useState } from 'react';
import TimerDisplay from '../../components/ui/TimerDisplay';
import Onboarding from "../../components/Onboarding";
import MemoryMatch from '../../components/ui/MemoryMatch';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import JokeFetcher from '../../components/ui/JokerFetcher';
import ApiFetcher from '../../components/ApiFetcher';
import PomodoroFaq from '../../components/ui/PomodoFAQs';
import SessionEnding from '../../components/SessionEnd';
import Navbar from '../../components/ui/Navbar';

const Home = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState('');
  const [showSessionEnd, setShowSessionEnd] = useState(false);

  const handleLeave = () => {
    setShowSessionEnd(true);
  };

  const handleRejoin = () => {
    setShowSessionEnd(false);
    // Reinicia los estados si es necesario
    setUsername('');
    setActivity('');
    setIsOnboardingComplete(false); // Vuelve a empezar si es necesario
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Navbar onLeave={handleLeave} /> {/* Navbar siempre visible */}

      {showSessionEnd ? (
        <SessionEnding onRejoin={handleRejoin} /> // Mostrar SessionEnding si se abandona
      ) : !isOnboardingComplete ? (
        <Onboarding 
          onComplete={(name, selectedActivity) => {
            setUsername(name);
            setActivity(selectedActivity);
            setIsOnboardingComplete(true);
          }} 
        />
      ) : (
        <>
          <TimerDisplay username={username} activity={activity} />
          <MemoryMatch />
          <BreakTimeModal />
          <JokeFetcher />
          <ApiFetcher />
          <PomodoroFaq />
        </>
      )}
    </div>
  );
};

export default Home;
