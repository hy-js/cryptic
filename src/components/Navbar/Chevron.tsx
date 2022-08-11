import React from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import getDate from "@/utils/getDate"

const Chevron = () => {
  const router = useRouter()
  const { year, month, day } = router.query
  const { currentDay } = getDate()

  return (
    <div className='flex justify-between'>
      {day !== "1" ? (
        <Link
          href={
            router.isReady
              ? `/puzzle/${year}/${month}/${
                  Number(day) == 1 ? Number(day) : Number(day) - 1
                }`
              : "/"
          }>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </Link>
      ) : (
        <div></div>
      )}
      {day !== currentDay ? (
        <Link
          href={
            router.isReady
              ? `/puzzle/${year}/${month}/${
                  day == currentDay ? Number(day) : Number(day) + 1
                }`
              : "/"
          }>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Link>
      ) : null}
    </div>
  )
}

export default Chevron
