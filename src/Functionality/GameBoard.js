const GameBoard = () => {
    const missedBlasts = []
    const shipAttacks = []
    const board = [];
    
    (() => {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                board.push([row, col])
            }
        }
    })()
    
    const placeShips = (ship, length, coords, direction) => {
        if (direction == 'Horizontal') placeHorizontal(ship, length, coords)
        else placeVertical(ship, length, coords)

        return board
    }
    
    const placeHorizontal = (ship, length, coords) => {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < length; col++) {
                if (board[row][0] == coords[0] && board[row][1] == coords[1]
                && board[row + col] && board[row + col][0] == coords[0]) {
                    board[row + col][2] = {name: ship, shot: false}
                }
            }
        }
    }

    const placeVertical = (ship, length, coords) => {
        let row = coords[0];
        let col = coords[1];
    
        for (let k = 0; k < board.length; k++) {
            for (let p = 10; p < length * 10 ; p += 10) {
                if (board[k][0] == row && board[k][1] == col && board[k + p]) {
                    board[k][2] = {name: ship, shot: false} 
                    board[k + p][2] = {name: ship, shot: false}
                }
            }
        }
    }

    const receiveAttack = (coordinates) => {
        for (let i = 0; board.length; i++) {
            if (board[i][0] == coordinates[0] && board[i][1] == coordinates[1]) {
                if (board[i].length == 3) {
                    if (board[i][2].shot == true) return 'ALREADY SHOT'
                    if (board[i][2].name) {
                        board[i][2].shot = true
                        shipAttacks.push(board[i])
                    }
                    return shipAttacks
                } else if (board[i].length == 2) return missedAttacks(coordinates)
            } 
        }
    }

    const missedAttacks = missedShots => {
        missedShots[2] = { missed: true }
        missedBlasts.push(missedShots)
        
        return missedBlasts
    }

    const checkShipConditions = () => {
        if (shipAttacks.length == 17 && shipAttacks.every(ship => ship[2].name && ship[2].shot == true)) return true
        else return false
    }

    return { 
        receiveAttack, 
        missedAttacks, 
        checkShipConditions, 
        board, placeShips, 
        placeHorizontal,
        placeVertical,
        shipAttacks,
        missedBlasts
    }
}

export default GameBoard;