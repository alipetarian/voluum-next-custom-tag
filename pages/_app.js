import { useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    console.log("SETUP", router.query, router.asPath);

    // options includes a property called shallow
    const handleRouteChange = async (url) => {
      const basePath = (url || "").split(/\?/)?.[0] || "";
      const queryParams = (url || "").split(/\?/)?.[1] || "";
      console.log("route change", {
        url,
        basePath,
        queryParams,
      });

      if (!basePath) return;

      const query = queryString.parse(queryParams);

      if (!query.code2test) {
        const newUrl = `${basePath}?${queryString.stringify({
          ...query,
          code2test: "ali-here",
        })}`;

        console.log("here", {
          url,
          basePath,
          queryParams,
          newUrl,
        });

        router.replace(newUrl, newUrl);
      }

      return true;
    };

    // on initial page load.
    handleRouteChange(router?.asPath || "");

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, []);

  return <Component {...pageProps} />;
};

// App.getInitialProps = async ({ ctx, router }) => {
//   const url = ctx?.asPath || "";
//   const basePath = (url || "").split(/\?/)?.[0] || "";
//   const queryParams = (url || "").split(/\?/)?.[1] || "";

//   const query = queryString.parse(queryParams);
//   console.log("route change", { url, basePath, queryParams, query });

//   if (!query.code2test) {
//     const newUrl = `${basePath}?${queryString.stringify({
//       ...query,
//       code2test: "ali-here",
//     })}`;

//     // redirect
//     if (typeof window !== "undefined") {
//       // if in browser
//       router.replace(newUrl, newUrl);
//     } else if (ctx?.res && ctx?.res?.writeHead && ctx?.res?.end) {
//       // if ssr
//       ctx.res.writeHead(301, {
//         Location: newUrl,
//       });

//       ctx.res.end();
//     }
//   }

//   return {};
// };

export default App;
