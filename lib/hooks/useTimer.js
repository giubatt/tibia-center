import { useState, useEffect, useRef } from 'react'

const useTimer = ({ id, total } = {}) => {
  const current = localStorage.getItem(`timer-${id}`)

  const expiration = useRef(current)
  const intervalRef = useRef()

  const [timeLeft, setTimeLeft] = useState(current ? current - Date.now() : total)

  function startTimer() {
    expiration.current = Date.now() + total
    localStorage.setItem(`timer-${id}`, expiration.current)
    initInterval()
  }

  function initInterval() {
    if (!intervalRef.current) {
      setTimeLeft(Math.max(expiration.current - Date.now(), 0))
      intervalRef.current = setInterval(() => {
        const timeLeft = expiration.current - Date.now()
        if (timeLeft < 0) {
          setTimeLeft(0)
          stopTimer()
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
    localStorage.removeItem(`timer-${id}`)
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

export default useTimer
