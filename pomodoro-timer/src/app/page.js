"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from '../../components/ui/Navbar';
import Pom from '../../components/ui/Pom';
import TimerDisplay from '../../components/ui/TimerDisplay';


const socket = io('http://localhost:3001'); 

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
 
    socket.on('welcome', (msg) => {
      setMessage(msg);
    });

   
    return () => {
      socket.off('welcome');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', 'Hello from React client');
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <Navbar />
      <Pom />
      <TimerDisplay />
      
      <div className="p-4">
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Message
        </button>
        <p className="mt-4 text-white">Server Message: {message}</p>
      </div>
    </div>
  );
};

export default Home;

