import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '../../components/ui/Navbar';
import { ChakraProvider, Box } from '@chakra-ui/react'; // Importar Box de Chakra UI
import Footer from '../../components/ui/Footer';
import { UsernameProvider } from '../../context/UsernameContext';
import { TaskProvider } from '../../context/TaskContext';
import FAQsPage from '../../pages/faqspage';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'Pomo',
  description: 'La aplicación más cute para mejorar tu concentración',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.className} flex`}>
        <UsernameProvider>
          <TaskProvider>
            <ChakraProvider>
              <Navbar />
              <Box as="main" className="flex-1" ml={{ base: 0, md: 64 }} p={4}> {/* Ajusta el margin-left y padding */}
                {children}
                <FAQsPage />
              </Box>
              <Footer />
            </ChakraProvider>
          </TaskProvider>
        </UsernameProvider>
      </body>
    </html>
  );
}
