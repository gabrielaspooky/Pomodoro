"use client"
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import ApiFetcher from "../ApiFetcher"

export default function BreakTimeModal({ isBreak, onClose, username }) {
  const [action, setAction] = useState("")

  useEffect(() => {
    if (isBreak) {
      setAction("")
    }
  }, [isBreak])

  const handlePlayWithPom = () => {
    setAction("play")
    onClose()  // Cerramos el modal principal
  }

  const handleSuggestion = () => {
    setAction("suggestion")
  }

  const handleJoke = () => {
    setAction("joke")
  }

  return (
    <>
      {isBreak && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={onClose}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h2 className="text-2xl mb-6 text-indigo-600">
                ¿Qué quieres hacer en tu break time, {username || 'amig@'}?
              </h2>

              <div className="flex flex-col gap-4">
                <Button 
                  size="lg" 
                  onClick={handlePlayWithPom}  
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Juega con Pom
                </Button>
                <Button 
                  size="lg" 
                  onClick={handleSuggestion}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Dame una sugerencia
                </Button>

              </div>
            </div>
          </div>
        </div>
      )}


      {action === "suggestion" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setAction("")}
            >
              <X className="w-6 h-6" />
            </button>

            <ApiFetcher />
          </div>
        </div>
      )}
    </>
  )
}
