import GameBoard from '../Functionality/GameBoard'

describe('All about GameBoards', () => {
    test('Function takes a pair of coordinates determines whether it hits a ship', () => {
        expect(GameBoard().receiveAttack([0, 5], 'Missed')).toContainEqual([0, 5])
        expect(GameBoard().receiveAttack([0, 5], 'Ship')).toContainEqual('X')
    })

    test('Check if all allied or enemy ships have sunk', () => {
        expect(GameBoard().checkAllShipConditions(5, 2)).toBe('All allied ships sunk')
        expect(GameBoard().checkAllShipConditions(1, 5)).toBe('All enemy ships sunk')
    })
})