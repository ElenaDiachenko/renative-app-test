import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import { palette } from '../styles';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <style>
            {`
              body {
                height: 100vh;
                background-color: ${palette.mainBgColor};
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
