import { useEffect } from "react";
import { useRouter } from "next/router";
import queryString from "query-string";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const handleRouteChange = async (url) => {
    console.log('HANDLE ROUTE CHANGE', url)
    const basePath = (url || "").split(/\?/)?.[0] || "";
    const queryParams = (url || "").split(/\?/)?.[1] || "";
  
    console.log("route change", { url, basePath, queryParams });

    if (!basePath) return;

    const query = queryString.parse(queryParams);
    console.log('QUERY +++', query)

    if (!query.cep) {
      const newUrl = `${basePath}?${queryString.stringify({
        ...query,
        cep: "ali-here",
      })}`;

      console.log("inside if when cep not found", { url, basePath, queryParams, newUrl });
      console.log('NEW URL: ', newUrl,)

      router.replace(newUrl, newUrl, {shallow:true});
      // throw "don't";
    }

    return true;
  };

  const handleBeforeHistoryChange= (route) => {
    console.log('BEFORE HISTORY CHANGE', route)
    return false
  };

  useEffect(() => {
    console.log("MAIN APP -- SETUP", router.query, router.asPath);
    // console.log("", router.query, router.asPath);

    // on initial page load.
    // handleRouteChange(router?.asPath || "");

    // router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChange);


    router.events.on("routeChangeComplete", async (url)=> {
      
      console.log('routeChangeComplete ++++++++++ URL', url)
    
      return true
    });

    router.events.on('beforeHistoryChange',handleBeforeHistoryChange)

    return () => {
      // router.events.off("routeChangeStart", handleRouteChange)
      router.events.off("routeChangeComplete", handleRouteChange)
      router.events.off('beforeHistoryChange',handleBeforeHistoryChange)
    };
  }, []);

  return <Component {...pageProps} />;
};

// App.getInitialProps = async ({ ctx, router }) => {
//   const url = ctx?.asPath || "";
//   const basePath = (url || "").split(/\?/)?.[0] || "";
//   const queryParams = (url || "").split(/\?/)?.[1] || "";

//   const query = queryString.parse(queryParams);
//   console.log("route change", { url, basePath, queryParams, query });

//   if (!query.cep) {
//     const newUrl = `${basePath}?${queryString.stringify({
//       ...query,
//       cep: "ali-here",
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
