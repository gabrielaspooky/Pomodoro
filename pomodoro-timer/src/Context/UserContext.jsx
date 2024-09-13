"use client"

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState('');

  const handleUserSubmit = (username) => {
    setActiveUser(username);
  };

  return (
    <UserContext.Provider value={{ activeUser, handleUserSubmit }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};