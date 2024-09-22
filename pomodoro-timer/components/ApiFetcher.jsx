"use client";
import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const ApiFetcher = () => {
  const [advice, setAdvice] = useState('');
  const [translatedAdvice, setTranslatedAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();

      if (response.ok) {
        setAdvice(data.slip.advice);
        await translateAdvice(data.slip.advice);
      } else {
        setError('Error al obtener el consejo');
      }
    } catch (error) {
      console.error('Error al obtener el consejo:', error);
      setError('Ocurrió un error al obtener el consejo');
    } finally {
      setLoading(false);
    }
  };

  const translateAdvice = async (text) => {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://libretranslate.de/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'es',
          format: 'text',
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setTranslatedAdvice(data.translatedText);
      } else {
        setError('Error al traducir el consejo');
      }
    } catch (error) {
      console.error('Error en la traducción:', error);
      setError('Ocurrió un error al traducir el consejo');
    }
  };
  
  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={6}>
      {loading ? (
        <Text></Text>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <Text fontSize="lg" fontWeight="bold">Consejo: {advice}</Text>
          <Text fontSize="lg" fontWeight="bold" mt={2} color="blue.600">Consejo traducido: {translatedAdvice}</Text>
        </>
      )}
    </Box>
  );
};

export default ApiFetcher;
