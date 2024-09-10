import React from 'react';

const UserCard = ({ userId }) => {
  return (
    <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="flex-shrink-0">
        <img
          src={`https://www.purina.es/sites/default/files/2021-02/BREED%20Hero_0095_pomeranian.jpg`} 
          alt="Avatar"
          className="w-16 h-16 rounded-full border-20 border-blue-400 border-solid shadow-md object-cover"
        />
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-bold text-gray-900">{userId}</h2>
        <p className="text-sm text-pink-500 mt-1">Usuario activo</p>
      </div>
    </div>
  );
};

export default UserCard;
