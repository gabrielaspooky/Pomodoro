import React from 'react';
import { toast } from 'react-toastify';

const UserToast = ({ user }) => {
  React.useEffect(() => {
    if (user) {
      toast.info(`¡Un nuevo Pom llamado ${user.name} se ha unido a la sala!`, {
        position: top,
      });
    }
  }, [user]);

  return null;
};

export default UserToast;
