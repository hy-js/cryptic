import Link from "next/link"

const Footer = () => {
  return (
    <footer className='flex flex-col flex-shrink-0 w-min-screen justify-center items-center'>
      <div className='flex text-sm'>
        <a
          href='https://github.com/hy-js/cryptixle'
          target='_blank'
          className='text-neutral-400 underline mx-2'
          rel='noreferrer'>
          Source
        </a>
        <a
          href='https://rhysad.com/'
          target='_blank'
          className='text-neutral-400 underline mx-2'
          rel='noreferrer'>
          Portfolio
        </a>
      </div>
      <p className='text-sm  mb-2'>&copy; Rhys Dawson</p>
    </footer>
  )
}

export default Footer
