import React from "react"
import { useRouter } from "next/router"

const Date = () => {
  const router = useRouter()
  const { year, month, day } = router.query

  return (
    <div className='navbar flex w-min-screen items-center justify-center bg-neutral-100'>
      <h2 className='text-lg text-[1rem] leading-normal font-extrabold'>
        {day} / {month} / {year}
      </h2>
    </div>
  )
}

export default Date
