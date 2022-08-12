import { Html, Head, Main, NextScript } from "next/document"
import Script from "next/script"

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href='node_modules/crosswords-js/dist/crosswords.css'
          rel='stylesheet'
        />
        <Script src='node_modules/crosswords-js/dist/crosswords.js' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
