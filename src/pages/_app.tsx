import Router from 'next/router';
import { useState, useEffect } from 'react';
import 'raf/polyfill';
import type { AppProps } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from '../redux';
import { Loader } from '../components/ui';
import { Container } from '../components/ui';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setIsLoading(true);
    };
    const end = () => {
      setIsLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isLoading ? <Loader size={'large'} full /> : null}
        <Container>{<Component {...pageProps} />}</Container>
        <ToastContainer
          autoClose={2000}
          theme={'colored'}
          hideProgressBar={false}
        />
      </PersistGate>
    </Provider>
  );
}
