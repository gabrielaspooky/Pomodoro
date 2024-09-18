import { Input, Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UserNameForm = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('') // Nuevo estado para el mensaje

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.length >= 2) {
      setMessage(`¡Pom te da la bienvenida, ${username}!`)
      setUsername('') // Limpia el input después de enviar
    } else {
      setMessage("El nombre de usuario debe tener al menos 2 caracteres.")
    }
  }

  return (
    <Box 
      bg="white" 
      p={10} 
      rounded="xl" 
      maxW="md" 
      mx="auto" 
      mt={16} 
      textAlign="center"
    >
      <Heading mb={6} size="lg" color="purple.500">Crea un usuario</Heading>
      <Text mb={6} color="black" fontSize="md">Elige un nombre para tu pom-persona</Text>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} p={4} py={2}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            placeholder="¿Cómo te llamas?"
            size="lg"
            bg="gray.100"
            focusBorderColor="#ac8fc9"
          />
          <Button 
            type="submit" 
            colorScheme="purple" 
            size="lg" 
          >
            Crear
          </Button>
        </VStack>
      </form>

      {/* Mostramos el mensaje aquí */}
      {message && (
        <Text 
          mt={4} 
          fontSize="lg" 
          color={message.includes('bienvenida') ? 'green.500' : 'red.500'} 
        >
          {message}
        </Text>
      )}
    </Box>
  )
}

export default UserNameForm
