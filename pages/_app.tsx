import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TodosProvider } from '../contexts/TodosContext';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SnackBarProvider } from '../contexts/SnackbarContext';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <TodosProvider>
        <SnackBarProvider>
          <Navbar />
          <Component {...pageProps} />
        </SnackBarProvider>
      </TodosProvider>
    </UserProvider>
  );
}
export default MyApp;
