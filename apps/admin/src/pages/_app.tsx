import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
// import '@/styles/globals.css'
// import '@fontsource/open-sans/600.css'
// import '@fontsource/open-sans/700.css'
import 'react-toastify/dist/ReactToastify.css';

import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';

// import { Context, initialRender } from '../context/sse.context';
import { createServerContext } from 'use-sse';

import DefaultSeo from '@components/ui/default-seo';
import ErrorMessage from '@components/ui/error-message';
import ManagedModal from '@components/ui/modal/managed-modal';
// import { appWithTranslation } from "next-i18next";
import { ModalProvider } from '@components/ui/modal/modal.context';
import PageLoader from '@components/ui/page-loader/page-loader';

import PrivateRoute from '@utils/private-route';

import '@assets/main.css';
import { CartProvider } from '@contexts/quick-cart/cart.context';
import { SettingsProvider } from '@contexts/settings.context';
import { UIProvider } from '@contexts/ui.context';
import { useSettingsQuery } from '@data/settings/use-settings.query';
// import '@fontsource/open-sans'
import '@fontsource/source-serif-pro';
import { StateMachineProvider, createStore } from 'little-state-machine';

const compressPayload = require('compress-json');
export const { ServerDataContext, resolveData } = createServerContext();

const Noop: React.FC = ({ children }) => <>{children}</>;

const AppSettings: React.FC = (props) => {
  const { data, isLoading: loading, error } = useSettingsQuery();
  if (loading) return <PageLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return <SettingsProvider initialValue={data?.options} {...props} />;
};

function getOrCreate() {
  if (process.browser) {
    //decompress the SSR string
    // window._initialDataContext = window.__NEXT_DATA__.props.sse
    window._initialDataContext = compressPayload.decompress(
      window.__NEXT_DATA__.props.sse
    );
    return require('use-sse').createBroswerContext();
  }
  return ServerDataContext;
}

export const Context = getOrCreate();

const CustomApp = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;

  return (
    <Context>
      <StateMachineProvider>
        <PlausibleProvider domain='demo.localhost:3008'>
          <SessionProvider session={pageProps.session}>
            <QueryClientProvider client={queryClientRef.current}>
              <Hydrate state={pageProps.dehydratedState}>
                <AppSettings>
                  <UIProvider>
                    <ModalProvider>
                      <>
                        <CartProvider>
                          <DefaultSeo />
                          {authProps ? (
                            <PrivateRoute authProps={authProps}>
                              <Layout {...pageProps}>
                                <Component {...pageProps} />
                              </Layout>
                            </PrivateRoute>
                          ) : (
                            <Layout {...pageProps}>
                              <Component {...pageProps} />
                            </Layout>
                          )}
                          <ToastContainer autoClose={2000} theme='colored' />
                          <ManagedModal />
                        </CartProvider>
                      </>
                    </ModalProvider>
                  </UIProvider>
                </AppSettings>
                <ReactQueryDevtools />
              </Hydrate>
            </QueryClientProvider>
          </SessionProvider>
        </PlausibleProvider>
      </StateMachineProvider>
    </Context>
  );
};

CustomApp.getInitialProps = async (appContext: AppContext) => {
  const sse = await resolveData();

  const data: AppInitialProps = await App.getInitialProps(appContext);
  const compressPayload = require('compress-json');

  const compressedSSEData = compressPayload.compress(sse.data);
  // const b = JSON.stringify(sse.data).length * 2;
  // const kb = (b / 1024).toFixed(2);

  // const c = JSON.stringify(compressedSSEData).length * 2;
  // const kb1 = (c / 1024).toFixed(2);

  const pageProps = {
    ...data,
    sse: compressedSSEData,
  };
  return pageProps;
};

export default CustomApp;
//export default appWithTranslation(CustomApp);
