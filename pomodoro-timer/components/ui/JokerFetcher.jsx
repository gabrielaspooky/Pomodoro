// "use client"
// import { useState, useEffect } from 'react'
// import { Button } from "@/components/ui/button"

// export default function JokeFetcher() {
//   const [joke, setJoke] = useState({ setup: "", punchline: "", joke: "" })
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   // Función para traducir texto utilizando LibreTranslate
//   const translateText = async (text, targetLang = "es") => {
//     try {
//       const response = await fetch("https://libretranslate.de/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           q: text,
//           source: "en",
//           target: targetLang,
//           format: "text",
//         }),
//       });
//       const data = await response.json();
//       return data.translatedText;
//     } catch (error) {
//       console.error("Error traduciendo el texto:", error);
//       return text; // Devuelve el texto original si hay un error
//     }
//   };

//   const fetchJoke = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch("https://official-joke-api.appspot.com/jokes/random");
//       if (!response.ok) {
//         throw new Error("Error obteniendo el chiste");
//       }

//       const data = await response.json();

//       if (data.type === "single") {
//         const translatedJoke = await translateText(data.joke, "es");
//         setJoke({ joke: translatedJoke, setup: "", punchline: "" });
//       } else {
//         const translatedSetup = await translateText(data.setup, "es");
//         const translatedPunchline = await translateText(data.punchline, "es");
//         setJoke({ setup: translatedSetup, punchline: translatedPunchline, joke: "" });
//       }
//     } catch (err) {
//       setError("No se pudo obtener el chiste.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJoke();
//   }, []);

//   return (
//     <div className="text-center">
//       <h2 className="text-2xl font-semibold mb-4">Ríe con pom</h2>

//       {loading && <p>Cargando chiste...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div>
//           {joke.joke ? (
//             <p>{joke.joke}</p>
//           ) : (
//             <>
//               <p>{joke.setup}</p>
//               <p><strong>{joke.punchline}</strong></p>
//             </>
//           )}
//         </div>
//       )}

//       <Button className="mt-4" onClick={fetchJoke}>
//         Cuéntame otro chiste
//       </Button>
//     </div>
//   );
// }
