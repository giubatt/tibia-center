import { useState, useEffect, useRef } from 'react'

export default function useTimer({ id, total } = {}) {
  // Seconds
  const current = localStorage.getItem(id)

  const expiration = useRef(current)
  const intervalRef = useRef()

  const [timeLeft, setTimeLeft] = useState(current ? current - Date.now() : total)

  function startTimer() {
    expiration.current = Date.now() + total
    localStorage.setItem(id, expiration.current)
    initInterval()
  }

  function initInterval() {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const timeLeft = expiration.current - Date.now()
        if (timeLeft < 0) {
          resetTimer()
          setTimeLeft(0)
        } else {
          setTimeLeft(timeLeft)
        }
      }, 200)
    }
  }

  function stopTimer() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }

  function resetTimer() {
    localStorage.removeItem(id)
    setTimeLeft(total)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }

  useEffect(() => {
    if (current) {
      initInterval()
    }
    return stopTimer
  }, [])

  return { timeLeft, startTimer, resetTimer }
}
