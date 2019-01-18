import styled from 'styled-components'
import { distanceInWords } from 'date-fns'

import useTimer from '../../lib/hooks/useTimer'

const TimerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 50px auto auto;
  grid-template-areas:
    'image'
    'name'
    'timer'
    'action';

  grid-gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid #cecece;
  padding: 20px;
  flex-basis: 200px;
  flex-shrink: 0;
  margin: 10px;
`

const Picture = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  span {
    position: absolute;
  }
`

const Timer = ({ name, totalTime }) => {
  const { timeLeft, startTimer, resetTimer } = useTimer({ id: name, total: totalTime })

  return (
    <TimerWrapper>
      <Picture>
        <figure className="image is-64x64">
          <img src={`../../static/images/creature/${name}.gif`} alt={name} />
        </figure>
      </Picture>
      <header className="is-size-5 has-text-weight-bold has-text-centered">{name}</header>
      <ProgressWrapper>
        <progress
          className="progress is-large is-marginless is-success"
          value={timeLeft === totalTime ? 0 : timeLeft}
          max={totalTime}
        />
        <span className="has-text-dark">
          {(() => {
            if (!timeLeft) return 'Ready!'
            if (timeLeft < totalTime) return distanceInWords(timeLeft, 0, { includeSeconds: true })
            return '-'
          })()}
        </span>
      </ProgressWrapper>
      {(timeLeft === 0 || timeLeft === totalTime) && (
        <button className="button is-small is-rounded is-outlined is-success" onClick={startTimer}>
          Start
        </button>
      )}
      {timeLeft > 0 && timeLeft < totalTime && (
        <button className="button is-small is-rounded is-outlined" onClick={resetTimer}>
          Reset
        </button>
      )}
    </TimerWrapper>
  )
}

export default Timer
