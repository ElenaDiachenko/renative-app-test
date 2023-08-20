import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { CONFIG } from '../config';
import { palette } from '../styles';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content={CONFIG.welcomeMessage} />
          <link rel="shortcut icon" href="/favicon.ico" />
          <style>
            {`
              body {
                height: 100vh;
                background-color: ${palette.mainBgColor};
              }
              body::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
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
