"use client"
import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaInfoCircle, FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      {/* Botón del menú burger */}
      <div className="fixed top-0 left-0 p-4 z-50 md:hidden">
        <button 
          onClick={toggleMenu} 
          className="text-white bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition-colors duration-200"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menú lateral */}
      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-[#815ef3] min-h-screen flex flex-col items-center py-8 z-50 md:hidden transition-transform duration-300 ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
      >
        <div className="text-white text-3xl font-bold mb-12">PoMo</div>
        <div className="flex flex-col space-y-6">
          <a href="#home" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaHome className="mr-3" />
            <span className="text-lg">Inicio</span>
          </a>
          <a href="#about" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaInfoCircle className="mr-3" />
            <span className="text-lg">FAQ's</span>
          </a>
          <a href="#leave" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaArrowLeft className="mr-3" />
            <span className="text-lg">Abandonar la sesión</span>
          </a>
        </div>
      </div>

      {/* Menú superior para pantallas grandes */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-[#815ef3] min-h-screen flex-col items-center py-8 z-50">
        <div className="text-white text-3xl font-bold mb-12">PoMo</div>
        <div className="flex flex-col space-y-6">
          <a href="#home" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaHome className="mr-3" />
            <span className="text-lg">Inicio</span>
          </a>
          <a href="#about" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaInfoCircle className="mr-3" />
            <span className="text-lg">FAQ's</span>
          </a>
          <a href="#leave" className="flex items-center text-gray-300 hover:text-white transition-colors duration-200">
            <FaArrowLeft className="mr-3" />
            <span className="text-lg">Abandonar la sesión</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
