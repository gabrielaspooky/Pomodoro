import { Input, Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UserNameForm = () => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.length >= 2) {
      alert(`Username set to: ${username}`)
      setUsername('') // Limpia el input después de enviar
    } else {
      alert('Username must be at least 2 characters.')
    }
  }

  return (
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
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            placeholder="Crea un nombre de usuario"
            size="lg"
            bg="white"
            focusBorderColor="#815ef3"
          />
          <Button 
            type="submit" 
            colorScheme="purple" 
            size="lg" 
            isFullWidth
          >
            Crear
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default UserNameForm
