import React from "react"
import Date from "./Date"

const Navbar = () => {
  return (
    <>
      <Date />

      <div className='navbar bg-white flex w-min-screen items-center justify-between bg-neutral-200'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 mx-2'
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
        <div>
          <h2 className='text-xl text-[2rem] leading-normal font-extrabold'>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              C
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              R
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              Y
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              P
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              T
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              I
            </span>
            <span className='bg-white  border-2 px-1 m-1 border-gray-500'>
              C
            </span>
            <span className='bg-yellow-300 border-2 px-1 m-1 border-gray-500'>
              L
            </span>
            <span className='bg-yellow-300 border-2 px-1 m-1 border-gray-500'>
              E
            </span>
          </h2>
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 mx-2'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      </div>
    </>
  )
}

export default Navbar
