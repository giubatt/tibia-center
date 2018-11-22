import { simpleCalc } from './helper'

describe('simpleCalc', () => {
  test('2 players', () => {
    // Arrange
    const players = [
      {
        name: 'Knight',
        balance: 150000,
      },
      {
        name: 'Druid',
        balance: -50000,
      },
    ]

    // Act
    const actual = simpleCalc(players)

    // Assert
    expect(actual).toMatchObject({
      balanceEach: 50000,
      totalBalance: 100000,
      transfers: expect.arrayContaining([{ from: 'Knight', to: 'Druid', amount: 100000 }]),
    })
  })

  test('3 players', () => {
    // Arrange
    const players = [
      {
        name: 'Knight',
        balance: 150000,
      },
      {
        name: 'Druid',
        balance: -50000,
      },
      {
        name: 'Sorcerer',
        balance: -10000,
      },
    ]

    // Act
    const actual = simpleCalc(players)

    // Assert
    expect(actual).toMatchObject({
      balanceEach: 30000,
      totalBalance: 90000,
      transfers: expect.arrayContaining([
        ({ from: 'Knight', to: 'Druid', amount: 80000 }, { from: 'Knight', to: 'Sorcerer', amount: 40000 }),
      ]),
    })
  })

  describe('4 players', () => {
    test('single player transfers', () => {
      // Arrange
      const players = [
        {
          name: 'Paladin',
          balance: 5000,
        },
        {
          name: 'Sorcerer',
          balance: -25000,
        },
        {
          name: 'Druid',
          balance: -50000,
        },
        {
          name: 'Knight',
          balance: 100000,
        },
      ]

      // Act
      const actual = simpleCalc(players)

      // Assert
      expect(actual).toMatchObject({
        balanceEach: 7500,
        totalBalance: 30000,
        transfers: expect.arrayContaining([
          { from: 'Knight', to: 'Druid', amount: 57500 },
          { from: 'Knight', to: 'Sorcerer', amount: 32500 },
          { from: 'Knight', to: 'Paladin', amount: 2500 },
        ]),
      })
    })

    test('multiple players transfers', () => {
      // Arrange
      const players = [
        {
          name: 'Knight',
          balance: 100000,
        },
        {
          name: 'Druid',
          balance: -50000,
        },
        {
          name: 'Sorcerer',
          balance: -25000,
        },
        {
          name: 'Paladin',
          balance: 45000,
        },
      ]

      // Act
      const actual = simpleCalc(players)

      // Assert
      expect(actual).toMatchObject({
        balanceEach: 17500,
        totalBalance: 70000,
        transfers: expect.arrayContaining([
          { from: 'Knight', to: 'Druid', amount: 67500 },
          { from: 'Knight', to: 'Sorcerer', amount: 15000 },
          { from: 'Paladin', to: 'Sorcerer', amount: 27500 },
        ]),
      })
    })
  })

  test('6 players', () => {
    // Arrange
    const players = [
      {
        name: 'Knight',
        balance: 300000,
      },
      {
        name: 'Druid',
        balance: -25000,
      },
      {
        name: 'Sorcerer',
        balance: -15000,
      },
      {
        name: 'Paladin',
        balance: 5000,
      },
      {
        name: 'Druid 2',
        balance: -25000,
      },
      {
        name: 'Sorcerer 2',
        balance: -15000,
      },
    ]

    // Act
    const actual = simpleCalc(players)

    // Assert
    expect(actual).toMatchObject({
      balanceEach: 37500,
      totalBalance: 225000,
      transfers: expect.arrayContaining([
        { from: 'Knight', to: 'Druid', amount: 62500 },
        { from: 'Knight', to: 'Druid 2', amount: 62500 },
        { from: 'Knight', to: 'Sorcerer', amount: 52500 },
        { from: 'Knight', to: 'Sorcerer 2', amount: 52500 },
        { from: 'Knight', to: 'Paladin', amount: 32500 },
      ]),
    })
  })
})
