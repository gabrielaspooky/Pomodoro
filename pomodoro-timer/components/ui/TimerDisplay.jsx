"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import UserCard from './UserCard';
import UserJoinedToast from './JoinToast';
import UserLeftToast from './LeaveToast';  
import Pom from './Pom';
import MemoryMatch from './MemoryMatch';

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

  useEffect(() => {
    const socketIo = io('https://socketserver-production-3e3c.up.railway.app');
    setSocket(socketIo);

    socketIo.emit('join_room', room);

    socketIo.on('timer_update', (data) => {
      setMinutes(data.minutes);
      setSeconds(data.seconds);
      setIsActive(data.isActive);
      setIsBreak(data.isBreak);
    });

    socketIo.on('user_joined', (users) => {
      const userIds = Object.keys(users);
      const latestUserId = userIds[userIds.length - 1];
      setNewUser(users[latestUserId]);
      setUsers(users);
    });

    socketIo.on('user_left', (user) => {
      setUserLeft(user);

     
      setUsers((prevUsers) => {
        const updatedUsers = { ...prevUsers };
        delete updatedUsers[user.id]; 
        return updatedUsers;
      });
    });

    return () => {
      socketIo.disconnect();
    };
  }, [room]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (!isBreak) {
              setIsBreak(true);
              setMinutes(5);
              setSeconds(0);
            } else {
              setIsBreak(false);
              setMinutes(25);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }

        socket?.emit('update_timer', {
          minutes,
          seconds,
          isActive,
          isBreak
        });

      }, 1000);
    } else if (!isActive && (minutes !== 25 || seconds !== 0)) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes, isBreak, socket]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    socket?.emit('update_timer', {
      minutes,
      seconds,
      isActive: !isActive,
      isBreak
    });
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25); // Cambia aquí a 0 o a 25 para testear, según el caso
    setSeconds(0);
    setIsBreak(false);
    socket?.emit('update_timer', {
      minutes: 25,
      seconds: 0,
      isActive: false,
      isBreak: false
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
      <ToastContainer />
      <h1 className="text-nowrap">
        {isBreak ? 'Break Time!' && <MemoryMatch /> : 'Pomodoro Timer'}
      </h1>
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
      <div className="mt-12 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Usuarios en la sala:</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {Object.values(users).map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      {newUser && <UserJoinedToast user={newUser} />}
      {userLeft && <UserLeftToast user={userLeft} />}
    </div>
  );
};

export default PomodoroTimer;
