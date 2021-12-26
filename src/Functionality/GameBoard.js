import CreateBattleShips from "./Ship";
import { carrier, battleShip, destroyer, submarine, patrolBoat } from '../Functionality/Ship'

const GameBoard = () => {
    return {
        missedShots: [],
        shipPlacement() {

        },
        receiveAttack(coordinates, findAttack, findNum) {


            // COORDINATE PARAMETER TAKES THE X/Y VALUES
            // CHECK IF FINDNUM PARAMETER CAN FIND THE NUMBER WITHIN HIT FUNCTION
            // POTENTIALLY USE ONLY COORDINATE PARAMETER TO PASS IT INTO THE HIT FUNCTION
            if (coordinates && findAttack === 'Ship') {
                return CreateBattleShips().hit(coordinates)
            }
            else {
                return this.missedAttacks(coordinates)
            }
        },
        missedAttacks(missedCoordinate) {
            this.missedShots.push(missedCoordinate)

            return this.missedShots;
        },
        checkAllShipConditions() {
            if (carrier.sunk === true && battleShip.sunk === true && destroyer.sunk === true
            && submarine.sunk === true && patrolBoat.sunk === true) {
                return 'All ships sunk'
            } else return 'All ships havent sunk'
        }
    }
}

export default GameBoard;