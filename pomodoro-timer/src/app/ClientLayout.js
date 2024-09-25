"use client"
import { useState } from 'react';
import Navbar from '../../components/ui/Navbar';

export default function ClientLayout({ children }) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <div className="flex">
      <Navbar isVisible={isNavbarVisible} setIsVisible={setIsNavbarVisible} />
      <main className={`flex-1 transition-all duration-300 ${isNavbarVisible ? 'ml-64' : 'ml-0'}`}>
        {children}
      </main>
    </div>
  );
}