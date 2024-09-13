"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../src/Context/UserContext';

const UserCard = () => {
  const { activeUser } = useUser();

  return (
    <motion.div 
      className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex-shrink-0">
        <img
          src="https://www.purina.es/sites/default/files/2021-02/BREED%20Hero_0095_pomeranian.jpg" 
          alt="Avatar"
          className="w-16 h-16 rounded-full border-4 border-blue-400 border-solid shadow-md object-cover"
        />
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-bold text-gray-900">{activeUser}</h2>
        <p className="text-sm text-pink-500 mt-1">Usuario activo</p>
      </div>
    </motion.div>
  );
};

export default UserCard;