import Document, { Html, Head, Main, NextScript } from 'next/document';

const CLYDE_GTAG= 'GTM-K6DFL2V';

export default class ClydeDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          { true && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${CLYDE_GTAG}');
                  `,
              }}
            ></script>
          )}

          {false && (
            <script>
              {`var dtpCallback = function () { return null; }`}
            </script>
          )}
        </Head>
        
        <body>
          <Main />
          <NextScript />
          { process.env.NODE_ENV !== 'development' && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${CLYDE_GTAG}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
          )}
        </body>
      </Html>
    );
  }
}
