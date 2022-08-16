import "../styles/globals.css"
import type { AppType } from "next/dist/shared/lib/utils"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Date from "@/components/Navbar/Date"
import Navbar from "@/components/Navbar/Navbar"
import { useState, useEffect } from "react"
import router from "next/router"


const MyApp: AppType = ({ Component, pageProps }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true
      }
    }
  })

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    router.events.on("routeChangeStart", start)
    router.events.on("routeChangeComplete", end)
    router.events.on("routeChangeError", end)
    return () => {
      router.events.off("routeChangeStart", start)
      router.events.off("routeChangeComplete", end)
      router.events.off("routeChangeError", end)
    }
  }, [])
  return (
    <>
      <QueryClientProvider client={client}>
        <Navbar />
        <Date />
        <main className='animation:fade-in p-4 flex flex-col items-center'>
          {loading ? <h1>Loading...</h1> : <Component {...pageProps} />}
        </main>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
