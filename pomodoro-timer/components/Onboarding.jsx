"use client";
import React, { useState } from 'react';
import UserNameForm from "../components/ui/UserNameForm";
import SetDailyTask from '../components/ui/DailyTask';

const Onboarding = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [activity, setActivity] = useState('');
  const [step, setStep] = useState(1);

  const handleUsernameSubmit = (name) => {
    setUsername(name);
    setStep(2); 
  };

  const handleActivitySelect = (selectedActivity) => {
    setActivity(selectedActivity);
    setStep(3);
    // Llama a onComplete cuando se complete el onboarding
    if (selectedActivity) {
      onComplete(username, selectedActivity);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {step === 1 && <UserNameForm onSubmit={handleUsernameSubmit} />}
      {step === 2 && <SetDailyTask onActivitySelect={handleActivitySelect} />}
    </div>
  );
};

export default Onboarding;
