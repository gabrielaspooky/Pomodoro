'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

export default function SessionEnding() {
  const router = useRouter();

  const handleRejoinSession = () => {
    // Aquí iría la lógica para volver a unirse a la sesión
    console.log("Volviendo a unirse a la sesión...");
    router.push("/");  
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 text-white p-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Image
            src="/Pomo-bye.jpg"
            alt="Mascota despidiéndose"
            width={290}
            height={290}
            className="mx-auto mb-6 rounded-full"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-bold text-purple-800 mb-4"
        >
          ¡Nos vemos luego!
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-gray-600 mb-8"
        >
          Has abandonado la sesión.
          <br />
          Pom espera verte pronto de vuelta.
        </motion.p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button 
            onClick={handleRejoinSession}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Volver a unirte a la sesión
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}