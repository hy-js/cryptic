import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import getDate from "@/utils/getDate"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    res.status(200).json(clue)
  } catch (error) {
    console.log(error)
  }
}

export default handler
