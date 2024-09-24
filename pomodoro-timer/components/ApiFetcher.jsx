"use client"
import { useEffect, useState } from 'react';

export default function ApiFetcher() {
  const [advices, setAdvices] = useState([]);

  useEffect(() => {
    async function fetchAdvice() {
      const res = await fetch('/api/getAdvice');
      const data = await res.json();
      setAdvices(data.advices);
    }
    fetchAdvice(); 
  }, []);

  return (
    <div>
      <h1>Consejos Productivos</h1>
      <ul>
        {advices.map((advice, index) => (
          <li key={index}>
            <h3>{advice.advice}</h3>
            <p>{advice.adviceDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
