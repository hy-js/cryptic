const getDate = () => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0")
  const currentDay = String(date.getDate()).padStart(2, "0")
  return { currentYear, currentMonth, currentDay }
}
export default getDate
