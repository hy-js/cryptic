import Date from "./Date"

const Navbar = () => {
  return (
    <>
      <Date />

      <div className='navbar flex w-min-screen items-center justify-between bg-neutral-100 border-b border-gray-500'>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 mx-2 '
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
        <div>
          <h2 className='text-xl text-[1.75rem] leading-normal font-extrabold'>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              C
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              R
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              Y
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              P
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              T
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              I
            </span>
            <span className='bg-white  border-2 px-2 m-1 border-gray-500'>
              C
            </span>
            <span className='bg-yellow-300 border-2 px-2 m-1 border-gray-500'>
              L
            </span>
            <span className='bg-yellow-300 border-2 px-2 m-1 border-gray-500'>
              E
            </span>
          </h2>
        </div>
        <div className='flex'>
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
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
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
      </div>
    </>
  )
}

export default Navbar
