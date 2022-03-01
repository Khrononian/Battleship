import GameBoard from '../Functionality/GameBoard'
import Player from '../Functionality/Player'

let player;

beforeEach(() => {
    player = Player()
})

describe('Players', () => {
    test('Attack enemy', () => {
        player.human.placeShips('Carrier', 5, [0, 4])
        player.gamePlayer('Human', [0, 4])

        expect(player.human.board[4]).toEqual([0, 4, {name: 'Carrier', shot: true}])
    })

    test('Same shot not possible', () => {
        player.human.placeShips('Carrier', 5, [0, 2])
        player.human.receiveAttack([0, 2])

        expect(player.gamePlayer('Human', [0, 2])).toBe('ALREADY SHOT')
    })
})