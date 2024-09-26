"use client";
import React, { useState } from 'react';
import UserNameForm from "../components/ui/UserNameForm";
import SetDailyTask from '../components/ui/DailyTask';
import BreakTimeModal from '../components/ui/BreakTimeModal';

const Onboarding = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState('');
  const [step, setStep] = useState(1);
  const [showBreakModal, setShowBreakModal] = useState(false);

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    setStep(2); 
  };

  const handleActivitySelect = (selectedActivity) => {
    setActivity(selectedActivity);
    setStep(3);
    
    if (selectedActivity) {
      onComplete(username, selectedActivity);
      // Mostrar el modal de break después de completar la selección de actividad
      setShowBreakModal(true);
    }
  };

  const handleCloseBreakModal = () => {
    setShowBreakModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        {step === 1 && <UserNameForm onSubmit={handleUsernameSubmit} />}
        {step === 2 && <SetDailyTask onActivitySelect={handleActivitySelect} />}
      </div>
      <BreakTimeModal 
        isBreak={showBreakModal} 
        onClose={handleCloseBreakModal} 
        username={username}
      />
    </div>
  );
};

export default Onboarding;
