"use client";
import { useEffect, useState } from 'react';

export default function ApiFetcher() {
  const [consejos, setConsejos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    async function fetchConsejos() {
      setLoading(true); // Iniciar carga
      try {
        const res = await fetch('/api/getAdvice');
        if (!res.ok) {
          throw new Error(`Error al obtener los datos: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data.consejos)) {
          throw new Error("Formato de respuesta incorrecto. 'consejos' debe ser un array.");
        }

        setConsejos(data.consejos);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Finalizar carga
      }
    }
    fetchConsejos(); 
  }, []);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Mostrar el error en la interfaz
  }

  return (
    <div>
      <h1>Consejos Productivos</h1>
      {consejos.length === 0 ? (
        <p>No hay consejos disponibles</p>
      ) : (
        <ul>
          {consejos.map((consejo, index) => (
            <li key={consejo._id || index}>
              <h3>{consejo.advice}</h3>
              <p>{consejo.descripcion}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
