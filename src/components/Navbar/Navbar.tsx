import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { HelpModal } from "../HelpModal"
import logo from "../../../public/cryptixle_logo.png"

const Navbar = () => {
  const router = useRouter()
  let [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }
  return (
    <>
      <div className='flex w-min-screen items-center justify-center bg-neutral-100'>
        <Image src={logo} alt='Cryptixle Logo' width={110} height={110} />
      </div>
      <div className='navbar flex w-min-screen items-center justify-center bg-neutral-100 '>
        <div onClick={openModal}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mx-2 cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <Link href={"/"}>
          <h1 className='text-xl text-[1.75rem] leading-normal uppercase cursor-pointer'>
            Cryptixle
          </h1>
        </Link>
        {router.asPath.split("/")[2] === "today" ? (
          <Link href={"/puzzle/random"}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mx-2 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </Link>
        ) : (
          <Link href={"/puzzle/today"}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 mx-2 cursor-pointer'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </Link>
        )}
      </div>
      <HelpModal open={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export default Navbar
