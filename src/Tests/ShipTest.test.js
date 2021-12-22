import CreateBattleShips from '../Functionality/Ship'

test('Check if ship is sunk or not', () => {
    expect(CreateBattleShips('Carrier', 5).sunk).toBe(false)
})