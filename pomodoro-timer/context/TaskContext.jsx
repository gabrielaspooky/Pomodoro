"use client"
import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [task, setTask] = useState('');
  const [dailyActivity, setDailyActivity] = useState(''); // Nuevo estado para la actividad diaria

  return (
    <TaskContext.Provider value={{ task, setTask, dailyActivity, setDailyActivity }}>
      {children}
    </TaskContext.Provider>
  );
};