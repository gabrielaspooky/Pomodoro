// components/UserCard.js

import React from 'react';

const UserCard = ({ userId }) => {
  return (
    <div className="rounded-full p-4 bg-gradient-to-r from-blue-200 to-blue-400 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="w-5 h-5">
        <img
          src={`https://www.purina.es/sites/default/files/2021-02/BREED%20Hero_0095_pomeranian.jpg`} // URL del avatar
          alt="Avatar"
          className="w-5 h-5 object-cover rounded-full"
        />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-semibold text-gray-900">{userId}</h2>
        <p className="text-sm text-gray-700 mt-1">Usuario</p>
      </div>
    </div>
  );
};

export default UserCard;
