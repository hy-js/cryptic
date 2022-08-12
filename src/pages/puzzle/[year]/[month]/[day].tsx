import type { NextPage } from "next"
import { prisma } from "@/server/db/client"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Chevron from "@/components/Navbar/Chevron"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"

const Today: NextPage = ({ firstClue, secondClue }) => {
  const { width, height }: Size = useWindowSize()
  const [across, setAcross] = useState("")
  const [down, setDown] = useState("")

  const [showDown, setAcrossShow] = useState(false)
  const [showAcross, setDownShow] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (across.toUpperCase() === firstClue.answer) {
      setAcrossShow(true)
    }
    if (down.toUpperCase() === secondClue.answer) {
      setDownShow(true)
    }
  }

  return (
    <div className='flex flex-col w-min-screen justify-center'>
      <Chevron />
      <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
        <h4 className='underline text-xl'>Across:</h4>
        <h3 className='text-xl'>{firstClue.clue}</h3>
        <form onSubmit={onSubmit}>
          {showAcross ? (
            <input
              type='text'
              disabled
              value={firstClue.Answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='across'
              id='across'
              type='text'
              autoComplete='off'
              onChange={(e) => setAcross(e.target.value)}
              maxLength={firstClue.answer.length}
              className='border border-gray-500 w-full text-xl my-2 focus:bg-yellow-300 uppercase'
              required
            />
          )}
          <hr />
          <h4 className='underline text-xl'>Down:</h4>
          <h3 className='text-xl'>{secondClue.clue}</h3>
          {showAcross ? (
            <input
              type='text'
              disabled
              value={secondClue.Answer}
              className='border border-gray-500 w-full text-xl my-2 bg-yellow-300 uppercase'
            />
          ) : (
            <input
              autoFocus
              name='down'
              id='down'
              type='text'
              autoComplete='off'
              onChange={(e) => setDown(e.target.value)}
              maxLength={secondClue.answer.length}
              className='border border-gray-500 w-full text-xl my-2 focus:bg-yellow-300 uppercase'
              required
            />
          )}
          <button
            type='submit'
            className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
            Submit
          </button>
        </form>
      </div>
      {showAcross && showDown && (
        <>
          <Confetti width={width} height={height} recycle={false} />
          <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
            {firstClue.answer.split("").map((letter, index) => (
              <span
                key={index}
                className='border-2 px-2 m-1 border-gray-500 bg-white'>
                {letter}
              </span>
            ))}
            <div className='flex flex-col'>
              {secondClue.answer.split("").map((letter, index) => (
                <span
                  key={index}
                  className='border-2 px-2 m-1 border-gray-500 w-8 bg-white'>
                  {letter}
                </span>
              ))}
              <h2>{firstClue.definition}</h2>
              <h2>{secondClue.definition}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Today

// Sever Side Rendering
export async function getServerSideProps(context) {
  const { year, month, day } = context.params
  const dbClues = await prisma.puzzle.findMany({
    take: 2,
    where: {
      setDate: `${year}-${month}-${day}`
    }
  })
  console.log(dbClues)
  if (dbClues.length > 0) {
    return {
      props: {
        firstClue: dbClues[0],
        secondClue: dbClues[1]
      }
    }
  }

  // Otherwise get ser new clues for the day

  // Randomizer
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  // Get two clues
  const clues = await prisma.puzzle.findMany({
    take: 2,
    skip: skip,
    where: {
      setDate: {
        contains: "NIL"
      }
    }
  })

  await prisma.puzzle.update({
    where: {
      rowId: clues[0].rowId
    },
    data: {
      setDate: `${year}-${month}-${day}`
    }
  })

  await prisma.puzzle.update({
    where: {
      rowId: clues[1].rowId
    },
    data: {
      setDate: `${year}-${month}-${day}`
    }
  })

  console.log(clues)

  return {
    props: {
      firstClue: clues[0],
      secondClue: clues[1]
    }
  }
}

