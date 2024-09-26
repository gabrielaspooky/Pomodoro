"use client";
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { FaHome, FaInfoCircle, FaArrowLeft, FaBars, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Navbar = ({ onLeave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopNavVisible, setIsDesktopNavVisible] = useState(true);
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

  useEffect(() => {
    document.body.classList.toggle('nav-hidden', !isDesktopNavVisible);
  }, [isDesktopNavVisible]);

  const toggleDesktopNav = () => {
    setIsDesktopNavVisible(!isDesktopNavVisible);
  };

  return (
    <div>
      {/* Botón del menú burger para móviles */}
      <div className="fixed top-0 left-0 p-4 z-50 md:hidden">
        <button 
          onClick={toggleMenu} 
          className="text-white bg-[#5B18E2] p-2 rounded-full hover:bg-[#5B18E2] transition-colors duration-200"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Menú lateral para móviles */}
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
          <Link href="/faqspage" className="flex items-center text-[#5B18E2] hover:text-[#4A14B8] transition-colors duration-200">
            <FaInfoCircle className="mr-3" />
            <span className="text-lg">FAQ's</span>
          </Link>
          <button
            onClick={onLeave}
            className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="mr-3" />
            <span className="text-lg">Abandonar la sesión</span>
          </button>
        </div>
      </div>

      {/* Botón para ocultar/mostrar la barra de navegación en escritorio */}
      <div className="hidden md:block fixed top-4 left-4 z-50">
        <button 
          onClick={toggleDesktopNav} 
          className="text-white bg-[#5B18E2] p-2 rounded-full hover:bg-[#4A14B8] transition-colors duration-200"
        >
          {isDesktopNavVisible ? <FaChevronLeft size={24} /> : <FaChevronRight size={24} />}
        </button>
      </div>

      {/* Menú para pantallas grandes */}
      <div className={`hidden md:flex fixed top-0 left-0 h-screen bg-[#c3ccfe] flex-col items-center py-8 z-40 transition-all duration-300 ${
        isDesktopNavVisible ? 'w-64' : 'w-0 overflow-hidden'
      }`}>
        <Link href="/">
          <img src="/POMo-logo.png" alt="Logo" className="mb-6 cursor-pointer" />
        </Link>
        <div className="flex flex-col space-y-6">
          <a href="#home" className="flex items-center text-[#5B18E2] hover:text-[#4A14B8] transition-colors duration-200">
            <FaHome className="mr-3" />
            <span className="text-lg">Inicio</span>
          </a>
          <Link href="/faqspage" className="flex items-center text-[#5B18E2] hover:text-[#4A14B8] transition-colors duration-200">
            <FaInfoCircle className="mr-3" />
            <span className="text-lg">FAQ's</span>
          </Link>
        
          <button
            onClick={onLeave}
            className="flex items-center text-[#5B18E2] hover:text-[#4A14B8] transition-colors duration-200"
          >
            <FaArrowLeft className="mr-3" />
            <span className="text-lg">Abandonar la sesión</span>
          </button>
        </div>
      </div>

      {/* Fondo de la navbar para escritorio */}
      <div className={`hidden md:block fixed top-0 left-0 h-screen w-64 bg-[#c3ccfe] z-30 transition-all duration-300 ${
        isDesktopNavVisible ? 'transform translate-x-0' : 'transform -translate-x-full'
      }`}></div>
    </div>
  );
};

export default Navbar;