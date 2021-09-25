import { useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ ctx, router }) => {
  const url = ctx?.asPath || "";
  const basePath = (url || "").split(/\?/)?.[0] || "";
  const queryParams = (url || "").split(/\?/)?.[1] || "";

  const query = queryString.parse(queryParams);
  console.log("route change", { url, basePath, queryParams, query });

  if (!query.code2test) {
    const newUrl = `${basePath}?${queryString.stringify({
      ...query,
      code2test: "ali-here",
    })}`;

    // redirect
    if (typeof window !== "undefined") {
      // if in browser
      router.replace(newUrl, newUrl);
    } else if (ctx?.res && ctx?.res?.writeHead && ctx?.res?.end) {
      // if ssr
      ctx.res.writeHead(301, {
        Location: newUrl,
      });

      ctx.res.end();
    }
  }

  return {};
};

export default App;
