import { useState } from "react"
import { InferGetServerSidePropsType } from "next"
import { prisma } from "@/server/db/client"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"
import { Clue } from "@/constants/types"

import WinModal from "@/components/WinModal"

const Random = ({
  firstClue,
  secondClue
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { width, height }: Size = useWindowSize()
  const [across, setAcross] = useState("")
  const [down, setDown] = useState("")

  const [showDown, setDownShow] = useState(false)
  const [showAcross, setAcrossShow] = useState(false)
  let [isOpen, setIsOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      across.toUpperCase() === firstClue.answer &&
      down.toUpperCase() === secondClue.answer
    ) {
      setAcrossShow(true)
      setDownShow(true)
      setIsOpen(true)
    } else if (across.toUpperCase() === firstClue.answer) {
      setAcrossShow(true)
    } else if (down.toUpperCase() === secondClue.answer) {
      setDownShow(true)
    }
  }

  return (
    <div className='flex flex-col w-min-screen justify-center'>
      <form onSubmit={onSubmit}>
        <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
          <p className='text-gray-400'>{firstClue.puzzleName}</p>
          <h3 className='text-xl'>
            <span className='uppercase'>
              {firstClue.clueNumber}
              {") "}
            </span>
            {firstClue.clue}
          </h3>
          {showAcross ? (
            <input
              type='text'
              disabled
              value={firstClue.answer}
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
              className='border border-gray-500 w-full text-xl my-2 focus:bg-slate-300 uppercase'
            />
          )}
        </div>
        <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
          <p className='text-gray-400'>{secondClue.puzzleName}</p>
          <h3 className='text-xl'>
            <span className='uppercase'>
              {secondClue.clueNumber}
              {") "}
            </span>
            {secondClue.clue}
          </h3>
          {showDown ? (
            <input
              type='text'
              disabled
              value={secondClue.answer}
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
              className='border  border-gray-500 w-full text-xl my-2 focus:bg-neutral-100 uppercase'
            />
          )}
        </div>
        <button
          type='submit'
          className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full'>
          Submit
        </button>
      </form>
      {isOpen && (
        <>
          <Confetti width={width} height={height} recycle={false} />
        </>
      )}
      <WinModal
        open={isOpen}
        setIsOpen={setIsOpen}
        firstClue={firstClue}
        secondClue={secondClue}
        source={"random"}
      />
    </div>
  )
}

export default Random
export async function getServerSideProps() {
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
  const firstClue: Clue = clues[0]
  const secondClue: Clue = clues[1]

  console.log(clues)

  return {
    props: {
      firstClue,
      secondClue
    }
  }
}
