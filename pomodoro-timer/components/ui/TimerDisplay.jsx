"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import UserJoinedToast from './JoinToast';
import UserLeftToast from './LeaveToast';  
import MemoryMatch from './MemoryMatch';
import Navbar from './Navbar';
import UserCard from './UserCard';
import Pom from './Pom';

const imageUrls = [
  'https://images.pexels.com/photos/5465339/pexels-photo-5465339.jpeg',
  'https://images.pexels.com/photos/5465502/pexels-photo-5465502.jpeg',
  'https://images.pexels.com/photos/18111115/pexels-photo-18111115/free-photo-of-pomeranian-standing-on-grass.jpeg',
  'https://images.pexels.com/photos/11901851/pexels-photo-11901851.jpeg',
  'https://images.pexels.com/photos/10405999/pexels-photo-10405999.jpeg',
  'https://images.pexels.com/photos/3887670/pexels-photo-3887670.jpeg',
  'https://images.pexels.com/photos/5617166/pexels-photo-5617166.jpeg'
];

const useSocket = (room) => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState({});
  const [newUser, setNewUser] = useState(null);
  const [userLeft, setUserLeft] = useState(null);

  useEffect(() => {
    const socketIo = io('https://socketserver-production-3e3c.up.railway.app');
    setSocket(socketIo);
    socketIo.emit('join_room', room);

    socketIo.on('user_joined', (users) => {
      const userIds = Object.keys(users);
      const latestUserId = userIds[userIds.length - 1];
      const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
      const newUser = { ...users[latestUserId], image: randomImage };
      setNewUser(newUser);
      setUsers((prevUsers) => ({ ...prevUsers, [latestUserId]: newUser }));
    });

    socketIo.on('user_left', (user) => {
      setUserLeft(user);
      setUsers((prevUsers) => {
        const { [user.id]: _, ...newUsers } = prevUsers;
        return newUsers;
      });
    });

    return () => {
      socketIo.emit('leave_room', room);
      socketIo.disconnect();
    };
  }, [room]);

  return { socket, users, newUser, userLeft };
};

const PomodoroTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const room = 'your-room-id';

  const { socket, users, newUser, userLeft } = useSocket(room);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(handleTimerUpdate, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleTimerUpdate = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds === 0) {
        if (minutes === 0) {
          handleSessionEnd();
          return 0;
        } else {
          setMinutes((prev) => prev - 1);
          return 59;
        }
      } else {
        return prevSeconds - 1;
      }
    });
  };

  const handleSessionEnd = () => {
    if (!isBreak) {
      setIsBreak(true);
      setMinutes(5);
      setCycleCount((prev) => prev + 1);
    } else {
      setIsBreak(false);
      setMinutes(25);
    }
  };

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
    socket?.emit('update_timer', { minutes, seconds, isActive: !isActive, isBreak });
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
    setCycleCount(0);
    socket?.emit('update_timer', { minutes: 25, seconds: 0, isActive: false, isBreak: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
      <Navbar onLeave={() => socket?.emit('leave_room', room)} />
      <ToastContainer />
      <Pom isBreak={isBreak} />
      {isBreak && <MemoryMatch />}
      <div className="text-6xl font-mono mb-6 text-white drop-shadow-lg">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex space-x-4">
        <button onClick={toggleTimer} className={`bg-${isActive ? 'red' : 'green'}-500 text-white px-6 py-2 rounded-full`}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="bg-gray-500 text-white px-6 py-2 rounded-full">
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
            <UserCard key={user.id} username={user.username} activity={user.activity} imageUrl={user.image} />
          ))}
        </div>
      </div>
      {newUser && <UserJoinedToast user={newUser} />}
      {userLeft && <UserLeftToast user={userLeft} />}
    </div>
  );
};

export default PomodoroTimer;
