"use client"
import React, { useEffect, useState } from 'react';
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';


const Home = () => {


  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Pom />
      <TimerDisplay />

    </div>
  );
};

export default Home;

