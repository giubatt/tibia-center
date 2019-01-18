import dynamic from 'next/dynamic'
import styled from 'styled-components'

import PageTitle from '../../components/styled/PageTitle'

const Timer = dynamic(() => import('../../components/tools/Timer'), { ssr: false })

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 20px;
`

const TimersLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const TWENTY_HOURS = 20 * 60 * 60 * 1000
const TWO_HOURS = 2 * 60 * 60 * 1000

const BossTimersPage = () => {
  return (
    <PageLayout>
      <PageTitle>Boos Timers</PageTitle>

      <TimersLayout>
        <Timer name="Bloodback" totalTime={TWENTY_HOURS} />
        <Timer name="Darkfang" totalTime={TWENTY_HOURS} />
        <Timer name="Sharpclaw" totalTime={TWENTY_HOURS} />
        <Timer name="Black Vixen" totalTime={TWENTY_HOURS} />
        <Timer name="Shadowpelt" totalTime={TWENTY_HOURS} />
      </TimersLayout>
    </PageLayout>
  )
}

export default BossTimersPage
