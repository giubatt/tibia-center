import styled from 'styled-components'

const TransfersGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 50px;
`

const TransferLine = ({ from, to, amount }) => (
  <tr>
    <td>{from}</td>
    <td>{to}</td>
    <td>{amount}</td>
  </tr>
)

const Transfers = ({ transfers = [] }) => (
  <table className="table is-narrow is-striped is-bordered">
    <thead>
      <tr className="">
        <th className="has-text-centered" colSpan="3">
          Transfers
        </th>
      </tr>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {transfers.map((transfer, index) => (
        <TransferLine key={index} {...transfer} />
      ))}
    </tbody>
  </table>
)

const SharerTransfers = ({ totalBalance = 0, balanceEach = 0, transfers = [] }) => (
  <TransfersGrid>
    <Transfers transfers={transfers} />

    <table className="table is-narrow is-striped is-bordered is-pulled-right">
      <thead>
        <tr>
          <th className="has-text-centered" colSpan="3">
            Balances
          </th>
        </tr>
        <tr>
          <th>Each</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{balanceEach}</td>
          <td>{totalBalance}</td>
        </tr>
      </tbody>
    </table>
  </TransfersGrid>
)

export default SharerTransfers
