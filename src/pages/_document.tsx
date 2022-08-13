import Footer from "@/components/Footer"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html className='antialiased'>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

        <meta
          name='description'
          content={`Cryptixle - a cryptic crossword game`}
        />
        <meta
          name='keywords'
          content='cryptic, crossword, wordle, puzzle, game'
        />
        <link
          href='/icons/icon-32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <link rel='apple-touch-icon' href='/icons/icon-192.png'></link>
        <meta name='theme-color' content='#fafafa' />
      </Head>
      <body className='flex flex-col h-screen'>
        <div className='flex-grow flex-shrink-0 basis-auto'>
          <Main />
        </div>
        <NextScript />
        <Footer />
      </body>
    </Html>
  )
}
