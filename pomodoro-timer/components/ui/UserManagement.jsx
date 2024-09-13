import React from 'react';
import { UserProvider, useUser } from "../../src/Context/UserContext"
import UserNameForm from './UserNameForm';
import UserCard from './UserCard';
import { motion } from 'framer-motion';

const UserCardWrapper = () => {
  const { activeUser } = useUser();
  
  if (!activeUser) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8"
    >
      <UserCard />
    </motion.div>
  );
};

const UserManagement = () => {
  return (
    <UserProvider>
      <div className="container mx-auto px-4">
        <UserNameForm />
        <UserCardWrapper />
      </div>
    </UserProvider>
  );
};

export default UserManagement;