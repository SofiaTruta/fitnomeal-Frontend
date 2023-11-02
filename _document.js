// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Include Inter Font */}
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/inter@4.13.0/css/inter.min.css" />
          <link rel="stylesheet" href="/fonts/Michroma-Regular.woff" type="font/woff" as="font" crossOrigin="anonymous" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
