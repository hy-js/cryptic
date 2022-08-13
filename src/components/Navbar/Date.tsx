import React from "react"
import getDate from "@/utils/getDate"

const Date = () => {
  const { currentYear, currentMonth, currentDay } = getDate()

  return (
    <div className='navbar flex w-min-screen items-center justify-center bg-neutral-200'>
      <h2 className='text-lg text-[1rem] leading-normal font-extrabold'>
        {currentDay} / {currentMonth} / {currentYear}
      </h2>
    </div>
  )
}

export default Date
