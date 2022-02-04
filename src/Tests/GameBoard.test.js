
import CreateShips from '../Functionality/Ship'
import GameBoard from '../Functionality/GameBoard'


let ship
beforeEach(() => {
    ship = GameBoard()
})

describe('GameBoards', () => {
    test('Testing gameboard creation', () => {
        expect(ship.board[0]).toStrictEqual([0, 0])
    })

    // test('Placing ships', () => {
    //     ship.placeShips('Carrier', 5)
    //     ship.placeShips('Battle Ship', 4)
    //     ship.placeShips('Destroyer', 3)
    //     ship.placeShips('Submarine', 3)
    //     ship.placeShips('Patrol Boat', 2)

        
    //     expect(ship.board).toContain([0, 0]) // toStrictEqual
    // })

    test('Place Ships', () => {
        ship.placeShips('Carrier', 5, [5, 4])
        ship.placeShips('Battle Ship', 4, [3, 0])
        ship.placeShips('Destroyer', 3, [8, 1])
        ship.placeShips('Submarine', 3, [7, 4])
        

        expect(ship.placeShips('Patrol Boat', 2, [2, 5])).toContainEqual([2, 5, {name: 'Patrol Boat', shot: false}])
    })

    test('Records missed attack', () => {
        expect(ship.receiveAttack([0, 0])).toContainEqual([0, 0])
    })

    test('Records attacked ship', () => {
        expect(ship.receiveAttack([0, 4, {name: 'Carrier', shot: false}])).toContainEqual([0, 4, {name: 'Carrier', shot: true}])
    })

    test.todo('Check all ship conditions')
})