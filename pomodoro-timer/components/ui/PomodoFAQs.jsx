import React, { useState } from 'react';

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
    <div className="max-w-2xl mx-auto p-4">
      <h3 className="text-3xl font-bold text-center mb-6 whitespace-nowrap">Preguntas frecuentes sobre la técnica pomodoro</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left text-lg font-medium text-[#2D2D2D] focus:outline-none"
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
