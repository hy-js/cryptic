// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import axios from "axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { year, month, day } = req.body
  // Randomizer
  const puzzlesCount = await prisma.puzzle.count()
  const skip = Math.floor(Math.random() * puzzlesCount)
  // Get Clues
  try {
    const clue1 = await prisma.puzzle.update({
      where: {
        rowId: clues[0].id
      },
      data: {
        setDate: `${year}-${month}-${day}`
      }
    })

    const clue2 = await prisma.puzzle.update({
      where: {
        rowId: clues[1].id
      },
      data: {
        setDate: `${year}-${month}-${day}`
      }
    })

    res.status(200).json({ clue1, clue2 })
  } catch (error) {
    console.log(error)
  }
}

export default handler
