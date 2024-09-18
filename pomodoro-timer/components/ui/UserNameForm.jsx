import { Input, Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UserNameForm = () => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.length >= 2) {
      alert(`¡Bienvenid@, ${username}!`)
      setUsername('') // Limpia el input después de enviar
    } else {
      alert('Tu usuario debe tener como mínimo dos caracteres')
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
    </Box>
  )
}

export default UserNameForm
