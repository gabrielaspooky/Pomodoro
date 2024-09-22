"use client";
import React from 'react';
import Lottie from 'react-lottie';
import awakeAnimation from '../../public/pom.json'; // Animación del perrito despierto
import Image from 'next/image'; // Para la imagen del perrito dormido

const Pom = ({ isBreak }) => {
  // Opciones para la animación de Lottie (perrito despierto)
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: awakeAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="pom-container flex flex-col items-center">
      {/* Si estamos en la fase de descanso, mostramos el perrito dormido */}
      {isBreak ? (
        <Image
          src="/pomSleep.png" // Asegúrate de tener esta imagen en tu carpeta pública
          alt="Perrito dormido"
          width={400}
          height={400}
          className="mx-auto animate-pulse"
        />
      ) : (
        // Si no estamos en la fase de descanso, mostramos la animación de Lottie (perrito despierto)
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      )}
      {/* Mostrar un mensaje dependiendo de la fase */}
      <p className="text-center mt-4 text-lg">
        {isBreak ? '¡Hora del break!💤' : '¡Modo focus! 👀'}
      </p>
    </div>
  );
};

export default Pom;
