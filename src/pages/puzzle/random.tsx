import { useState } from "react"
import { InferGetServerSidePropsType } from "next"
import { prisma } from "@/server/db/client"
import useWindowSize, { Size } from "@/hooks/useWindowSize"
import Confetti from "react-confetti"
import { Clue } from "@/constants/types"

import WinModal from "@/components/WinModal"

const Random = ({
  randomClue
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
    if (!randomClue) return
    parseLetters(guess)
    if (guess.toUpperCase() === randomClue.answer) {
      setIsOpen(true)
    }
  }
  const parseLetters = (guess: string) => {
    if (!randomClue) return
    let guessLetters = guess.toUpperCase().split("")
    const answerLetters = randomClue.answer.split("")
    guessLetters.forEach((letter, i) => {
      if (letter !== answerLetters[i]) {
        guessLetters[i] = "*"
      }
    })
    setParsedGuess(guessLetters)
  }

  return (
    <div className='flex flex-col w-min-screen justify-center items-center'>
      {randomClue ? (
        <>
          <div className='flex mt-5 flex-wrap'>
            {parsedGuess
              ? parsedGuess.map((letter, i) =>
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
                )
              : [...Array(randomClue.answer.length)].map((i) => (
                  <div
                    key={i}
                    className='border border-gray-500 h-10 w-10 text-2xl flex justify-center items-center bg-white uppercase text-center'></div>
                ))}
          </div>
          <form onSubmit={onSubmit}>
            <div className='border border-gray-500 p-4 m-2 bg-neutral-100 items-stretch my-2'>
              <p className='text-gray-400'>{randomClue.puzzleName}</p>
              <h3 className='text-xl'>
                {randomClue.clueNumber}
                {") "}
                <span>{randomClue.clue}</span>
              </h3>
              <div className='flex flex-row justify-center px-2 mt-5'>
                <input
                  autoFocus
                  name='across'
                  id='across'
                  type='text'
                  autoComplete='off'
                  onChange={handleGuess}
                  maxLength={randomClue.answer.length}
                  className='border border-gray-500 h-10 text-2xl flex justify-center items-center bg-white uppercase text-center'
                />
              </div>
            </div>
            <button
              type='submit'
              className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2  border border-gray-400 rounded shadow w-full'>
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
      <WinModal open={isOpen} setIsOpen={setIsOpen} source={"random"} />
    </div>
  )
}

export default Random
export async function getServerSideProps() {
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  const randomClue: Clue = await prisma.puzzle.findFirstOrThrow({
    skip: skip,
    where: {
      setDate: {
        contains: "NIL"
      }
    }
  })

  console.log(randomClue)
  return {
    props: {
      randomClue
    }
  }
}
