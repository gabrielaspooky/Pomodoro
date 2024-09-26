"use client"

import React from 'react'
import { motion } from 'framer-motion'

export default function MinimalistTextLoading() {
  const dotVariants = {
    hidden: { opacity: 0.3 },
    visible: { opacity: 1 },
  }

  const containerVariants = {
    hidden: { transition: { staggerChildren: 0.2 } },
    visible: { transition: { staggerChildren: 0.2 } },
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="flex space-x-2 mb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-2 h-2 bg-gray-600 rounded-full"
            variants={dotVariants}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.6,
            }}
          />
        ))}
      </motion.div>
      <p className="text-gray-600 text-sm">Espera unos segundos</p>
    </div>
  )
}