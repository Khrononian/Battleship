
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

    test('Place AI ships', () => {
        const aiShips = [
            {name: 'Carrier', length: 5}, 
            {name: 'Battle Ship', length: 4}, 
            {name: 'Destroyer', length: 3}, 
            {name: 'Submarine', length: 3}, 
            {name: 'Patrol Boat', length: 2}
        ]
        
        for (let aiShip of aiShips) {
            ship.placeHorizontalAi(aiShip.name, aiShip.length)
        }

        expect(ship.placeHorizontalAi()).toEqual(ship.board)
        
        // USE PLAYER FACTORY TO PLACE AI SHIPS AFTER TESTING HERE
    })

    test('Records missed attack', () => {
        expect(ship.receiveAttack([0, 0])).toContainEqual([0, 0])
    })

    test('Records attacked ship', () => {
        expect(ship.receiveAttack([0, 4, {name: 'Carrier', shot: false}])).toContainEqual([0, 4, {name: 'Carrier', shot: true}])
    })

    test('Check all ship conditions', () => {
        ship.placeShips('Carrier', 5, [5, 4])
        ship.placeShips('Battle Ship', 4, [3, 0])
        ship.placeShips('Destroyer', 3, [8, 1])
        ship.placeShips('Submarine', 3, [7, 4])
        ship.placeShips('Patrol Boat', 2, [2, 5])

        for (let i = 0; i < ship.board.length; i++) {
            if (ship.board[i][2]) {
                ship.receiveAttack(ship.board[i])
            }
        }

        expect(ship.checkShipConditions()).toBe('FOOD')
    })
})