import React from 'react';
import { FaHome, FaServicestack, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="h-screen w-45 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen">
      <div className="text-white text-3xl font-bold mb-12">PoMo</div>
      <div className="flex flex-col space-y-6">
        <a href="#home" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <FaHome className="mr-3" /> 
          <span className="text-lg">Inicio</span>
        </a>
        <a href="#services" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <FaServicestack className="mr-3" /> 
          <span className="text-lg">Servicios</span>
        </a>
        <a href="#about" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <FaInfoCircle className="mr-3" /> 
          <span className="text-lg">Acerca de</span>
        </a>
        <a href="#contact" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <FaEnvelope className="mr-3" /> 
          <span className="text-lg">Contacto</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
