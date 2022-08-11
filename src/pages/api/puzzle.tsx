// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/server/db/client"
import axios from "axios"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { month, day } = req.body
  // Check if suitable clue in prisma
  try {
    const clue = await prisma.clue.findFirst({
      where: {
        puzzleDate: {
          contains: `${day}-${month}`
        }
      }
    })
    if (clue) {
      res.status(200).json(clue)
      // if no clue, get from api
    } else {
      try {
        const response = await axios.get(
          `https://cryptics.georgeho.org/data/clues.json?_sort=rowid&puzzle_date__contains=${day}-${month}`
        )
        let {
          data: { rows }
        } = response

        try {
          const newClue = await prisma.clue.create({
            data: {
              rowId: rows[0][0],
              clue: rows[0][1],
              answer: rows[0][2],
              definition: rows[0][3],
              clueNumber: rows[0][4],
              puzzleDate: rows[0][5],
              puzzleName: rows[0][6],
              sourceURL: rows[0][7],
              source: rows[0][8]
            }
          })
          res.status(200).json(newClue)
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export default handler
