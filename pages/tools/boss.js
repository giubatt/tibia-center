import dynamic from 'next/dynamic'
import styled from 'styled-components'

import PageTitle from '../../components/styled/PageTitle'

const Timer = dynamic(() => import('../../components/tools/Timer'), { ssr: false })

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 20px;
`

const BossTimersPage = () => {
  return (
    <PageLayout>
      <PageTitle>Boos Timers</PageTitle>

      <Timer />

      {/* <Simple onSubmit={onSubmit} /> */}

      {/* <Transfers totalBalance={totalBalance} balanceEach={balanceEach} transfers={transfers} /> */}
    </PageLayout>
  )
}

export default BossTimersPage
