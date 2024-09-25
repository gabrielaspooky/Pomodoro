"use client";
import { useEffect, useState } from 'react';

export default function ApiFetcher() {
  const [consejos, setConsejos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusCode, setStatusCode] = useState(null);
  const [consejoAleatorio, setConsejoAleatorio] = useState(null);

  useEffect(() => {
    async function fetchConsejos() {
      setLoading(true);
      try {
        const res = await fetch('/api/getAdvice');
        setStatusCode(res.status);
        if (!res.ok) {
          throw new Error(`Error al obtener los datos: ${res.status}`);
        }
        const data = await res.json();

        if (!Array.isArray(data.consejos)) {
          throw new Error("Formato de respuesta incorrecto. 'consejos' debe ser un array.");
        }

        setConsejos(data.consejos);
        if (data.consejos.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * data.consejos.length);
          setConsejoAleatorio(data.consejos[indiceAleatorio]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchConsejos(); 
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-red-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Error al cargar los consejos</h2>
        <p className="text-red-600 mb-2">Mensaje de error: {error}</p>
        {statusCode && <p className="text-red-600 mb-2">Código de estado: {statusCode}</p>}
        <p className="text-red-600">Por favor, intenta recargar la página o contacta al soporte si el problema persiste.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-300 to-purple-300 p-4 rounded-lg">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <h1 className="text-3xl font-bold text-center text-white">Consejo Productivo del Día</h1>
        </div>
        <div className="p-8">
          {consejoAleatorio ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{consejoAleatorio.advice}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{consejoAleatorio.descripcion}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">No hay consejos disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
}