import CreateShips from '../Functionality/Ship'

describe('Ships', () => {
    test('Ship hits', () => {
        expect(CreateShips().hit([1, 3])).toContainEqual([1, 3])
        expect(CreateShips().hit(4)).toContain(4)
    })

    test('Ship sinks', () => {
        const ship = CreateShips('Carrier', 5);

        ship.hit([1, 2])
        ship.hit([1, 3])
        ship.hit([1, 4])
        ship.hit([1, 5])
        ship.hit([1, 6])
        
        expect(ship.isSunk(5)).toBeTruthy()
    })
})