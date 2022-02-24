import GameBoard from '../Functionality/GameBoard'
import Player from '../Functionality/Player'

let player;
let ship;
beforeEach(() => {
    // player = Player()
    ship = GameBoard()
})

describe('Players', () => {
    test('Attack player board', () => {
        // player.human.placeShips('Carrier', 5, [0, 4])
        
        // expect(player.gamePlayer('Human', [0, 4])).toBe('Food')

        ship.placeShips('Carrier', 5, [0, 4])

        expect(ship.receiveAttack([0, 4])).toBe('Food')
    })
})