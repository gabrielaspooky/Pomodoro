import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../../components/ui/Navbar';
import UserProvider from '../../context/UserContext';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Pomo',
  description: 'Tu asistente personal para la productividad y el bienestar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.className} flex min-h-screen flex-col`}>
        <UserProvider>
          <Navbar />
          <main className="flex-1 mt-16 container mx-auto px-4">
            {children}
          </main>
          <footer className="py-4 text-center text-gray-600">
            © {new Date().getFullYear()} Pomo. Todos los derechos reservados.
          </footer>
        </UserProvider>
      </body>
    </html>
  );
}