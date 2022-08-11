import type { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const Today: NextPage = () => {
  const router = useRouter()
  const { year, month, day } = router.query

  const [message, setMessage] = useState("")
  const [answer, setAnswer] = useState("")
  const { data, isLoading, isError, refetch } = useQuery(
    ["puzzle"],
    async () => {
      return await axios
        .post(`/api/puzzle/`, { month, day })
        .then((res) => res.data)
    }
  )
  const handleClick = () => {
    // manually refetch
    refetch()
  }

  return (
    <>
      <div className='flex'>
        <Link
          href={
            router.isReady
              ? `/puzzle/${year}/${month}/${
                  Number(day) == 1 ? Number(day) : Number(day) - 1
                }`
              : "/"
          }>
          <button onClick={handleClick}>
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
          </button>
        </Link>
        {data?.source}
        {/* <Link
          href={
            router.isReady
              ? `/puzzle/${year}/${month}/${
                  Number(day) == 1 ? Number(day) + 30 : Number(day) - 1
                }`
              : "/"
          }>
          <button onClick={handleClick}>
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
          </button>
        </Link> */}
      </div>
      <div className='flex flex-col items-stretch'>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !data ? (
          <p>No cryptic today</p>
        ) : (
          <h2 className='text-xl md:text-[1.25rem]'>{data?.clue}</h2>
        )}
        <input
          type='text'
          className='border border-gray-400 rounded-lg p-2'
          id='message'
          name='message'
          // onChange={handleChange}
          value={message}
        />
      </div>
    </>
  )
}

export default Today
