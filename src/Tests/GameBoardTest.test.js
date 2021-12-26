import GameBoard from '../Functionality/GameBoard'

describe('All about GameBoards', () => {
    // CHECK RECEIVEATTACK FUNCTION FOR COORDINATES
    test('Function takes a pair of coordinates determines whether it hits a ship', () => {
        expect(GameBoard().receiveAttack([0, 5], 'Missed')).toContainEqual([0, 5])
        expect(GameBoard().receiveAttack([0, 5], 'Ship')).toContainEqual('X')
    })

    test('Check if all ships have sunk', () => {
        expect(GameBoard().checkAllShipConditions()).toBe('All ships havent sunk')

    })
})