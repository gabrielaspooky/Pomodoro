import { Outfit } from 'next/font/google';
import './globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import ClientLayout from './ClientLayout';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Pomo',
  description: 'La aplicación más cute para mejorar tu concentración',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <ChakraProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </ChakraProvider>
      </body>
    </html>
  );
}
