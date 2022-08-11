// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"

const read = async (req: NextApiRequest, res: NextApiResponse) => {
  const { day } = req.query

  const clue = await prisma.clue.findFirst({
    where: {
      id: Number(day) + 1
    }
  })
  res.status(200).json(clue)
}

export default read
