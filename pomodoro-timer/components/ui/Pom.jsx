"use client"
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../public/pom';

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
