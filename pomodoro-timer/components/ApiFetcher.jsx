"use client"
import { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const ApiFetcher = () => {
  const [advice, setAdvice] = useState(''); // Estado para almacenar el consejo
  const [loading, setLoading] = useState(true); // Indicador de carga

  // El prompt predefinido
  const prompt = "Dame un consejo de salud para mejorar mi bienestar";

  // Función para obtener el consejo desde la API
  const fetchAdvice = async () => {
    try {
      const response = await fetch('/api/getAdvice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }), // Enviamos el prompt a la API
      });

      const data = await response.json();

      if (response.ok) {
        setAdvice(data.advice); // Guardamos el consejo en el estado
      } else {
        setAdvice('Error al obtener el consejo');
      }
    } catch (error) {
      console.error('Error al obtener el consejo:', error);
      setAdvice('Ocurrió un error al obtener el consejo');
    } finally {
      setLoading(false); // Ocultamos el estado de carga
    }
  };

  // Llamamos a la función para obtener el consejo al montar el componente
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mt={6}>
      {loading ? (
        <Text>Cargando consejo de salud...</Text>
      ) : (
        <Text fontSize="lg" fontWeight="bold">Consejo de salud: {advice}</Text>
      )}
    </Box>
  );
};

export default ApiFetcher;
