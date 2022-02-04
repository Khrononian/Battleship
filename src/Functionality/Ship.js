import { enemyWaters, allyWaters } from './Dom'
import GameBoard from './GameBoard'

const CreateShips = (shipName, length) => {
    let sunk = false;

    const hitCoordinates = [];

    const hit = num => {
        if (hitCoordinates.indexOf(num) == -1) {
            hitCoordinates.push(num)
            
            return hitCoordinates
        } 
    }

    const isSunk = (length) => {
        if (hitCoordinates.length == length) {
            return sunk = true
        } else return sunk = false
    }

    return { hit, isSunk }
}
const ship = CreateShips('Carrier', 5, false);
const accessShips = CreateShips()

const carrier = CreateShips('Carrier', 5, false);
const battleShip = CreateShips('Battle Ship', 4, false);
const destroyer = CreateShips('Destroyer', 3, false);
const submarine = CreateShips('Submarine', 3, false);
const patrolBoat = CreateShips('Patrol Boat', 2, false);

export default CreateShips
export { ship, carrier, battleShip, destroyer, submarine, patrolBoat, accessShips }