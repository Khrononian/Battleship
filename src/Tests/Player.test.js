import Player from '../Functionality/Player'

let player;

beforeEach(() => {
    player = Player()
})

describe('Players', () => {
    test('Attack enemy', () => {
        player.computer.placeShips('Carrier', 5, [0, 4])

        // expect(player.human.board[4]).toEqual([0, 4, {name: 'Carrier', shot: true}])
        expect(player.attackPlayer('Human', [0, 4])).toContainEqual([0, 4, {'name': 'Carrier', shot: true}])
    })

    test('Same shot not possible', () => {
        player.human.placeShips('Carrier', 5, [0, 2])
        player.human.receiveAttack([0, 2])

        expect(player.attackPlayer('Computer', [0, 2])).toBe('ALREADY SHOT')
    })

    test('Clear boards', () => {
        player.human.placeShips('Carrier', 5, [0, 3], 'Horizontal')
        player.computer.placeShips('Patrol Boat', 2, [0, 5], 'Horizontal')

        expect(player.restartPlayers()[0][3]).toEqual([0, 3])
        expect(player.restartPlayers()[1][5]).toEqual([0, 5])
        // expect(player.restartPlayers()).toEqual(player.restartPlayers('Computer'))
    })
})