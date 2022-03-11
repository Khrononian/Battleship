import CreateShips from "./Ship";

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
        else placeVertical(ship, coords)

        return board
    }
    
    const placeComputerShips = (ship, length) => { // CHANGE THIS TO FOCUS ON COMPUTER SHIP
        const direction = ['Horizonal', 'Vertical']
        const randomView = Math.floor(Math.random() * direction.length)
        const random = board[Math.floor(Math.random() * board.length)]

        // if (direction[randomView] == 'Horizonal') {
        //     for (let col = 0; col < board.length; col++) {  
        //         for (let row = 0; row < length; row++) {
        //                 if (random[1] > 5 ) {

        //                     placeComputerShips(ship, length)
        //                     return board
        //                 } else if (!random[2] && ship == 'Carrier') random[2] = {name: ship, shot: false}
        //                 if (random[1] > 6 && random[2] ) {

        //                     placeComputerShips(ship, length)
        //                     return board
        //                 } else if (!random[2] && ship == 'Battle Ship') {
                            
        //                     random[2] = {name: ship, shot: false} 
        //                 } 
                        
        //                 if (random[1] > 7 && random[2] ) {

        //                     placeComputerShips(ship, length)
        //                     return board
        //                 } else if (!random[2] && ship == 'Destroyer') {
        //                     random[2] = {name: ship, shot: false}
        //                 } 
                          
        //                 if (random[1] > 7 && random[2] ) {

        //                     placeComputerShips(ship, length)
        //                     return board
        //                 } else if (!random[2] && ship == 'Submarine') {
        //                     random[2] = {name: ship, shot: false} 
        //                 } 
                         
        //                 if (random[1] > 8 && random[2] ) {

        //                     placeComputerShips(ship, length)
        //                     return board
        //                 } else if (!random[2] && ship == 'Patrol Boat') {
        //                     random[2] = {name: ship, shot: false}
        //                 } 
                         
                    
        //             // if (board[col][1] == random[1] && board[col + row][0] == random[0]) {
        //             //     board[col + row][2] = {name: ship, shot: false}   
        //             // } 
        //         }
        //     }
        // } else {
        //     for (let i = 0; i < board.length; i++) {
        //         // if (!random[2] && ship !== undefined) {
        //             if (random[0] > 5 ) {

        //                 placeComputerShips(ship, length)
        //                 return board
        //             } else random[2] = {name: ship, shot: false}
        //             if (random[0] > 6 && random[2] ) {

        //                 placeComputerShips(ship, length)
        //                 return board
        //             } else if (!random[2] && ship == 'Battle Ship') {
        //                 random[2] = {name: ship, shot: false}
        //             } 
                     
        //             if (random[0] > 7 && random[2] ) {

        //                 placeComputerShips(ship, length)
        //                 return board
        //             } else if (!random[2] && ship == 'Destroyer') {
        //                 random[2] = {name: ship, shot: false}
        //             } 
                     
        //             if (random[0] > 7 && random[2] ) {

        //                 placeComputerShips(ship, length)
        //                 return board
        //             } else if (!random[2] && ship == 'Submarine') {
        //                 random[2] = {name: ship, shot: false}
        //             } 
                      
        //             if (random[0] > 8 && random[2] ) {

        //                 placeComputerShips(ship, length)
        //                 return board
        //             } else if (!random[2] && ship == 'Patrol Boat') {
        //                 random[2] = {name: ship, shot: false} 
        //             } 
                    
        //         // } // CHECK IF IT GOES INTO THE SAME POSITIONED SHIP PLACED
        //         if ( board[i][0] == random[0] && board[i][1] == random[1] && ship !== undefined && board[i][2].name == 'Carrier') {
        //             for (let k = 0; k < 4; k++) board[i += 10][2] = {name: ship, shot: false}
        //         }  if ( board[i][0] == random[0] && board[i][1] == random[1] && ship !== undefined && board[i][2].name == 'Battle Ship') {
        //             for (let k = 0; k < 3; k++) board[i += 10][2] = {name: ship, shot: false}
        //         }  if ( board[i][0] == random[0] && board[i][1] == random[1] && ship !== undefined && board[i][2].name == 'Destroyer') {
        //             for (let k = 0; k < 2; k++) board[i += 10][2] = {name: ship, shot: false}
        //         }  if ( board[i][0] == random[0] && board[i][1] == random[1] && ship !== undefined && board[i][2].name == 'Submarine') {
        //             for (let k = 0; k < 2; k++) board[i += 10][2] = {name: ship, shot: false}
        //         }  if ( board[i][0] == random[0] && board[i][1] == random[1] && ship !== undefined && board[i][2].name == 'Patrol Boat') {
        //             for (let k = 0; k < 1; k++) board[i += 10][2] = {name: ship, shot: false}
        //         }
        //     }
        // }
        
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

    const placeVertical = (ship, coords) => {
        let row = coords[0];
        let col = coords[1];
    
        for (let k = 0; k < board.length; k++) {   
            if (board[k][0] == row && board[k][1] == col) {
                board[k][2] = {name: ship, shot: false} 
                board[k += 10][2] = {name: ship, shot: false}

                if (board[k][2].name == 'Carrier') {
                    for (let i = 0; i < 3; i++) board[k += 10][2] = {name: ship, shot: false}
                } else if (board[k][2].name == 'Battle Ship') {
                    for (let i = 0; i < 2; i++) board[k += 10][2] = {name: ship, shot: false}
                } else if (board[k][2].name == 'Destroyer') {
                    for(let i = 0; i < 1; i++) board[k += 10][2] = {name: ship, shot: false}
                } else if (board[k][2].name == 'Submarine') {
                    for(let i = 0; i < 1; i++) board[k += 10][2] = {name: ship, shot: false}
                } else return
            }
        }
    }

    const receiveAttack = (coordinates) => {
        const hitShip = CreateShips()

        for (let i = 0; board.length; i++) {
            if (board[i][0] == coordinates[0] && board[i][1] == coordinates[1]) {
                
                if (board[i].length == 3) {
                    if (board[i][2].shot == true) return 'ALREADY SHOT'
                    
                    board[i][2].shot = true
                    shipAttacks.push(board[i])
                    
                    return board[i]
                } else if (board[i].length == 2) return missedAttacks(coordinates)
            } 
            // else missedAttacks(coordinates)
            
        }
        
    }

    const missedAttacks = missedShots => {
        missedShots[2] = { missed: true }
        missedBlasts.push(missedShots)
        
        return missedBlasts
    }

    const checkShipConditions = () => {
        if (shipAttacks.length == 17 && shipAttacks.every(ship => ship[2].name && ship[2].shot == true)) return 'FOOD'
        else return false
        // return shipAttacks.every(ship => {
        //     if (shipAttacks.length == 17 && ship[2].shot == true) {
        //         return 'FOOD'
        //     } 
        // })
        
    }

    return { 
        receiveAttack, 
        missedAttacks, 
        checkShipConditions, 
        board, placeShips, 
        placeComputerShips,
        placeHorizontal,
        placeVertical,
        shipAttacks,
        missedBlasts
    }
}

export default GameBoard;