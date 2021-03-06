import GameBoard from '../Functionality/GameBoard'

let ship
beforeEach(() => {
    ship = GameBoard()
})

describe('GameBoards', () => {
    test('Testing gameboard creation', () => {
        expect(ship.board[0]).toStrictEqual([0, 0])
    })

    test('Place Ships Horizontally', () => {
        ship.placeShips('Carrier', 5, [5, 4], 'Horizontal')
        ship.placeShips('Battle Ship', 4, [3, 0], 'Horizontal')
        ship.placeShips('Destroyer', 3, [8, 1], 'Horizontal')
        ship.placeShips('Submarine', 3, [7, 4], 'Horizontal')
        ship.placeShips('Patrol Boat', 2, [2, 5], 'Horizontal')

        expect(ship.board[25]).toEqual([2, 5, {name: 'Patrol Boat', shot: false}])
        expect(ship.board[26]).toEqual([2, 6, {name: 'Patrol Boat', shot: false}])
    })

    test('Place Ships Verically', () => {
        ship.placeShips('Carrier', 5, [1, 2], 'Vertical')
        ship.placeShips('Battle Ship', 4, [3, 0], 'Vertical')
        ship.placeShips('Destroyer', 3, [1, 9], 'Vertical')
        ship.placeShips('Submarine', 3, [4, 4], 'Vertical')
        ship.placeShips('Patrol Boat', 2, [7, 6], 'Vertical')

        expect(ship.board[76]).toEqual([7, 6, {name: 'Patrol Boat', shot: false}])
        expect(ship.board[86]).toEqual([8, 6, {name: 'Patrol Boat', shot: false}])
    })

    test('Records missed attack', () => {
        ship.placeShips('Patrol Boat', 2, [1, 4], 'Vertical')
        
        expect(ship.receiveAttack([0, 1])).toContainEqual([0, 1, { missed: true }])
    })

    test('Records attacked ship', () => {
        ship.placeShips('Carrier', 5, [0, 4], 'Horizontal')

        expect(ship.receiveAttack([0, 4])).toContainEqual([0, 4, {name: 'Carrier', shot: true}])
    })

    test('Check all ship conditions should be true', () => {
        ship.placeShips('Carrier', 5, [5, 4], 'Horizontal')
        ship.placeShips('Battle Ship', 4, [3, 0], 'Horizontal')
        ship.placeShips('Destroyer', 3, [8, 1], 'Horizontal')
        ship.placeShips('Submarine', 3, [7, 4], 'Vertical')
        ship.placeShips('Patrol Boat', 2, [2, 5], 'Vertical')

        for (let i = 0; i < ship.board.length; i++) {
            if (ship.board[i][2]) {
                ship.receiveAttack(ship.board[i])
            }
        }

        expect(ship.checkShipConditions()).toBeTruthy()
    })

    test('Condition check should be false', () => {
        ship.placeShips('Carrier', 5, [5, 4], 'Horizontal')
        ship.placeShips('Battle Ship', 4, [3, 0], 'Horizontal')
        ship.placeShips('Destroyer', 3, [8, 1], 'Horizontal')
        ship.placeShips('Submarine', 3, [7, 4], 'Vertical')

        for (let i = 0; i < ship.board.length; i++) {
            if (ship.board[i][2]) {
                ship.receiveAttack(ship.board[i])
            }
        }

        expect(ship.checkShipConditions()).toBeFalsy()
    })
})