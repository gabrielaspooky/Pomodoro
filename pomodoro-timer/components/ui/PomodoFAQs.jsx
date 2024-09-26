"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';

const faqs = [
  {
    question: '¿Qué es el método Pomodoro?',
    answer:
      'El método Pomodoro es una técnica de gestión del tiempo desarrollada por Francesco Cirillo. Consiste en dividir el trabajo en intervalos de 25 minutos, llamados "pomodoros", separados por breves descansos.',
  },
  {
    question: '¿Cuánto duran los intervalos de trabajo y descanso?',
    answer:
      'Cada pomodoro tiene una duración de 25 minutos. Después de cada pomodoro, se toma un descanso corto de 5 minutos. Después de cuatro pomodoros, se toma un descanso más largo de 15-30 minutos.',
  },
  {
    question: '¿Qué beneficios tiene el método Pomodoro?',
    answer:
      'Este método ayuda a mejorar la concentración y la productividad al reducir las distracciones y asegurar descansos regulares para evitar el agotamiento.',
  },
];

export default function PomodoroFaq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="pomodoro-faq max-w-3xl mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h3 className="pomodoro-faq__title text-2xl sm:text-3xl md:text-4xl text-center mb-6 sm:mb-8 md:mb-10 text-gray-800">
        Preguntas frecuentes sobre la técnica pomodoro
      </h3>
      <div className="pomodoro-faq__list space-y-4 sm:space-y-6">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ 
              backgroundColor: activeIndex === index ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
              scale: activeIndex === index ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-base sm:text-lg md:text-xl font-medium text-black dark:text-white pr-4">{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDownIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "0.5rem" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0" }
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div 
                    className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-base text-gray-700 dark:text-gray-300" 
                    id={`faq-answer-${index}`}
                  >
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
