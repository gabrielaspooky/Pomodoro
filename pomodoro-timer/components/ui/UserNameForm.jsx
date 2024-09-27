'use client';

import { Input, Box, Button, Heading, Text, VStack, Icon, Flex } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import { UsernameContext } from '../../context/UsernameContext';

export default function UserNameForm({ onSubmit }) {
  const { username, setUsername } = useContext(UsernameContext);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length >= 2) {
      setMessage(`¡Pom te da la bienvenida, ${username}!`);
      onSubmit(username); // Enviar el username al componente padre
      // setUsername(''); // No limpiar el username aquí
    } else {
      setMessage('El nombre de usuario debe tener al menos 2 caracteres.');
    }
  };

  useEffect(() => {
    if (message.includes('bienvenida')) {

      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);


      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Box position="relative" width="100%" maxWidth="400px" margin="auto" padding={6} borderRadius="lg" boxShadow="xl">
      <Box position="absolute" top="-20px" left="50%" transform="translateX(-50%)" p={4}>
        <Icon as={FaUser} w={5} h={5} color="purple.500" />
      </Box>

      <VStack spacing={6} align="center">
        <Heading size={{ base: 'lg', md: 'xl' }} color="purple.500">
          Crea un usuario
        </Heading>
        <Text color="gray.600" fontSize={{ base: 'md', md: 'lg' }}>
          Elige un nombre para tu pom-persona
        </Text>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="filled"
              placeholder="¿Cómo te llamas?"
              size="lg"
              bg="gray.100"
              focusBorderColor="purple.400"
              _hover={{ bg: 'gray.200' }}
              transition="all 0.2s"
            />
            <Button
              type="submit"
              colorScheme="purple"
              size="lg"
              width="full"
              _hover={{ bg: 'purple.600' }}
              transition="all 0.2s"
            >
              Crear
            </Button>
          </VStack>
        </form>

        {message && (
          <Flex
            mt={4}
            p={3}
            bg={message.includes('bienvenida') ? 'green.100' : 'red.100'}
            color={message.includes('bienvenida') ? 'green.700' : 'red.700'}
            rounded="md"
            alignItems="center"
            justifyContent="center"
            width="full"
          >
            <Text fontSize="md" fontWeight="medium">
              {message}
            </Text>
          </Flex>
        )}
      </VStack>
    </Box>
  );
}
