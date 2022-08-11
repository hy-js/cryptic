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
    const clues = await prisma.puzzle.findMany({
      take: 2,
      skip: skip,
      where: {
        setDate: {
          contains: "NIL"
        }
      }
    })

    res.status(200).json({ clues })
  } catch (error) {
    console.log(error)
  }
}

export default handler
