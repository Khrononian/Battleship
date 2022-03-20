import Player from './Player'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters');
const allyWaters = document.querySelector('.allied-waters');
const shipZone = document.querySelector('.ship-zone');
const shipBlocks = document.querySelector('.ship-block');
const restartBtn = document.querySelector('.restart-btn');
const player = Player()
const shipLengths = [5, 4, 3, 3, 2]
const array = [];
const shipArray = [
    {name: 'Carrier', length: 5},
    {name: 'Battle Ship', length: 4},
    {name: 'Destroyer', length: 3},
    {name: 'Submarine', length: 3},
    {name: 'Patrol Boat', length: 2}
]
const shipCopy = []

const loadGridBlocks = () => {
    for (let i = 0; i < 100; i++) {
        const enemyDivs = document.createElement('div');
        const allyDivs = document.createElement('div');
        const shipDivs = document.createElement('div');

        enemyDivs.classList.add('grid-cell')
        enemyDivs.classList.add('grid-enemy')

        enemyDivs.addEventListener('mouseover', hoverGridCell)
        enemyDivs.addEventListener('click', clickGridCell)
        enemyDivs.addEventListener('mouseout', hoverOutGridCell)
        shipDivs.addEventListener('mouseover', hoverShipPlacements)
        shipDivs.addEventListener('mouseout', hoverOutShipPlacements)
        shipDivs.addEventListener('click', clickShipPlacement);
        restartBtn.addEventListener('click', restartBoard)
        
        enemyWaters.append(enemyDivs)
        allyDivs.classList.add('grid-ally');
        allyWaters.append(allyDivs);
        enemyDivs.style.cursor = 'pointer'
        shipZone.append(shipDivs)
        shipDivs.classList.add('grid-ships')
        shipBlocks.style.visibility = 'unset'
        shipZone.append(shipBlocks)

        enemyDivs.dataset.row = Number(getGridPosition(enemyWaters, getElementIndex(enemyDivs)).row);
        enemyDivs.dataset.column = Number(getGridPosition(enemyWaters, getElementIndex(enemyDivs)).column);
        allyDivs.dataset.row = Number(getGridPosition(allyWaters, getElementIndex(allyDivs)).row);
        allyDivs.dataset.column = Number(getGridPosition(allyWaters, getElementIndex(allyDivs)).column);
        shipDivs.dataset.row = Number(getGridPosition(shipZone, getElementIndex(shipDivs)).row);
        shipDivs.dataset.column = Number(getGridPosition(shipZone, getElementIndex(shipDivs)).column);
        allyDivs.dataset.shot = false;
    }
}

const hoverShipPlacements = event => {
    let nextInnerGridCell = event.target.nextElementSibling
    let upper = 0;

    shipBlocks.style.display = 'grid'
    shipBlocks.style.left = (event.target.offsetLeft) + 'px'
    shipBlocks.style.top = (event.target.offsetTop) + 'px'
    shipBlocks.lastElementChild.style.borderRight = 'transparent'
    
    for (let i = 0; i < shipBlocks.children.length; i++) {
        for (let k = 0; k < shipZone.children.length; k++) {
            while (upper != shipLengths[0] && nextInnerGridCell) { // CHANGE THIS TO A UNIVERSAL SHIP LENGTH
                if (shipBlocks.children[upper] && event.target.dataset.row == nextInnerGridCell.dataset.row ) shipBlocks.children[upper].dataset.column = nextInnerGridCell.dataset.column - 1 
                else if (shipBlocks.lastElementChild.previousElementSibling.dataset.column == 8) shipBlocks.lastElementChild.dataset.column = 9;
                
                // if (shipBlocks.children.length > 3) {
                //     shipBlocks.children[upper].dataset.antiMagnet = nextInnerGridCell.dataset.antiMagnet
                //     shipBlocks.lastElementChild.dataset.antiMagnet = 'undefined'
                // }
                // else {
                //     shipBlocks.lastElementChild.dataset.antiMagnet = event.target.nextElementSibling.dataset.antiMagnet
                //     hoverMagnet = false
                // }
                
                // if (!shipBlocks.children[upper].dataset.antiMagnet || shipBlocks.children[upper].dataset.antiMagnet == 'undefined' || !event.target.dataset.antiMagnet ){
                //     hoverMagnet = false
                // }

                upper++
                nextInnerGridCell = nextInnerGridCell.nextElementSibling
            }
        }
        if (!shipBlocks.children[i].dataset.row) shipBlocks.children[i].dataset.row = event.target.dataset.row
        else shipBlocks.children[i].dataset.row = event.target.dataset.row
        if (shipBlocks.children[0].dataset.column && event.target.dataset.row == shipBlocks.children[i].dataset.row) shipBlocks.children[0].dataset.column = event.target.dataset.column
    }
}

const hoverOutShipPlacements = event => {
    shipBlocks.style.display = 'none'

    for (let i = 0; i < shipBlocks.children.length; i++) {
        if (event.target.dataset.column !== -1) {

        }
        else return
    }
}


const placeComputerShips = () => {
    const direction = ['Horizontal', 'Vertical']
    const randomView = Math.floor(Math.random() * direction.length)
    const random = player.computer.board[Math.floor(Math.random() * player.computer.board.length)]
    
    if (direction[randomView] == 'Horizontal') {
        console.log('GET RANDOM', random, random[1] + 1)
        if (random.length == 3) {
            placeComputerShips()
            return
        }
        for (let k = 0; k < player.computer.board.length; k++) {
            for (let cols = 0; cols < shipArray[0].length; cols++) {
                if (player.computer.board[k - 1] && player.computer.board[k - 1][0] == random[0] && player.computer.board[k - 1][1] == random[1] - 1 && player.computer.board[k - 1][2] ) {
                    placeComputerShips()
                    return
                }
                if (player.computer.board[k + cols + 1] && player.computer.board[k + cols + 1][0] == random[0] && player.computer.board[k + cols + 1][1] == random[1] + cols + 1 && player.computer.board[k + cols + 1][2]) {
                    placeComputerShips()
                    return
                }
            }
        }
        console.log('BOARD', player.computer.board)
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let k = 0; k < player.computer.board.length; k++) {
                for (let col = 0; col < shipArray[0].length; col++) { 
                    if (random[1] > 5 && shipArray[0].name == 'Carrier') {  
                        placeComputerShips()
                        return player.computer.board
                    } else {
                        player.computer.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]]) 
                    }

                    if (random[1] > 6 && shipArray[0].name == 'Battle Ship') {
                        placeComputerShips()
                        console.log('INNER BATTLE TEST')
                        return player.computer.board
                    }  else  {
                        player.computer.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                    }   
                    
                    if (random[1] > 7 && shipArray[0].name == 'Destroyer') {
                        placeComputerShips()
                        console.log('INNER DESTROYER TEST')
                        return player.computer.board
                    }  else {
                        player.computer.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                    }   
                    
                    if (random[1] > 7 && shipArray[0].name == 'Submarine') {
                        placeComputerShips()
                        console.log('INNER SUB TEST')
                        return player.computer.board
                    }  else {
                        player.computer.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                    }   
                    
                    if (random[1] > 8 && shipArray[0].name == 'Patrol Boat') {
                        placeComputerShips()
                        console.log('INNER PATROL TEST')
                        return player.computer.board
                    } else {
                        player.computer.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                    }   
                }
                for (let row = 0; row < shipArray[0].length; row++) {
                    if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                    && random[2] ) {
                        switch (shipArray[0].name) {
                            case 'Carrier':
                                for (let j = 9; j < 16; j++) {
                                    if (enemyWaters.children[i + j] ) enemyWaters.children[i + j].style.background = 'purple'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer Carrier`}
                                    }
                                }
                                for (let j = 11; j > 4; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].style.background = 'purple'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer Carrier`}
                                    }
                                }
                                break;
                            case 'Battle Ship': 
                                for (let j = 9; j < 15; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].style.background = 'purple'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer Battle Ship`}
                                    }
                                }
                                for (let j = 11; j > 5; j--) {
                                    if (enemyWaters.children[i - j] ) enemyWaters.children[i - j].style.background = 'purple'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer Battle Ship`}
                                    }
                                }
                                break;
                            case 'Destroyer':
                                for (let j = 9; j < 14; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].style.background = 'purple'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer Destroyer`}
                                    }
                                }
                                for (let j = 11; j > 6; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].style.background = 'purple'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer Destroyer`}
                                    }
                                }
                                break;
                            case 'Submarine':
                                for (let j = 9; j < 14; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].style.background = 'purple'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer Submarine`}
                                    }
                                }
                                for (let j = 11; j > 6; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].style.background = 'purple'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer Submarine`}
                                    }
                                }
                                break;
                            case 'Patrol Boat':
                                for (let j = 9; j < 13; j++) {
                                    
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].style.background = 'purple'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer Patrol Boat`}
                                    }
                                }
                                for (let j = 11; j > 7; j--) {
                                    
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].style.background = 'purple'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer Patrol Boat`}
                                    }
                                }
                            break;
                        }
                        if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].dataset.column != 9) enemyWaters.children[i - 1].style.background = 'yellow'
                        if (player.computer.board[k - 1] && player.computer.board[k - 1][0] == random[0] && player.computer.board[k - 1][1] == random[1] - 1 && player.computer.board[k - 1][1] != 9) player.computer.board[k - 1][2] = {outer: 'OUTER'}
                        if (enemyWaters.children[i + row + 1] && enemyWaters.children[i + row + 1].dataset.column != 0) enemyWaters.children[i + row + 1].style.background = 'yellow'
                        if (player.computer.board[k + row + 1] && player.computer.board[k + row + 1][0] == random[0] && player.computer.board[k + row + 1][1] == random[1] + row + 1 && player.computer.board[k + row + 1][1] != 0) player.computer.board[k + row + 1][2] = {outer: 'OUTER'}
                        
                        enemyWaters.children[i + row].style.background = 'red'
                        enemyWaters.children[i + row].dataset.ship = shipArray[0].name
                        enemyWaters.children[i + row].dataset.shot = false
                    }
                }
            }
        }
    } else {
        console.log('G RAND', random)
        if (random.length == 3) {
            placeComputerShips()
            return
        }

        for (let row = 0; row < player.computer.board.length; row++) {
            for (let cols = 10; cols <= shipArray[0].length * 10; cols += 10) {
                if (player.computer.board[row - 1] && player.computer.board[row - 1][0] == random[0] && player.computer.board[row - 1][1] == random[1] - 1 && player.computer.board[row - 1][2]) {
                    console.log('first TEST')
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + 10] && player.computer.board[row + 10 ][0] == random[0] + 10  && player.computer.board[row + 10 ][1] == random[1] && player.computer.board[row + 10 ][2]) {
                    console.log('TEST')
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + cols] && player.computer.board[row][0] == random[0] && player.computer.board[row][1] == random[1]
                && player.computer.board[row + cols][1] == random[1] && player.computer.board[row + cols][2]) {
                    console.log('DOWN TEST')
                    placeComputerShips()
                    return
                }
            }
        }
        console.log('COLUMN COMP', player.computer.board)
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let row = 0; row < player.computer.board.length; row++) {
                if (random[0] > 5 && shipArray[0].name == 'Carrier') {
                    placeComputerShips()
                    return player.computer.board
                } else player.computer.placeVertical(shipArray[0].name, shipArray[0].length, [random[0], random[1]])          
                
                if (random[0] > 6 && shipArray[0].name == 'Battle Ship') {
                    placeComputerShips()
                    return player.computer.board
                } else player.computer.placeVertical(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                
                if (random[0] > 7 && shipArray[0].name == 'Destroyer') {
                    placeComputerShips()
                    return player.computer.board
                } else player.computer.placeVertical(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                
                if (random[0] > 7 && shipArray[0].name == 'Submarine') {
                    placeComputerShips()
                    return player.computer.board
                } else player.computer.placeVertical(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                
                if (random[0] > 8 && shipArray[0].name == 'Patrol Boat') {
                    placeComputerShips()
                    return player.computer.board
                } else player.computer.placeVertical(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                
                for (let index = 0; index <= shipArray[0].length + 1; index++) {
                    if (player.computer.board[row + 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row + 1][2] = {outer: 'OUTER'}
                    if (player.computer.board[row - 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row - 1][2] = {outer: 'OUTER'}
                }
                for (let column = 10; column < shipArray[0].length * 10; column += 10) {
                    if (player.computer.board[row + column] && player.computer.board[row + column][0] == random[0] + 1 && player.computer.board[row][1] == random[1]
                    && player.computer.board[row + column][1] == random[1]) {
                        // console.log('RING', player.computer.board[row + column + shipArray[0].length * 10 - 10])
                        if (player.computer.board[row + column + shipArray[0].length * 10 - 10]) player.computer.board[row + column + shipArray[0].length * 10 - 10][2] = {outer: 'OUTER'}
                    }
                }
                
                if (player.computer.board[row - 11] && player.computer.board[row - 11][0] == random[0] - 1 && player.computer.board[row - 11][1] == random[1] - 1) player.computer.board[row - 11][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 9] && player.computer.board[row - 9][0] == random[0] - 1 && player.computer.board[row - 9][1] == random[1] + 1) player.computer.board[row - 9][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 10] && player.computer.board[row - 10][0] == random[0] - 1 && player.computer.board[row][1] == random[1]) player.computer.board[row - 10][2] = {outer: 'OUTER'}
                
                if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                && random[2]) {
                    // if (enemyWaters.children[i].style.background == 'red' || enemyWaters.children[i].style.background == 'purple') {
                    //     console.log('RANDOM WAS TAKEN')
                    //     placeComputerShips()
                    //     return player.computer.board
                    // }
                    enemyWaters.children[i].style.background = 'red'

                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].style.background = 'yellow'
                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].style.background = 'purple'
                    if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                    if (enemyWaters.children[i - 10]) enemyWaters.children[i - 10].style.background = 'yellow'
                    if (enemyWaters.children[i - 11]) enemyWaters.children[i - 11].style.background = 'yellow'
                    if (enemyWaters.children[i - 9]) enemyWaters.children[i - 9].style.background = 'yellow'

                    enemyWaters.children[i].dataset.shot = false;
                    enemyWaters.children[i].dataset.ship = shipArray[0].name
                    
                    // enemyWaters.children[i += 10].dataset.ship = shipArray[0].name 
                    if (enemyWaters.children[i].dataset.ship == 'Carrier') {
                        for (let col = 0; col < 4; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].style.background = 'purple'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Battle Ship') {
                        for (let col = 0; col < 3; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].style.background = 'purple'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Destroyer') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].style.background = 'purple'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Submarine') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].style.background = 'purple'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Patrol Boat') {
                        for (let col = 0; col < 1; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].style.background = 'purple'
                        }
                    }
                }
            }
        }
    }
    return player.computer.board
}

const clickShipPlacement = event => {
    let nextSibling = event.target.nextElementSibling
    let numberIndex = 1;
    // CHANGE PURPLE BACKGROUNDS INTO A DATASET OF SHIP
    player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
    
    
    if (event.target.style.background == 'purple' || event.target.style.background == 'red') return 
    while (nextSibling && numberIndex !== shipArray[0].length) {
        if (nextSibling.style.background == 'purple') return
        
        numberIndex++
        nextSibling = nextSibling.nextElementSibling
    }
    for (let i = 0; i < allyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            for (let k = 0; k < player.human.board.length; k++) {
                if (allyWaters.children[i].dataset.row == shipBlocks.children[j].dataset.row 
                && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column) {
                    allyWaters.children[i].style.background = 'red'
                    allyWaters.children[i].dataset.ship = shipArray[0].name
                }
            }
            for (let g = 0; g < shipZone.children.length; g++) {
                if (shipBlocks.children[j].dataset.row == shipZone.children[g].dataset.row &&
                shipBlocks.children[j].dataset.column == shipZone.children[g].dataset.column)  {
                    event.target.style.background = 'red'
                    shipZone.children[g].style.background = 'red'
                    shipZone.children[g].dataset.ship = shipArray[0].name
                    if (event.target.previousElementSibling  && event.target.previousElementSibling.dataset.row == event.target.dataset.row) event.target.previousElementSibling.style.background = 'purple'
                    if (shipZone.children[g + 1] && shipZone.children[g + 1].dataset.row == event.target.dataset.row) shipZone.children[g + 1].style.background = 'purple'
                    if (shipZone.children[g + 10]) shipZone.children[g + 10].style.background = 'purple'
                    if (shipZone.children[g - 10]) shipZone.children[g - 10].style.background = 'purple'
                    if (shipZone.children[g - 10] && shipZone.children[g - 10].previousElementSibling && shipZone.children[g - 10].previousElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].previousElementSibling.style.background = 'purple'
                    if (shipZone.children[g - 10] && shipZone.children[g - 10].nextElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].nextElementSibling.style.background = 'purple'
                    if (shipZone.children[g + 10] ) shipZone.children[g + 10].previousElementSibling.style.background = 'purple'
                    if (shipZone.children[g + 10] && shipZone.children[g + 10].nextElementSibling) shipZone.children[g + 10].nextElementSibling.style.background = 'purple'
                } 
            }
            shipBlocks.children[j].style.background = 'red'
        }
    }
    
    placeComputerShips()
    
    if (shipArray[0].name == 'Carrier') {
        shipBlocks.removeChild(shipBlocks.lastElementChild);
        shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`
        shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
    } else if (shipArray[0].name == 'Battle Ship') {
        shipBlocks.removeChild(shipBlocks.lastElementChild);
        shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
        shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
    } else if (shipArray[0].name == 'Submarine') {
        shipBlocks.removeChild(shipBlocks.lastElementChild);
        shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`
        shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
    } else if (shipArray[0].name == 'Patrol Boat') {
        document.querySelector('.contain-ships').remove()
        document.querySelector('.contain').style.filter = 'none'
        document.querySelector('header').style.filter = 'none'
    }
    shipCopy.push(shipArray[0])
    shipArray.splice(0, 1)
    if (shipArray[0]) document.querySelector('p').innerText = shipArray[0].name
}

const getGridPosition = (parent, index) => {
    let offset = Number(window.getComputedStyle(parent.children[0]).gridColumnStart) - 1;

    if (isNaN(offset)) offset = 0;

    const colCount = window.getComputedStyle(parent).gridTemplateColumns.split(' ').length;
    const rowPosition = Math.floor((index + offset) / colCount);
    const colPosition = (index + offset) % colCount;
        
    return { row: rowPosition, column: colPosition }
}

const getElementIndex = (element) => {
    const findElement = element.parentNode.children;

    for (let i = 0; i < findElement.length; i++) if (findElement[i] === element) return i
}

const hoverGridCell = (event) => {
    event.target.style.background = '#3232';

    const logPositions = getGridPosition(enemyWaters, getElementIndex(event.target))

    // USE getShipPositions to find the receivedattacks coordinates

    console.log('Find it - enemyWaters', logPositions ) // USE THIS AND GET POSITION FOR CLICKS

    console.log('Random allyWaters', getGridPosition(allyWaters, Math.floor(Math.random() * allyWaters.childElementCount)) )
    
    
    console.log('Find ally coords', allyWaters.children[Math.floor(Math.random() * allyWaters.childElementCount)] )
    
    // ABOVE WORKS, NOW FIND A WAY TO MAKE IT NOT COORDINATE TWICE
}

const clickGridCell = (event) => {
    const enemyBoardCoordinates = getGridPosition(enemyWaters, getElementIndex(event.target));
   
    console.log('HUMAN VS COMPUTER ARRAY', player.attackPlayer('Human', [enemyBoardCoordinates.row, enemyBoardCoordinates.column]), player.computer.board)
    // player.attackPlayer('Computer', [allyBoardCoordinates.row, allyBoardCoordinates.column])
    randomSelectionCheck()
    // player.attackPlayer('Computer', [allyBoardCoordinates.row, allyBoardCoordinates.column])
    // console.log('LOOK COMPUTER ATTACK ALLY BOARD', player.human.board, player.human.shipAttacks, player.human.missedBlasts)

    
    console.log('CHECK ARRAY', player.human.checkShipConditions(), player.computer.checkShipConditions())
    
    if (event.target.dataset.ship) {
        event.target.style.pointerEvents = 'none'
        event.target.style.cursor = 'none'
        event.target.style.background = 'red'
    }
    else {
        event.target.innerHTML = `<i class="fas fa-circle"></i>`
        event.target.style.pointerEvents = 'none'
        event.target.style.cursor = 'none'
    }
    if (player.human.checkShipConditions()) {
        alert('COMPUTER WON')
        clearBoard()
    } else if (player.computer.checkShipConditions()) {
        alert('HUMAN WON')
        
        console.log('AFTER', player.computer.board, player.human.board)
        // console.log('WILLING', player.restartPlayers())
        
    }
    
    console.log('ENEMY', enemyBoardCoordinates) // USE TO ATTACK ENEMY
    // console.log('ALLY', allyBoardCoordinates) // USE FOR COMPUTER TO ATTACK
}

const restartBoard = event => {
    clearBoard();
    player.restartPlayers()
}

const clearBoard = () => {
    for (let i = 0; i < enemyWaters.children.length; i++) {
        enemyWaters.children[i].style.background = ''
        delete enemyWaters.children[i].dataset.ship
        delete enemyWaters.children[i].dataset.shot
        enemyWaters.children[i].style.pointerEvents = 'auto'
        enemyWaters.children[i].style.cursor = 'pointer'
        if (enemyWaters.children[i].firstChild) enemyWaters.children[i].firstChild.remove()
    }
    for (let i = 0; i < allyWaters.children.length; i++) {
        allyWaters.children[i].style.background = '';
        delete allyWaters.children[i].dataset.ship;
        delete allyWaters.children[i].dataset.shot
        if (allyWaters.children[i].firstChild) allyWaters.children[i].firstChild.remove()
    }
}

const randomSelectionCheck = () => { // ALLY TARGETS
    const randomSelection = allyWaters.children[Math.floor(Math.random() * allyWaters.children.length)]
    
    // WHY DID IT WORK TO HERE BUT NOT WHEN PASSING IT INTO A FUNCTION 
    console.log('RANDOM', randomSelection, randomSelection.dataset.shot)
    // const allyBoardCoordinates = getGridPosition(allyWaters, getElementIndex(randomSelectionCheck()));
       
    if (array.indexOf(randomSelection.dataset.row + randomSelection.dataset.column) == -1 && randomSelection) {
        array.push(randomSelection.dataset.row + randomSelection.dataset.column)
        randomSelection.innerHTML = `<i class="fas fa-circle"></i>`;
        randomSelection.dataset.shot = true;

        for (let i = 0; i < allyWaters.children.length; i++) {
            if (randomSelection.dataset.row == allyWaters.children[i].dataset.row && randomSelection.dataset.column == allyWaters.children[i].dataset.column
            && allyWaters.children[i].dataset.ship) {
                allyWaters.children[i].style.background = 'purple'
                player.attackPlayer('Computer', [randomSelection.dataset.row, randomSelection.dataset.column])
            } else player.attackPlayer('Computer', [randomSelection.dataset.row, randomSelection.dataset.column])
        }

        return getGridPosition(allyWaters, getElementIndex(randomSelection))
    } else {
        randomSelectionCheck()

        return getGridPosition(allyWaters, getElementIndex(randomSelection))
    }
}

const hoverOutGridCell = (event) => {
    if (event.target.dataset.ship) return
    else event.target.style.background = 'transparent'
}

window.addEventListener('load', loadGridBlocks)

console.log(rice)

export default rice