"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import JokeFetcher from "../ui/JokerFetcher"

export default function BreakTimeModal() {
  const [isBreakTimeModalOpen, setIsBreakTimeModalOpen] = useState(false)
  const [action, setAction] = useState("")

  const handleJoke = () => {
    setAction("joke")
  }

  const handleSuggestion = () => {
    alert("Aquí tienes una sugerencia: organiza tu espacio de trabajo o aprende algo nuevo en línea.")
  }

  return (
    <>
      <Button onClick={() => setIsBreakTimeModalOpen(true)}>¿Qué quieres hacer?</Button>

      {isBreakTimeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsBreakTimeModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">¿Qué deseas hacer en tu tiempo libre?</h2>

              <div className="flex flex-col gap-4">
                <Button size="lg" onClick={() => setAction("play")}>
                  Juega con Pom
                </Button>
                <Button size="lg" onClick={handleSuggestion}>
                  Sugiéreme algo productivo
                </Button>
                <Button size="lg" onClick={handleJoke}>
                  Cuéntame un chiste
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mostrar la acción seleccionada */}
      {action === "play" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setAction("")}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">¡Juega con Pom!</h2>
            {/* Aquí podrías insertar el contenido del juego */}
          </div>
        </div>
      )}

      {action === "joke" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setAction("")}
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">Aquí tienes un chiste:</h2>
            <JokeFetcher />
          </div>
        </div>
      )}
    </>
  )
}
