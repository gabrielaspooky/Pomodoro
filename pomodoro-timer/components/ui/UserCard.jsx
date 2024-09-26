import React, { useState, useEffect } from 'react';

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

const UserCard = ({ username, activity }) => {
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {

    const image = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    setRandomImage(image);
  }, []);

  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out max-w-xs mx-auto">
      <div className="flex-shrink-0">
        <img
          src={randomImage}
          alt="Avatar"
          className="w-20 h-20 rounded-full border-4 border-gray-200 object-cover shadow-md"
        />
      </div>
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-gray-700">{username}</h2>
        <p className="text-sm text-blue-500 mt-1">{activity ? `está en una sesión de ${activity.toLowerCase()}` : 'está en la sesión'}</p>
      </div>
    </div>
  );
};

export default UserCard;
