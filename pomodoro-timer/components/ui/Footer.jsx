'use client'

import { Box, Text, Link, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Flex, Image } from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react'

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalOpened, setModalOpened] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState(null)

  const handleScroll = useCallback(() => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }

    setShowFooter(true)

    const timeout = setTimeout(() => {
      setShowFooter(false)
    }, 2000)

    setScrollTimeout(timeout)
  }, [scrollTimeout])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [handleScroll, scrollTimeout])

  const handleOpenModal = () => {
    onOpen()
    setModalOpened(true)
  }

  return (
    <Box
      as="footer"
      width="100%"
      py={4}
      bg="purple.500"
      color="white"
      textAlign="center"
      position="fixed"
      bottom={0}
      left={0}
      zIndex={100}
      transform={showFooter ? 'translateY(0)' : 'translateY(100%)'}
      transition="transform 0.1s ease-in-out"
    >
      <Text fontSize="sm">
        Hecho con amor por{' '}
        <Link
          fontWeight="bold"
          textDecoration="underline"
          _hover={{ color: 'purple.200' }}
          onClick={handleOpenModal}
        >
          Gabriela Nava
        </Link>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tecnologías utilizadas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Este proyecto ha sido hecho con las siguientes tecnologías:</Text>
            <Flex justify="center" align="center" wrap="wrap" gap={4}>
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="React Logo"
                boxSize="50px"
                objectFit="contain"
              />
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Socket.io Logo"
                boxSize="50px"
                objectFit="contain"
              />
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Chakra UI Logo"
                boxSize="50px"
                objectFit="contain"
              />
              <Image
                src="/placeholder.svg?height=50&width=50"
                alt="Next.js Logo"
                boxSize="50px"
                objectFit="contain"
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}