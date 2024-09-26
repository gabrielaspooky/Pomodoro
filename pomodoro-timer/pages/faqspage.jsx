'use client'
import React from 'react';
import PomodoroFaq from '../components/ui/PomodoFAQs';


export default function faqspage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <PomodoroFaq />
      </div>
    </div>
  );
}