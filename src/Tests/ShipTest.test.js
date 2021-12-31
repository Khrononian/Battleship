import CreateBattleShips from '../Functionality/Ship'
import { carrier, battleShip, destroyer, submarine, patrolBoat } from '../Functionality/Ship'

describe('All about the ships', () => {
    test('Check ship length', () => {
        expect(carrier.length).toBe(5)
        expect(battleShip.length).toBe(4)
        expect(destroyer.length).toBe(3)
        expect(submarine.length).toBe(3)
        expect(patrolBoat.length).toBe(2)
    }) 

    test('Calculate function based on length and whether all positions are hit', () => {
        expect(carrier.isSunk()).toBe(false)
        expect(battleShip.isSunk()).toBe(false)
        expect(destroyer.isSunk()).toBe(false)
        expect(submarine.isSunk()).toBe(false)
        expect(patrolBoat.isSunk()).toBe(false)
    })

    test('Hit function takes a number and then marks that position as hit', () => {
        expect(CreateBattleShips().hit([0, 5])).toContain('X')
    })
})