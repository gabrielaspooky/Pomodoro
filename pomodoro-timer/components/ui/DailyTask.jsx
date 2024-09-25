'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, GraduationCap, Laptop, Plus, Check, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const activities = [
  { name: 'Ejercicio', icon: Dumbbell },
  { name: 'Estudio', icon: GraduationCap },
  { name: 'Desarrollo web', icon: Laptop },
]

export default function SetDailyTask({ onActivitySelect }) {
  const [customActivity, setCustomActivity] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)

  const handleCustomActivity = () => {
    setIsCustom(true)
    setSelectedActivity(null)
  }

  const handleActivitySelection = (activity) => {
    if (activity.trim()) {
      setSelectedActivity(activity)
      onActivitySelect(activity)
    }
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    handleActivitySelection(customActivity)
  }

  return (
    <div>
      <div className="w-full max-w-md bg-white/90 rounded-3xl p-6">
        <h2 className="text-2xl md:text-3xl text-center whitespace-nowrap">
          Cuéntale a Pomo qué harás hoy
        </h2>
        <motion.div 
          className="grid grid-cols-2 gap-4 mb-4 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activities.map((activity) => (
            <motion.button
              key={activity.name}
              onClick={() => handleActivitySelection(activity.name)}
              className={`bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition hover:bg-[#E5E5EA] relative overflow-hidden ${
                selectedActivity === activity.name ? 'ring-2 ring-purple-500' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <activity.icon className="w-12 h-12 mb-2 text-[#2D2D2D]" />
              <span className="text-lg font-medium">{activity.name}</span>
              {selectedActivity === activity.name && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 bg-opacity-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Check className="text-purple-500 w-8 h-8" />
                </motion.div>
              )}
            </motion.button>
          ))}
          <AnimatePresence>
            {isCustom ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="col-span-2 bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center"
              >
                <form onSubmit={handleCustomSubmit} className="w-full">
                  <div className="flex items-center w-full mb-2">
                    <Input
                      type="text"
                      value={customActivity}
                      onChange={(e) => setCustomActivity(e.target.value)}
                      placeholder="Escribe tu actividad"
                      className="flex-grow bg-transparent border-none text-lg placeholder-[#8E8E93] focus:outline-none px-2 py-1"
                      autoFocus
                    />
                    <Button
                      type="button"
                      onClick={() => setIsCustom(false)}
                      className="ml-2 p-2 text-[#8E8E93] hover:text-[#2D2D2D]"
                      variant="ghost"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 text-white"
                  >
                    Seleccionar
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.button
                onClick={handleCustomActivity}
                className="bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition hover:bg-[#E5E5EA]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-12 h-12 mb-2 text-[#2D2D2D]" />
                <span className="text-lg font-medium">Otra actividad</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
