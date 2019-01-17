import styled from 'styled-components'

import useTimer from '../../lib/hooks/useTimer'

const TimerContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: gray;
`

const TWENTY_HOURS = 20 * 60 * 60 * 1000

const Timer = () => {
  const { timeLeft, startTimer, resetTimer } = useTimer({ id: 1, total: 60 * 1000 })
  const { timeLeft: boss1Time, startTimer: start2, resetTimer: reset2 } = useTimer({ id: 2, total: 60 * 1000 })
  const { timeLeft: boss2Time, startTimer: start3, resetTimer: reset3 } = useTimer({ id: 3, total: 60 * 1000 })

  return (
    <TimerContainer>
      <div>background</div>
      {timeLeft}
      <button onClick={startTimer}>Start</button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        {boss1Time}
        <button onClick={start2}>Start</button>
        <button onClick={reset2}>Reset</button>
      </div>
      <div>
        {boss2Time}
        <button onClick={start3}>Start</button>
        <button onClick={reset3}>Reset</button>
      </div>
    </TimerContainer>
  )
}

export default Timer
