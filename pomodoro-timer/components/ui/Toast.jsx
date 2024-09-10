// components/UserToast.js

import React from 'react';
import { toast } from 'react-toastify';

const UserToast = ({ user }) => {
  React.useEffect(() => {
    if (user) {
      toast.info(`${user.name} se ha unido a la sala!`, {
        position: top,
      });
    }
  }, [user]);

  return null;
};

export default UserToast;
