"use client"

import { useEffect, useRef } from 'react';  // Agregar useRef para una bandera
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserJoinedToast = ({ user }) => {
  const hasToastFired = useRef(false); 

  useEffect(() => {
    if (user && !hasToastFired.current) { 
      toast.success(`${user.name || '¡Un nuevo usuario'} se ha unido a la sala!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      hasToastFired.current = true;  
    }
  }, [user]);

  return null;  
};

export default UserJoinedToast;
