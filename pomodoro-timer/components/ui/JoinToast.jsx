"use client"

import { useEffect, useRef } from 'react';  // Agregar useRef para una bandera
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserJoinedToast = ({ user }) => {
  const hasToastFired = useRef(false); // Usamos useRef para mantener la referencia entre renders

  useEffect(() => {
    if (user && !hasToastFired.current) {  // Solo mostrar el toast si no ha sido mostrado
      toast.success(`${user.name || 'Un usuario'} se ha unido a la sala!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      hasToastFired.current = true;  // Marcar como true después de mostrar el toast
    }
  }, [user]);

  return null;  
};

export default UserJoinedToast;
