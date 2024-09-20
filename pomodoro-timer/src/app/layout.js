import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../../components/ui/Navbar';
import { ChakraProvider } from '@chakra-ui/react'; // Asegúrate de importar ChakraProvider

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Pomo',
  description: 'La aplicación más cute para mejorar tu concentración',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.className} flex`}>
        {/* ChakraProvider envuelve toda la aplicación */}
        <ChakraProvider>
          <Navbar /> {/* Aquí va el Navbar */}
          <main className="flex-1 ml-64"> {/* Ajusta el margin-left según el diseño */}
            {children}
          </main>
        </ChakraProvider>
      </body>
    </html>
  );
}
