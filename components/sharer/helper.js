export const simpleCalc = players => {
  const totalBalance = players.reduce((total, player) => {
    return total + player.balance
  }, 0)

  const balanceEach = totalBalance / players.length

  const senderList = []
  const recieveList = []

  players.forEach(player => {
    if (player.balance > balanceEach) {
      senderList.push({ ...player })
    } else if (player.balance < balanceEach) {
      recieveList.push({ ...player })
    }
  })

  const transfers = []

  senderList.forEach(sender => {
    let toTransfer = sender.balance - balanceEach
    recieveList.forEach(reciever => {
      if (toTransfer > 0) {
        const transfer = {
          to: reciever.name,
          from: sender.name,
          amount: Math.round(Math.min(balanceEach - reciever.balance, toTransfer)),
        }
        if (transfer.amount > 0) {
          toTransfer -= transfer.amount
          reciever.balance += transfer.amount

          transfers.push(transfer)
        }
      }
    })
  })

  return {
    totalBalance,
    balanceEach,
    transfers,
  }
}
