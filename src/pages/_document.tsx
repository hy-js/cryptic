import Footer from "@/components/Footer"
import { Html, Head, Main, NextScript } from "next/document"
import { NextSeo } from "next-seo"
export default function Document() {
  return (
    <Html className='antialiased'>
      <Head>
        <NextSeo
          title='Cryptixle'
          description='A Cryptic Crossword Clue Game.'
          canonical='https://cryptixle.vercel.app/'
          openGraph={{
            url: "https://cryptixle.vercel.app/",
            title: "Cryptixle",
            description: "A Cryptic Crossword Clue Game.",
            images: [
              {
                url: "/cryptixle.png",
                width: 800,
                height: 600,
                alt: "Cryptixle Game",
                type: "image/jpeg"
              }
            ],
            site_name: "Cryptixle"
          }}
          twitter={{
            handle: "@hyjs_",
            site: "https://cryptixle.vercel.app/",
            cardType: "summary_large_image"
          }}
        />
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
