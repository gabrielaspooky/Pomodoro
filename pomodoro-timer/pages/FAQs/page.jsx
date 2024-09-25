import React from 'react';
import PomodoroFaq from '../components/ui/PomodoroFAQs';

export default function FAQsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h1>
      <PomodoroFaq />
    </div>
  );
}