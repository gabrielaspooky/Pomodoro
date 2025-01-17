"use client"

import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLeftToast = ({ user }) => {
  useEffect(() => {
    if (user) {
      toast.info("Alguien ha abandonado la sala", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [user]);

  return null;
};

export default UserLeftToast;
