"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import UserCard from './UserCard';
import UserJoinedToast from './JoinToast';
import UserLeftToast from './LeaveToast';  
import MemoryMatch from './MemoryMatch';
import Navbar from './Navbar';
import Pom from './Pom';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [socket, setSocket] = useState(null);
  const [room] = useState('your-room-id');
  const [users, setUsers] = useState({});
  const [newUser, setNewUser] = useState(null);
  const [userLeft, setUserLeft] = useState(null);
  const [cycleCount, setCycleCount] = useState(0); 

  useEffect(() => {
    const socketIo = io('https://socketserver-production-3e3c.up.railway.app');
    setSocket(socketIo);

    socketIo.emit('join_room', room);

    socketIo.on('user_joined', (users) => {
      handleUserJoined(users);
    });

    socketIo.on('user_left', (user) => {
      handleUserLeft(user);
    });

    return () => {
      socketIo.emit('leave_room', room);
      socketIo.disconnect();
    };
  }, [room]);

  useEffect(() => {
    let interval = null;
  
    if (isActive) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isActive, isBreak, socket]); 
  
  const handleUserJoined = (users) => {
    const userIds = Object.keys(users);
    const latestUserId = userIds[userIds.length - 1];
    setNewUser(users[latestUserId]);
    setUsers(users);
  };

  const handleUserLeft = (user) => {
    setUserLeft(user);
    setUsers((prevUsers) => {
      const { [user.id]: _, ...newUsers } = prevUsers;
      return newUsers;
    });
  };

  const updateTimer = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        setMinutes((prevMinutes) => {
          if (prevMinutes === 0) {
            if (!isBreak) {
              setIsBreak(true);
              return 5; 
            } else {
              setIsBreak(false);
              setCycleCount((prevCycleCount) => prevCycleCount + 1);
              return 25; 
            }
          }
          return prevMinutes - 1;
        });
        return 59;
      }
      return prevSeconds - 1;
    });

   
    socket?.emit('update_timer', {
      minutes,
      seconds,
      isActive,
      isBreak,
    });
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    socket?.emit('update_timer', {
      minutes,
      seconds,
      isActive: !isActive,
      isBreak,
    });
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25); // testing
    setSeconds(0);
    setIsBreak(false);
    setCycleCount(0);
    socket?.emit('update_timer', {
      minutes: 25,
      seconds: 0,
      isActive: false,
      isBreak: false,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
     
      <ToastContainer />
      <Pom isBreak={isBreak} />
      {isBreak && <MemoryMatch />}
      <div className="text-6xl font-mono mb-6 text-white drop-shadow-lg transition-transform duration-300 transform hover:scale-105">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className={`bg-${isActive ? 'red' : 'green'}-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-${isActive ? 'red' : 'green'}-600 transition-colors duration-200 transform hover:scale-105`}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-600 transition-colors duration-200 transform hover:scale-105"
        >
          Reset
        </button>
      </div>
      <div className="mt-4 text-white">
        <h2 className="text-2xl font-bold">Ciclos completados: {cycleCount}</h2>
      </div>
      <div className="mt-12 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Usuarios en la sala:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.values(users).map((user) => (
            <UserCard 
              key={user.id} 
              userId={user.id} 
              activity={user.activity} 
              username={user.username} 
            />
          ))}
        </div>
      </div>
      {newUser && <UserJoinedToast user={newUser} />}
      {userLeft && <UserLeftToast user={userLeft} />}
    </div>
  );
};

export default PomodoroTimer;
