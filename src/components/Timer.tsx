import { useEffect, useState } from "react"

function Timer(j) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000)
  }, [counter])

  function fmtMSS(s: number) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s
  }

  return <span>{fmtMSS(counter)}</span>
}

export default Timer
