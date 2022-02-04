import CreateShips from "./Ship";
import { carrier, battleShip, destroyer, submarine, patrolBoat, accessShips } from '../Functionality/Ship'

const GameBoard = () => {
    let newBoard = [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
        [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
        [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
        [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
        [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9],
    ]
    
    const missedBlasts = []
    const board = [];
    
    (() => {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                board.push([row, col])
            }
        }
    })()
    
    const placeShips = (ship, length, coords, direction) => {
        const createShip = CreateShips(ship, length);
        const randomHorizontal = Math.floor(Math.random() * board.length) // FOR AI
        let checkHorizontal = true
        let addedLength = randomHorizontal + length
        let verticalLength = [0, 1, 2, 3, 4, 5]

        
        // if (checkHorizontal) placeHorizontalAi(ship, addedLength, randomHorizontal) // WORKS, BUT FOR COMPUTER
        
        if (checkHorizontal) placeHorizontal(ship, length, coords)
        else placeVertical()

        // if (board[row][1] == coords[1] - length) {
        //             board[row][2] = {name: ship, shot: false}
        //         } -- GETS VERTICALS

        // board[0].push({name: 'Food'}) - TO PLACE IT INTO COORDINATES

        return board
    }

    const placeHorizontal = (ship, length, coords) => {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < length; col++) {
                if (board[row][0] == coords[0] && board[row][1] == coords[1]
                && board[row + col][0] == coords[0]) {
                    board[row + col][2] = {name: ship, shot: false}
                } 
            }
        }
    }

    const placeHorizontalAi = (ship, length, horizontal) => { // CHANGE THIS TO FOCUS ON COMPUTER SHIPS
        for (let i = horizontal; i < length; i++) {
            board[i].push({name: ship, shot: false})
        }
    }

    const placeVertical = () => {

    }

    const receiveAttack = (coordinates, determineAttack) => {
        const hitShip = CreateShips()

        for (let i = 0; board.length; i++) {
            if (coordinates[2]) {
                if (board[i][0] == coordinates[0] && board[i][1] == coordinates[1]) {
                    coordinates[2].shot = true
                    return hitShip.hit(coordinates)
                } 
            } else return missedAttacks(coordinates)
        }
        
    }

    const missedAttacks = missedShots => {
        missedBlasts.push(missedShots)
        
        return missedBlasts
    }

    const checkShipConditions = () => {
        
    }

    
    
    return { receiveAttack, missedAttacks, checkShipConditions, board, placeShips }
}

export default GameBoard;