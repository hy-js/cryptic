import type { NextPage } from "next"
import Header from "@/components/Header"
import { useState } from "react"
import { useEffect } from "react"
import getDate from "@/utils/getDate"

const Today: NextPage = () => {
  const { dayNumber } = getDate()
  const [message, setMessage] = useState("")
  const [answer, setAnswer] = useState("")
  const [win, setWin] = useState(false)
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/puzzle/read/${dayNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setAnswer(data.answer)
        setLoading(false)
      })
  }, [])

  const handleChange = (event) => {
    setMessage(event.target.value)
    if (message.toUpperCase() === answer) {
      setWin(true)
      setMessage("")
    }
  }

  return (
    <main className='animation:fade-in container mx-auto flex flex-col items-center min-h-screen p-4'>
      <Header />
      <div className='flex flex-col items-stretch'>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !data ? <p>No cryptic today</p> : <h2>{data?.clue}</h2>}
        <input
          type='text'
          className='border border-gray-400 rounded-lg p-2'
          id='message'
          name='message'
          onChange={handleChange}
          value={message}
        />
      </div>
      {win && (
        <>
          <h3 className='text-purple-300'>You win!</h3>
          <h4 className='text-purple-300'>{data?.description}</h4>
        </>
      )}
      {/* <div className='flex justify-between items-stretch w-1/3'>
        <button>
          <h3 className='underline'> Back</h3>
        </button>
        <button>
          <h3 className='underline'>Next</h3>
        </button>
      </div> */}
    </main>
  )
}

export default Today
