"use client"
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../public/pom';
import pomSleep from '../../public/pom';

const Pom = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  return (
    <div>
       <div>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
    </div>
  )
}

export default Pom




// "use client";
// import React from 'react';
// import Lottie from 'react-lottie';
// import { pom.json } from '../../public/pom.json';  // Asume que tienes el archivo de animación JSON

// const Pom = ({ isBreak, isActive }) => {
//   if (isBreak) {
//     // Si está en descanso, renderizamos la imagen estática
//     return <img src="/pom-sleep.png" alt="Pom dormido" width={400} height={400} />;
//   }

//   // Si no está en descanso, renderizamos la animación usando Lottie
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: awakeAnimation,  // Animación en JSON para cuando está despierto
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice"
//     }
//   };

//   return (
//     <div>
//       <Lottie 
//         options={defaultOptions}
//         height={400}
//         width={400}
//       />
//     </div>
//   );
// };

// export default Pom;
