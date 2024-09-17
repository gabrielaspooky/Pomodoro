import React from 'react';

// Lista de URLs de imágenes
const imageUrls = [
  'https://images.pexels.com/photos/5465339/pexels-photo-5465339.jpeg',
  'https://images.pexels.com/photos/5465502/pexels-photo-5465502.jpeg',
  'https://images.pexels.com/photos/18111115/pexels-photo-18111115/free-photo-of-pomeranian-standing-on-grass.jpeg',
  'https://images.pexels.com/photos/11901851/pexels-photo-11901851.jpeg',
  'https://images.pexels.com/photos/10405999/pexels-photo-10405999.jpeg',
  'https://images.pexels.com/photos/3887670/pexels-photo-3887670.jpeg',
  'https://images.pexels.com/photos/5617166/pexels-photo-5617166.jpeg'
];

const UserCard = ({ userId, activity }) => {
  // Seleccionar una imagen aleatoria
  const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  return (
    <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <div className="flex-shrink-0">
        <img
          src={randomImage} 
          alt="Avatar"
          className="w-16 h-16 rounded-full border-20 border-blue-400 border-solid shadow-md object-cover"
        />
      </div>
      <div className="ml-6">
        <h2 className="text-2xl font-bold text-gray-900">{userId}</h2>
        <p className="text-sm text-blue-500 mt-1">está {activity ? activity : 'estudiando'}</p>
      </div>
    </div>
  );
};

export default UserCard;
