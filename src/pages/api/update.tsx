import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import getDate from "@/utils/getDate"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { currentDay, currentMonth, currentYear } = getDate()
  try {
    const puzzlesCount = await prisma.puzzle.count()
    const skip = Math.floor(Math.random() * puzzlesCount)
    const clue = await prisma.puzzle.findFirst({
      skip: skip,
      where: {
        setDate: {
          contains: "NIL"
        }
      }
    })
    const newClue = await prisma.puzzle.update({
      where: {
        rowId: clue?.rowId
      },
      data: {
        setDate: `${currentYear}-${currentMonth}-${currentDay}`
      }
    })
    res.status(200).json(newClue)
  } catch (error) {
    console.log(error)
  }
}

export default handler
