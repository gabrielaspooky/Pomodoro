"use client";
import React, { useEffect, useState } from 'react';
import TimerDisplay from '../../components/ui/TimerDisplay';
import Onboarding from "../../components/Onboarding"
import MemoryMatch from '../../components/ui/MemoryMatch';
import BreakTimeModal from '../../components/ui/BreakTimeModal';
import JokeFetcher from '../../components/ui/JokerFetcher';
import ApiFetcher from '../../components/ApiFetcher';
import PomodoroFaq from '../../components/ui/PomodoFAQs';
import SessionEnding from '../../components/SessionEnd';

const Home = () => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState('');

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      {!isOnboardingComplete ? (
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
          <SessionEnding />
          <PomodoroFaq />
        </>
      )}
    </div>
  );
};

export default Home;
