import React, { useState } from 'react'
import { Menu, Dumbbell, GraduationCap, Laptop, Plus } from 'lucide-react'

const activities = [
  { name: 'Ejercicio', icon: Dumbbell },
  { name: 'Estudio', icon: GraduationCap },
  { name: 'Desarrollo web', icon: Laptop },
]

export default function SetDailyTask() {
  const [customActivity, setCustomActivity] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  const handleCustomActivity = () => {
    setIsCustom(true)
  }

  const handleActivitySelection = (activity) => {
    
    console.log(`Selected activity: ${activity}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B5B9FF] to-[#E4B7FF] p-4 font-sans text-[#2D2D2D]">

      <main className="max-w-md mx-auto">
       

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Cuéntale a Pomo qué harás hoy</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {activities.map((activity) => (
              <button
                key={activity.name}
                onClick={() => handleActivitySelection(activity.name)}
                className="bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition hover:bg-[#E5E5EA]"
              >
                <activity.icon className="w-12 h-12 mb-2 text-[#2D2D2D]" />
                <span className="text-lg font-medium">{activity.name}</span>
              </button>
            ))}
            {isCustom ? (
              <div className="bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center aspect-square">
                <input
                  type="text"
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  placeholder="Otra actividad"
                  className="box-border hover:box-content w-full bg-transparent border-b border-[#2D2D2D] text-center text-lg placeholder-[#8E8E93] focus:outline-none"
                />
              </div>
            ) : (
              <button
                onClick={handleCustomActivity}
                className="bg-[#F2F2F7] rounded-xl p-4 flex flex-col items-center justify-center aspect-square transition hover:bg-[#E5E5EA]"
              >
                <Plus className="w-12 h-12 mb-2 text-[#2D2D2D]" />
                <span className="text-lg font-medium">Otra actividad</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {/* Handle start logic */}}
            className="w-full py-3 rounded-full font-bold text-white bg-[#4CD964] hover:bg-[#3CB371] transition"
          >
            Empezar
          </button>
        </div>
      </main>
    </div>
  )
}