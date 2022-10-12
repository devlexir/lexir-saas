import DefaultSeo from '@components/ui/default-seo';
import ErrorMessage from '@components/ui/error-message';
import ManagedModal from '@components/ui/modal/managed-modal';
// import { appWithTranslation } from "next-i18next";
import { ModalProvider } from '@components/ui/modal/modal.context';
import PageLoader from '@components/ui/page-loader/page-loader';
import { CartProvider } from '@contexts/quick-cart/cart.context';
import { SettingsProvider } from '@contexts/settings.context';
import { UIProvider } from '@contexts/ui.context';
import { useSettingsQuery } from '@data/settings/use-settings.query';
import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import PrivateRoute from '@utils/private-route';
import { createStore, StateMachineProvider } from 'little-state-machine';
import App, { AppContext, AppInitialProps, AppProps } from 'next/app';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import PlausibleProvider from 'next-plausible';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
// import '@fontsource/open-sans'
import '@fontsource/source-serif-pro';

// import '@/styles/globals.css'
// import '@fontsource/open-sans/600.css'
// import '@fontsource/open-sans/700.css'
import 'react-toastify/dist/ReactToastify.css';
import '@assets/main.css';

import { createServerContext } from 'use-sse';
const compressPayload = require('compress-json');
export const { ServerDataContext, resolveData } = createServerContext();

import { linkResolver, repositoryName } from '../../prismicio';

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

const CustomApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  const Layout = (Component as any).Layout || Noop;
  const authProps = (Component as any).authenticate;

  /**
   * State for form of welcome brand
   */
  createStore({
    onboardingInfo: {
      brand_name: '',
      brand_based: '',
      brand_market: '',
      brand_website: '',
      bottles_annually: '',
      market_begin: '',
    },
  });

  return (
    <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={repositoryName}>
        <Context>
          <StateMachineProvider>
            <QueryClientProvider client={queryClientRef.current}>
              <Hydrate state={pageProps.dehydratedState}>
                <AppSettings>
                  <UIProvider>
                    <ModalProvider>
                      <>
                        <Layout {...pageProps}>
                          <Component {...pageProps} />
                        </Layout>
                        <ManagedModal />
                        <ToastContainer autoClose={3000} theme='colored' />
                      </>
                    </ModalProvider>
                  </UIProvider>
                </AppSettings>
                {/* <ReactQueryDevtools /> */}
              </Hydrate>
            </QueryClientProvider>
          </StateMachineProvider>
        </Context>
      </PrismicPreview>
    </PrismicProvider>
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
