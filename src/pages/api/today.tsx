import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import getDate from "@/utils/getDate"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { currentDay, currentMonth, currentYear } = getDate()
  try {
    const clue = await prisma.puzzle.findFirst({
      where: {
        setDate: `${currentYear}-${currentMonth}-${currentDay}`
      }
    })
    res.status(200).json(clue)
  } catch (error) {
    console.log(error)
  }
}

export default handler
