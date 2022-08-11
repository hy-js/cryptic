const getDate = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0")
  const currentDay = String(date.getDate()).padStart(2, "0")
  const dayNumber = Math.floor(
    (Date.now() - Date.parse(new Date().getFullYear(), 0, 0)) / 86400000
  )
  return { currentYear, currentMonth, currentDay, dayNumber }
}
export default getDate
