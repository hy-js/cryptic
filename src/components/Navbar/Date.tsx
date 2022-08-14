import getDate from "@/utils/getDate"
import { useRouter } from "next/router"

const Date = () => {
  const { currentYear, currentMonth, currentDay } = getDate()
  const router = useRouter()
  return (
    <div className='navbar flex w-min-screen items-center justify-center bg-neutral-200 border-b border-gray-500'>
      {router.asPath.split("/")[2] === "today" ? (
        <h2 className='text-lg text-[1rem] leading-normal font-extrabold'>
          {currentDay} / {currentMonth} / {currentYear}
        </h2>
      ) : (
        <h2 className='text-lg text-[1rem] leading-normal font-extrabold'>
          Random
        </h2>
      )}
    </div>
  )
}

export default Date
