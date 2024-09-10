// components/PomodoroTimer.js

"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserCard from './UserCard';
import UserToast from './Toast';

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [socket, setSocket] = useState(null);
  const [room] = useState('your-room-id'); // Cambia esto a una sala específica si es necesario
  const [users, setUsers] = useState({});
  const [newUser, setNewUser] = useState(null); // Usuario recién unido

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
      setNewUser(users[Object.keys(users).pop()]); // Obtener el último usuario que se unió
      setUsers(users);
    });

    socketIo.on('user_left', (users) => {
      setUsers(users);
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
    setMinutes(25);
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-8">
        {isBreak ? 'Break Time!' : 'Pomodoro Timer'}
      </h1>
      <div className="text-6xl font-mono mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <button
        onClick={toggleTimer}
        className={`bg-${isActive ? 'red' : 'green'}-500 text-white p-2 rounded-lg`}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={resetTimer}
        className="bg-gray-500 text-white p-2 rounded-lg mt-4"
      >
        Reset
      </button>
      <div className="mt-8 w-full max-w-md flex flex-col text-center">
        <h2 className="text-2xl font-semibold mb-4">Usuarios en la sala:</h2>
        <div className="flex flex-col gap-4">
          {Object.values(users).map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
      {newUser && <UserToast user={newUser} />}
    </div>
  );
};

export default PomodoroTimer;
