"use client"

import React, { useState } from 'react';
import { Box, Button, Heading, Input, Text, VStack, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useUser } from '../../src/Context/UserContext'; // Make sure this path is correct

const UserNameForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { handleUserSubmit } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim().length >= 2) {
      handleUserSubmit(username.trim());
      setUsername('');
      setError('');
    } else {
      setError('El nombre de usuario debe tener al menos 2 caracteres.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box 
        bg="gray.100" 
        p={8} 
        rounded="lg" 
        boxShadow="lg" 
        maxW="sm" 
        mx="auto" 
        mt={12} 
        textAlign="center"
      >
        <Heading mb={4} size="lg" color="#815ef3">Crea un usuario</Heading>
        <Text mb={4} color="gray.600">Elige un nombre para tu pom-persona</Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={!!error}>
              <FormLabel htmlFor="username" srOnly>Nombre de usuario</FormLabel>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="filled"
                placeholder="Crea un nombre de usuario"
                size="lg"
                bg="white"
                focusBorderColor="#815ef3"
                aria-describedby="username-error"
              />
              <FormErrorMessage id="username-error">{error}</FormErrorMessage>
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="purple" 
              size="lg" 
              isFullWidth
              isDisabled={username.trim().length < 2}
            >
              Crear
            </Button>
          </VStack>
        </form>
      </Box>
    </motion.div>
  );
};

export default UserNameForm;