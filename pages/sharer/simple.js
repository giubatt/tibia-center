import styled from 'styled-components'
import { useState } from 'react'

import { simpleCalc } from '../../lib/sharer'
import Simple from '../../components/sharer/Simple'
import Transfers from '../../components/sharer/Transfers'
import PageTitle from '../../components/styled/PageTitle'

const PageLayout = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 20px;
`

const SimplePage = () => {
  const [result, setResult] = useState({ totalBalance: 0, balanceEach: 0, transfers: [] })

  const onSubmit = ({ players }) => {
    setResult(simpleCalc(players))
  }

  const { totalBalance, balanceEach, transfers } = result

  return (
    <PageLayout>
      <PageTitle>Simple Loot Sharer</PageTitle>

      <Simple onSubmit={onSubmit} />

      <Transfers totalBalance={totalBalance} balanceEach={balanceEach} transfers={transfers} />
    </PageLayout>
  )
}

export default SimplePage
