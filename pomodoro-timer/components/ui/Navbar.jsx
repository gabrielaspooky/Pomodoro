// components/ui/Navbar.js

import React from 'react';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#815ef3] min-h-screen flex flex-col items-center py-8 z-50">
      <div className="text-white text-3xl font-bold mb-12">PoMo</div>
      <div className="flex flex-col space-y-6">
        <a href="#home" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
          <FaHome className="mr-3" />
          <span className="text-lg">Inicio</span>
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
