import { InferGetServerSidePropsType } from "next"
import { prisma } from "@/server/db/client"
import { Clue } from "@/constants/types"
import OTPInput from "@/components/OTPInput"

const Today = ({
  todayClue
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!todayClue) return <p>No clue today. Try again tomorrow.</p>

  const goal = todayClue.answer.replace(/\s/g, "")

  return (
    <div className='flex flex-col w-min-screen justify-center items-center'>
      <div className='border border-gray-500 p-4 m-2 bg-neutral-100 my-2 text-center'>
        <p className='text-gray-400 text-lg sm:text-xl'>
          {todayClue.puzzleName} - {todayClue.clueNumber.toUpperCase()}
        </p>
        <h4 className='text-xl sm:text-2xl'>{todayClue.clue}</h4>
      </div>
      <OTPInput autoFocus length={goal.length} goal={goal} />
    </div>
  )
}

export default Today
// Sever Side Renderin
export async function getServerSideProps() {
  // Otherwise get set new clues for the day
  // Randomizer
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  // Get two clues
  const randomClue = await prisma.puzzle.findFirst({
    skip: skip,
    where: {
      setDate: {
        contains: "NIL"
      }
    }
  })

  const todayClue: Clue | null = randomClue

  return {
    props: {
      todayClue
    }
  }
}
