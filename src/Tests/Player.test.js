import Player from '../Functionality/Player'

let player;

beforeEach(() => {
    player = Player()
})

describe('Players', () => {
    test('Attack enemy', () => {
        player.computer.placeShips('Carrier', 5, [0, 4])

        // expect(player.human.board[4]).toEqual([0, 4, {name: 'Carrier', shot: true}])
        expect(player.attackPlayer('Human', [0, 4])).toBe('CHECK')
    })

    test('Same shot not possible', () => {
        player.human.placeShips('Carrier', 5, [0, 2])
        player.human.receiveAttack([0, 2])

        expect(player.attackPlayer('Human', [0, 2])).toBe('ALREADY SHOT')
    })

    test('Clear boards', () => {
        player.human.placeShips('Carrier', 5, [0, 3], 'Horizontal')

        expect(player.restartPlayers('Human')[3]).toEqual([0, 3])
        expect(player.restartPlayers('Computer')).toEqual(player.restartPlayers('Computer'))
    })
})