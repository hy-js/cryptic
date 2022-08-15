import { useState } from "react"
import { InferGetServerSidePropsType } from "next"
import { prisma } from "@/server/db/client"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"
import getDate from "@/utils/getDate"
import { Clue } from "@/constants/types"

import WinModal from "@/components/WinModal"

const Today = ({
  todayClue
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { width, height }: Size = useWindowSize()
  const [guess, setGuess] = useState("")
  const [parsedGuess, setParsedGuess] = useState<string[]>([])
  let [isOpen, setIsOpen] = useState(false)

  const handleGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setGuess(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!todayClue) return
    parseLetters(guess)
    if (guess.toUpperCase() === todayClue.answer) {
      setIsOpen(true)
    }
  }
  const parseLetters = (guess: string) => {
    if (!todayClue) return
    let guessLetters = guess.toUpperCase().split("")
    const answerLetters = todayClue.answer.split("")
    guessLetters.forEach((letter, i) => {
      if (letter !== answerLetters[i]) {
        guessLetters[i] = "*"
      }
    })
    setParsedGuess(guessLetters)
  }

  return (
    <div className='flex flex-col w-min-screen justify-center items-center'>
      {todayClue ? (
        <>
          <div className='flex mt-5 flex-wrap'>
            {parsedGuess &&
              parsedGuess.map((letter, i) =>
                letter === "*" ? (
                  <div
                    key={i}
                    className='border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'></div>
                ) : (
                  <h2
                    key={i}
                    className='bg-yellow-300 border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center uppercase text-center'>
                    {letter}
                  </h2>
                )
              )}
            {parsedGuess.length == 0 &&
              [...Array(todayClue.answer.length)].map((i) => (
                <div
                  key={i}
                  className='border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'></div>
              ))}
          </div>
          <form onSubmit={onSubmit}>
            <div className='border border-gray-500 p-4 m-2 bg-neutral-100 my-2'>
              <p className='text-gray-400'>{todayClue.puzzleName}</p>
              <h4 className='text-xl sm:text-lg'>
                {todayClue.clueNumber}
                {") "}
                <span>{todayClue.clue}</span>
              </h4>
              <input
                autoFocus
                name='across'
                id='across'
                type='text'
                autoComplete='off'
                onChange={handleGuess}
                maxLength={todayClue.answer.length}
                className='border border-gray-500 bg-white uppercase text-xl flex justify-center my-2'
              />
            </div>
            <button
              type='submit'
              className='bg-white hover:bg-yellow-200 text-gray-800 font-semibold py-2  border border-gray-400 shadow w-full'>
              Submit
            </button>
          </form>
        </>
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <div className='text-xl text-center'>
            <p>No clues today</p>
            <p>Check back tomorrow</p>
          </div>
        </div>
      )}
      {isOpen && (
        <>
          <Confetti width={width} height={height} recycle={false} />
        </>
      )}
      <WinModal open={isOpen} setIsOpen={setIsOpen} source={"today"} />
    </div>
  )
}

export default Today
// Sever Side Renderin
export async function getServerSideProps() {
  const { currentDay, currentMonth, currentYear } = getDate()
  const clue = await prisma.puzzle.findFirst({
    where: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  })
  console.log(clue)
  if (clue) {
    return {
      props: {
        todayClue: clue
      }
    }
  }

  // Otherwise get set new clues for the day
  // Randomizer
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  // Get two clues
  const addClue = await prisma.puzzle.findFirstOrThrow({
    skip: skip,
    where: {
      setDate: {
        contains: "NIL"
      }
    }
  })

  await prisma.puzzle.update({
    where: {
      rowId: addClue.rowId
    },
    data: {
      setDate: `${currentYear}-${currentMonth}-${currentDay}`
    }
  })

  const firstClue: Clue = addClue

  return {
    props: {
      firstClue
    }
  }
}
