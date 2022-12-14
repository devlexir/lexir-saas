import { NextComponentType, NextPageContext } from "next";
import { AppContext } from "next/app";
import ReactDOMServer from "react-dom/server";
import { createServerContext } from "use-sse";
const compressPayload = require("compress-json");
export const { ServerDataContext, resolveData } = createServerContext();

function getOrCreate() {
  if (process.browser) {
    //decompress the SSR string
    // window._initialDataContext = window.__NEXT_DATA__.props.sse
    window._initialDataContext = compressPayload.decompress(
      window.__NEXT_DATA__.props.sse
    );
    return require("use-sse").createBroswerContext();
  }
  return ServerDataContext;
}

export const Context = getOrCreate();

type AppPageProps = any;
type WithCTX = NextComponentType<NextPageContext, {}, AppPageProps>;

export async function initialRender(
  appContext: AppContext,
  pageProps: AppPageProps
) {
  const WithAppContext: WithCTX = appContext.AppTree;

  ReactDOMServer.renderToString(
    <Context>
      <WithAppContext {...pageProps} />
    </Context>
  );

  const sse = await resolveData();

  return sse;
}
