import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Mi Sitio</div>
        <div className="flex space-x-4">
          <a href="#home" className="text-gray-300 hover:text-white">
            Inicio
          </a>
          <a href="#services" className="text-gray-300 hover:text-white">
            Servicios
          </a>
          <a href="#about" className="text-gray-300 hover:text-white">
            Acerca de
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
