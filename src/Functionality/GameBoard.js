import CreateBattleShips from "./Ship";
import { carrier, battleShip, destroyer, submarine, patrolBoat } from '../Functionality/Ship'

const GameBoard = () => {
    return {
        gameEnded: false,
        missedShots: [],
        shipPlacement() {

        },
        receiveAttack(coordinates, determineAttack, findNum) {

            // COORDINATE PARAMETER TAKES THE X/Y VALUES
            // CHECK IF FINDNUM PARAMETER CAN FIND THE NUMBER WITHIN HIT FUNCTION
            // POTENTIALLY USE ONLY COORDINATE PARAMETER TO PASS IT INTO THE HIT FUNCTION
            if (coordinates && determineAttack === 'Ship') {
                console.log('Hi there', coordinates)
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
        checkAllShipConditions(alliedShips, enemyShips) {
            if (alliedShips === 5) return 'All allied ships sunk' 
            else if (enemyShips === 5) return 'All enemy ships sunk'
            else return 'All enemy ships havent sunk' || 'All allied ships havent sunk'
        }
    }
}

export default GameBoard;