import { useRouter } from "next/router"
import { useEffect } from "react"
import getDate from "@/utils/getDate"

const TodayRedirect: React.FC = () => {
  const router = useRouter()
  const { currentYear, currentMonth, currentDay } = getDate()

  useEffect(() => {
    router.replace({
      pathname: "/puzzle/[year]/[month]/[day]",
      query: {
        year: currentYear,
        month: currentMonth,
        day: currentDay
      }
    })
  }, [router])

  return null
}

export default TodayRedirect
