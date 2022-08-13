// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import axios from "axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      `https://cryptics.georgeho.org/data/clues.json?_next=1000`
    )
    let {
      data: { rows }
    } = response
    try {
      rows.forEach(async (element) => {
        await prisma.puzzle.create({
          data: {
            rowId: element[0],
            clue: element[1],
            answer: element[2],
            definition: element[3],
            clueNumber: element[4],
            puzzleDate: element[5],
            puzzleName: element[6],
            sourceURL: element[7],
            source: element[8]
          }
        })
      })
      res.status(200).json("Clues added")
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}

export default handler
