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

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="purple.50" borderRadius="xl" boxShadow="xl">
          <ModalHeader color="purple.700" fontSize="2xl" fontWeight="bold" textAlign="center">Tecnologías utilizadas</ModalHeader>
          <ModalCloseButton color="purple.500" />
          <ModalBody pb={6}>
            <Text mb={6} color="purple.700" fontSize="lg" textAlign="center">Este proyecto ha sido desarrollado con las siguientes tecnologías:</Text>
            <Flex justify="center" align="center" wrap="wrap" gap={4}>
              <Image
                src="https://download.logo.wine/logo/React_(web_framework)/React_(web_framework)-Logo.wine.png"
                alt="React Logo"
                boxSize="60px"
                objectFit="contain"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.1)' }}
              />
              <Image
                src="https://one.next14.com/wp-content/uploads/2021/03/Logo_Next14_Blu_RGB45377700.png"
                alt="Next 14 Logo"
                boxSize="50px"
                objectFit="contain"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Socket-io.svg/1024px-Socket-io.svg.png"
                alt="Socket.io Logo"
                boxSize="40px"
                objectFit="contain"
              />
              <Image
                src="https://d7umqicpi7263.cloudfront.net/img/product/a85c339a-26e4-4ca8-b5af-482c83923038.com/a8382933f1d18924d596e2941df55531"
                alt="Mongo DB Logo"
                boxSize="100px"
                objectFit="contain"
              />
                   <Image
                src="https://railway.app/brand/logotype-dark.png"
                alt="Railway"
                boxSize="100px"
                objectFit="contain"
              />
                   <Image
                src="https://getlogovector.com/wp-content/uploads/2021/01/tailwind-css-logo-vector.png"
                alt="Tailwind"
                boxSize="100px"
                objectFit="contain"
              />
               <Image
                src="https://img.icons8.com/?size=512&id=r9QJ0VFFrn7T&format=png"
                alt="Chakra"
                boxSize="50px"
                objectFit="contain"
              />
                 <Image
                src="https://tsh.io/wp-content/uploads/fly-images/32664/framer-motion-logo-1-312x211.png"
                alt="Framer Motion"
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