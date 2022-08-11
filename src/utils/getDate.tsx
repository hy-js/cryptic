const getDate = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const currentDay = date.getDate()
  const dayNumber = Math.floor(
    (Date.now() - Date.parse(new Date().getFullYear(), 0, 0)) / 86400000
  )
  return { currentYear, currentMonth, currentDay, dayNumber }
}
export default getDate
