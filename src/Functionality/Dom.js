import GameBoard from './GameBoard'
import Player from './Player'
import { ship } from './Ship'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters');
const allyWaters = document.querySelector('.allied-waters');
const shipZone = document.querySelector('.ship-zone');
const shipBlocks = document.querySelector('.ship-block');
const getShipPositions = GameBoard()
const getPlayerType = Player()

const shipLengths = [5, 4, 3, 3, 2]
const array = [];
let hoverMagnet = false
const shipArray = [
    {name: 'Carrier', length: 5},
    {name: 'Battle Ship', length: 4},
    {name: 'Destroyer', length: 3},
    {name: 'Submarine', length: 3},
    {name: 'Patrol Boat', length: 2}
]

const loadGridBlocks = () => { // WORK ON GETTING COORDINATES
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

// ship.placeShips('Carrier', 5, [1, 2], 'Vertical') // EXAMPLE TO PLACE SHIP
const playerShips = GameBoard();
const computerShips = GameBoard();
const computer = Player();
const player = Player()

const placeComputerShips = () => {
    const direction = ['Horizontal', 'Vertical']
    const randomView = Math.floor(Math.random() * direction.length)
    const random = computerShips.board[Math.floor(Math.random() * computerShips.board.length)]
    // FIX CODE TO PLACE COMPUTER SHIPS
    if (direction[0] == 'Horizontal') {
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let col = 0; col < computerShips.board.length; col++) {
                if (random[1] > 5 && shipArray[0].name == 'Carrier') {
                    placeComputerShips()
                    return computerShips.board
                }                
                
                if (random[2] && random[1] > 6 && shipArray[0].name == 'Battle Ship') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[2] && random[1] > 7 && shipArray[0].name == 'Destroyer') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[2] && random[1] > 7 && shipArray[0].name == 'Submarine') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[2] && random[1] > 8 && shipArray[0].name == 'Patrol Boat') {
                    placeComputerShips()
                    return computerShips.board
                }
                for (let row = 0; row < shipArray[0].length; row++) {
                    if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                    && random[2] ) {
                        switch (shipArray[0].name) {
                            case 'Carrier':
                                for (let k = 9; k < 16; k++) {
                                    if (enemyWaters.children[i + k] ) enemyWaters.children[i + k].style.background = 'purple'
                                }
                                for (let k = 11; k > 4; k--) {
                                    if (enemyWaters.children[i - k]) enemyWaters.children[i - k].style.background = 'purple'
                                }

                                break;
                            case 'Battle Ship': 
                                for (let k = 9; k < 15; k++) {
                                    // if (enemyWaters.children[i + k] && enemyWaters.children[i + k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    if (enemyWaters.children[i + k]  ) enemyWaters.children[i + k].style.background = 'purple'
                                }
                                for (let k = 11; k > 5; k--) {
                                    // if (enemyWaters.children[i - k] && enemyWaters.children[i - k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    
                                    
                                    if (enemyWaters.children[i - k] ) enemyWaters.children[i - k].style.background = 'purple'
                                }
                                console.log('BOARDS', computerShips.board)
                                break;
                            case 'Destroyer':
                                for (let k = 9; k < 14; k++) {
                                    // if (enemyWaters.children[i + k] && enemyWaters.children[i + k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    if (enemyWaters.children[i + k]  ) enemyWaters.children[i + k].style.background = 'purple'
                                }
                                for (let k = 11; k > 6; k--) {
                                    // if (enemyWaters.children[i - k] && enemyWaters.children[i - k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    
                                    if (enemyWaters.children[i - k]) enemyWaters.children[i - k].style.background = 'purple'
                                }
                                break;
                            case 'Submarine':
                                for (let k = 9; k < 14; k++) {
                                    // if (enemyWaters.children[i + k] && enemyWaters.children[i + k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    if (enemyWaters.children[i + k]  ) enemyWaters.children[i + k].style.background = 'purple'
                                }
                                for (let k = 11; k > 6; k--) {
                                    // if (enemyWaters.children[i - k] && enemyWaters.children[i - k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    
                                    if (enemyWaters.children[i - k]) enemyWaters.children[i - k].style.background = 'purple'
                                }
                                break;
                            case 'Patrol Boat':
                                for (let k = 9; k < 13; k++) {
                                    // if (enemyWaters.children[i + k] && enemyWaters.children[i + k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    if (enemyWaters.children[i + k]  ) enemyWaters.children[i + k].style.background = 'purple'
                                }
                                for (let k = 11; k > 7; k--) {
                                    // if (enemyWaters.children[i - k] && enemyWaters.children[i - k].style.background == 'red') { // MAKE THIS NOT OVERSHADOW
                                    //     placeComputerShips()
                                    //     return computerShips.board
                                    // }
                                    
                                    if (enemyWaters.children[i - k]) enemyWaters.children[i - k].style.background = 'purple'
                                }
                            break;
                        }
                        if (enemyWaters.children[i - 1].dataset.column != 9) enemyWaters.children[i - 1].style.background = 'yellow'
                        if (enemyWaters.children[i + row + 1].dataset.column != 0) enemyWaters.children[i + row + 1].style.background = 'yellow'
                        enemyWaters.children[i + row].style.background = 'red'
                        enemyWaters.children[i + row].dataset.ship = shipArray[0].name
                        
                        
                    }
                }
                computerShips.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])  
            }
        }
    } else {
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let row = 0; row < computerShips.board.length; row++) {
                if (random[0] > 5 && shipArray[0].name == 'Carrier') {
                    placeComputerShips()
                    return computerShips.board
                }                
                
                if (random[0] > 6 && shipArray[0].name == 'Battle Ship') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[0] > 7 && shipArray[0].name == 'Destroyer') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[0] > 7 && shipArray[0].name == 'Submarine') {
                    placeComputerShips()
                    return computerShips.board
                } 
                
                if (random[0] > 8 && shipArray[0].name == 'Patrol Boat') {
                    placeComputerShips()
                    return computerShips.board
                }
                if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                && random[2]) {
                    if (enemyWaters.children[i].style.background == 'red' || enemyWaters.children[i].style.background == 'purple') {
                        console.log('RANDOM WAS TAKEN')
                        placeComputerShips()
                        return computerShips.board
                    }
                    enemyWaters.children[i].style.background = 'yellow'
                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].style.background = 'purple'
                    if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].style.background = 'purple'
                    if (enemyWaters.children[i - 10]) enemyWaters.children[i - 10].style.background = 'purple'
                    if (enemyWaters.children[i - 11]) enemyWaters.children[i - 11].style.background = 'purple'
                    if (enemyWaters.children[i - 9]) enemyWaters.children[i - 9].style.background = 'purple'
                    enemyWaters.children[i].dataset.shot = false;
                    enemyWaters.children[i].dataset.ship = shipArray[0].name
                    
                    // enemyWaters.children[i += 10].dataset.ship = shipArray[0].name 
                    if (enemyWaters.children[i].dataset.ship == 'Carrier') {
                        for (let col = 0; col < 4; col++) {
                            
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'
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
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].style.background == 'yellow' && enemyWaters.children[i + 10].dataset.column == random[1]) {
                                placeComputerShips()
                                return computerShips.board
                            
                            } else enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] && enemyWaters.children[i + 1].style.background != 'yellow'  ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].style.background != 'yellow') enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11] && enemyWaters.children[i + 11].style.background != 'yellow') enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9] && enemyWaters.children[i + 9].style.background != 'yellow') enemyWaters.children[i + 9].style.background = 'purple'
                            
                            
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Destroyer') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].style.background == 'yellow' && enemyWaters.children[i + 10].dataset.column == random[1]) {
                                placeComputerShips()
                                return computerShips.board
                            
                            } else enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] && enemyWaters.children[i + 1].style.background != 'yellow'  ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].style.background != 'yellow') enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11] && enemyWaters.children[i + 11].style.background != 'yellow') enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9] && enemyWaters.children[i + 9].style.background != 'yellow') enemyWaters.children[i + 9].style.background = 'purple'
                            
                            
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Submarine') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].style.background == 'yellow' && enemyWaters.children[i + 10].dataset.column == random[1]) {
                                placeComputerShips()
                                return computerShips.board
                            
                            } else enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] && enemyWaters.children[i + 1].style.background != 'yellow'  ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].style.background != 'yellow') enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11] && enemyWaters.children[i + 11].style.background != 'yellow') enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9] && enemyWaters.children[i + 9].style.background != 'yellow') enemyWaters.children[i + 9].style.background = 'purple' 
                            
                            
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Patrol Boat') {
                        for (let col = 0; col < 1; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].style.background = 'red'

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].style.background == 'yellow' && enemyWaters.children[i + 10].dataset.column == random[1]) {
                                placeComputerShips()
                                return computerShips.board
                            
                            } else if (enemyWaters.children[i + 10]) enemyWaters.children[i + 10].style.background = 'purple'
                            if (enemyWaters.children[i + 1] && enemyWaters.children[i + 1].style.background != 'yellow'  ) enemyWaters.children[i + 1].style.background = 'purple'
                            if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].style.background != 'yellow') enemyWaters.children[i - 1].style.background = 'purple'
                            if (enemyWaters.children[i + 11] && enemyWaters.children[i + 11].style.background != 'yellow') enemyWaters.children[i + 11].style.background = 'purple'
                            if (enemyWaters.children[i + 9] && enemyWaters.children[i + 9].style.background != 'yellow') enemyWaters.children[i + 9].style.background = 'purple'
                            
                            
                        }
                    }
                }

                computerShips.placeVertical(shipArray[0].name, [random[0], random[1]])
            }
        }
    }
    return computerShips.board
}
const clickShipPlacement = event => {
    let nextSibling = event.target.nextElementSibling
    let numberIndex = 1;
    // CHANGE PURPLE BACKGROUNDS INTO A DATASET OF SHIP
    playerShips.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
    if (event.target.style.background == 'purple' || event.target.style.background == 'red') return 
    while (nextSibling && numberIndex !== shipArray[0].length) {
        if (nextSibling.style.background == 'purple') return
        
        numberIndex++
        nextSibling = nextSibling.nextElementSibling
    }
    for (let i = 0; i < allyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            for (let k = 0; k < playerShips.board.length; k++) {
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
                    if (shipZone.children[g - 10] && shipZone.children[g - 10].previousElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].previousElementSibling.style.background = 'purple'
                    if (shipZone.children[g - 10] && shipZone.children[g - 10].nextElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].nextElementSibling.style.background = 'purple'
                    if (shipZone.children[g + 10] ) shipZone.children[g + 10].previousElementSibling.style.background = 'purple'
                    if (shipZone.children[g + 10] && shipZone.children[g + 10].nextElementSibling) shipZone.children[g + 10].nextElementSibling.style.background = 'purple'
                } 
            }
            shipBlocks.children[j].style.background = 'red'
        }
    }
    console.log(computerShips.board, 'Test')
    

    console.log('CHECK', placeComputerShips())
    
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
    shipArray.splice(0, 1)
    


    // let firstIndex = 2
    // let secondIndex = 3
    // let accurateRow;
    // let testRow
    // const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    // console.log('HOVER', hoverMagnet, firstIndex, secondIndex, shipBlocks.lastElementChild)

    // hoverMagnet = false;
    // if (shipBlocks.children[firstIndex].dataset.column < shipBlocks.children[secondIndex].dataset.column && event.target.style.background != 'red' 
    // && enemyWaters.children[Math.floor(Math.random() * enemyWaters.childElementCount)].style.background != 'red' 
    // && !event.target.dataset.antiMagnet && hoverMagnet == false && shipBlocks.children[secondIndex].dataset.antiMagnet == 'undefined') {
    //     if (firstIndex !== 0) {
    //         firstIndex--
    //         secondIndex-- 
    //     } 
    //     console.log('EXECUTES')
    //     placePlayerShips()
        
    // }
    // else return
    // // RECHECK THE CLICKS TO SEE IF IT WORKS
    // for (let i = 0; i < shipZone.children.length; i++) {
        
    //     for(let k = 0; k < shipBlocks.children.length; k++) {
    //         let row = shipBlocks.children[k].dataset.row
    //         let highRow = shipZone.children[i].dataset.row
            
    //         testRow = Number(row)
    //         accurateRow = Number(highRow) + 1
    //         if (shipZone.children[i].style.background !== 'red'  && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
    //         && shipZone.children[i].dataset.row == numbers.indexOf(testRow) + 1 // TRY INDEXOF
    //         && shipZone.children[i].nextElementSibling && shipZone.children[i].previousElementSibling
    //         && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row
    //         && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
    //             console.log('COLORS', shipZone.children[i], testRow, accurateRow, 'Next Sib', shipZone.children[i].nextElementSibling, 'Prev Sib', shipZone.children[i].previousElementSibling)
    //             shipZone.children[i].dataset.antiMagnet = true;
    //             shipZone.children[i].nextElementSibling.dataset.antiMagnet = true;
    //             shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
    //         }

    //         if (shipZone.children[i].style.background !== 'red'  && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
    //         && shipZone.children[i].dataset.row == numbers.indexOf(testRow) - 1 // TRY INDEXOF
    //         && shipZone.children[i].nextElementSibling && shipZone.children[i].previousElementSibling
    //         && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row
    //         && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
    //             console.log('BEFORE COLORS', shipZone.children[i])
    //             shipZone.children[i].dataset.antiMagnet = true;
    //             shipZone.children[i].nextElementSibling.dataset.antiMagnet = true;
    //             shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
    //         }

    //         if (shipZone.children[i].nextElementSibling && shipZone.children[i].nextElementSibling.style.background != 'red'
    //         && shipZone.children[i].dataset.row == testRow && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
    //         && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row) {
    //             console.log('CHECK NEXT SIBLING', shipZone.children[i].nextElementSibling)
    //             shipZone.children[i].nextElementSibling.dataset.antiMagnet = true
    //         // TURN SIBLING CHECKER INTO A FUNCTION THAT RETURNS TRUE/FALSE IF NEAR OTHER SHIPS
    //         } 
            
    //         if (shipZone.children[i].previousElementSibling && shipZone.children[i].style.background != 'red' && shipZone.children[i].previousElementSibling.style.background != 'red'
    //         && shipZone.children[i].dataset.row == testRow && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
    //         && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
    //             console.log('CHECK PREVIOUS SIBLING', shipZone.children[i].previousElementSibling)
    //             shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
    //         } 
    //     }
    // }

    
    // TRY TO USE THE SHIP ZONES CURRENT POSITION

    // for (let i = 0; i < allyWaters.children.length; i++) {
    //     for (let j = 0; j < shipBlocks.children.length; j++) {
    //         if (shipBlocks.children[0].dataset.row == allyWaters.children[i].dataset.row
    //         && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column) {
    //             allyWaters.children[i].style.background = 'red'
    //             allyWaters.children[i].dataset.ship = shipArray[0];
    //             event.target.style.background = 'red'
    //         }

    //         for (let k = 0; k < shipZone.children.length; k++) {
    //             if (shipBlocks.children[0].dataset.row == shipZone.children[k].dataset.row &&
    //             shipBlocks.children[j].dataset.column == shipZone.children[k].dataset.column)  {
    //                 shipZone.children[k].style.background = 'red'
    //                 shipZone.children[k].dataset.ship = shipArray[0]
    //             }
    //         }
    //     }
    // }

    
    // if (shipArray[0] == carrier.shipName) {
    //     shipBlocks.removeChild(shipBlocks.lastElementChild);
    //     shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`
    //     shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
    // } else if (shipArray[0] == battleShip.shipName) {
    //     shipBlocks.removeChild(shipBlocks.lastElementChild);
    //     shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
    // } else if (shipArray[0] == submarine.shipName) shipBlocks.removeChild(shipBlocks.lastElementChild);
    
    // if (shipArray.length !== 1 && shipLengths.length !== 1) {
    //     shipArray.splice(0, 1)
    //     shipLengths.splice(0, 1)
    // }
    // else {
    //     document.querySelector('.contain').style.filter = 'none'
    //     document.querySelector('header').style.filter = 'none'
    //     document.querySelector('.contain-ships').remove();
    // }
}

// const createComputerShips = (shipInfo) => {
//     const randomPlacement = Math.floor(Math.random() * enemyWaters.childElementCount);
//     let previousGrid = enemyWaters.children[randomPlacement].previousElementSibling
//     let nextGrid = enemyWaters.children[randomPlacement].nextElementSibling
//     let j = 0;
//     let shipLength = 0;
//     let testRow;
//     const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


//     let row = enemyWaters.children[randomPlacement].dataset.row

//     testRow = Number(row)
    
    
    
//     if (enemyWaters.children[randomPlacement].style.background != 'red' &&  Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1 <= 10
//     && enemyWaters.children[randomPlacement].dataset.ship != shipArray[0]
//     && !enemyWaters.children[randomPlacement].dataset.antiMagnet && !enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
//     ) {
        
//         enemyWaters.children[randomPlacement].dataset.ship = shipArray[0];
//         enemyWaters.children[randomPlacement].style.background = 'red'
//         enemyWaters.children[randomPlacement].dataset.antiMagnet = 'true'
//         console.log('DID IT ADD?', enemyWaters.children[randomPlacement])
//     } else {
//         console.log('First Else Find array', shipArray, enemyWaters.children[randomPlacement])
//         createComputerShips(shipInfo)
        
//         return
//     }

//     let p = 0;
//     let k = 0;


//     for (let i = 0; i < enemyWaters.children.length; i++) {
//         let nextRandom = enemyWaters.children[i].nextElementSibling
//         let random = enemyWaters.children[i].nextElementSibling
//         let previousRandom = enemyWaters.children[i].previousElementSibling
//         let previous = enemyWaters.children[i].previousElementSibling

        
//         while (j != shipInfo && nextGrid && previousGrid ) {
//             console.log('MINI', enemyWaters.children[randomPlacement], nextGrid, nextGrid.nextElementSibling)

//             if (nextGrid.nextElementSibling && nextGrid.nextElementSibling.style.background != 'red'
//             && enemyWaters.children[randomPlacement].dataset.row == nextGrid.nextElementSibling.dataset.row
//             ) {
//                 console.log('PALE', nextGrid, nextGrid.nextElementSibling)
//                 nextGrid.nextElementSibling.dataset.antiMagnet = 'true'
//                 nextGrid.nextElementSibling.dataset.ship = shipArray[0]
//             } 
            
//             if (enemyWaters.children[randomPlacement].dataset.ship == shipArray[0] && enemyWaters.children[randomPlacement].dataset.row == nextGrid.dataset.row
//             && enemyWaters.children[randomPlacement].dataset.row == previousGrid.dataset.row
//             && enemyWaters.children[randomPlacement].dataset.ship == shipArray[0]
//             ) {
//                 console.log('ENEMY CLONE', previousGrid, nextGrid, nextGrid.nextElementSibling)
//                 nextGrid.style.background = 'red'                                                                             
//                 nextGrid.dataset.antiMagnet = 'true'
//                 previousGrid.dataset.antiMagnet = 'true';
//                 nextGrid.dataset.ship = shipArray[0]
//                 previousGrid.dataset.ship = shipArray[0]
                
//                 j++
//             } else {
//                 console.log('ANGEL FAIL', enemyWaters.children[randomPlacement], nextGrid, shipArray)
//                 enemyWaters.children[randomPlacement].style.background = 'transparent'
//                 enemyWaters.children[randomPlacement].nextElementSibling.style.background = 'transparent'
//                 nextGrid.style.background = 'transparent'
//                 nextGrid.previousElementSibling.style.background = 'transparent'
//                 nextGrid.nextElementSibling.style.background = 'transparent'
//                 delete enemyWaters.children[randomPlacement].dataset.antiMagnet
//                 delete enemyWaters.children[randomPlacement].dataset.ship
//                 delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship
//                 delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
//                 delete nextGrid.dataset.ship
//                 delete nextGrid.previousElementSibling.dataset.antiMagnet
//                 delete nextGrid.previousElementSibling.dataset.ship
//                 delete nextGrid.dataset.antiMagnet
//                 delete nextGrid.nextElementSibling.dataset.ship
//                 delete nextGrid.nextElementSibling.dataset.antiMagnet

//                 createComputerShips(shipInfo)
//                 return
//             } 
            
//             nextGrid.dataset.ship = shipArray[0]
            
//             if (nextGrid.nextElementSibling && enemyWaters.children[randomPlacement].dataset.row == nextGrid.nextElementSibling.dataset.row && nextGrid.nextElementSibling.dataset.ship != shipArray[0]) {
//                 console.log('TITANIC', enemyWaters.children[randomPlacement], nextGrid, nextGrid.nextElementSibling, shipArray)
//                 // THIS PREVENTS IT FROM APPEARING SIDE BY SIDE
                
//                 shipArray.unshift(shipArray[0]) // try removing this
//                 enemyWaters.children[randomPlacement].style.background = 'transparent';
//                 delete enemyWaters.children[randomPlacement].dataset.ship
//                 delete enemyWaters.children[randomPlacement].dataset.antiMagnet
//                 enemyWaters.children[randomPlacement].nextElementSibling.style.background = 'transparent'
//                 delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship
//                 delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
//                 nextGrid.style.background = 'transparent';
//                 // nextGrid.previousElementSibling.style.background = 'transparent'
//                 // delete nextGrid.previousElementSibling.dataset.ship
//                 // delete nextGrid.previousElementSibling.dataset.antiMagnet
//                 delete nextGrid.dataset.ship
//                 delete nextGrid.dataset.antiMagnet


//             }
           

            
//             nextGrid = nextGrid.nextElementSibling

//         }
        

//         if (enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship != shipArray[0]) {
//             console.log('KING MAN', enemyWaters.children[randomPlacement])
//             // CHECK IF THIS IS STILL NEEDED
//             enemyWaters.children[randomPlacement].style.background = 'transparent'
//             delete enemyWaters.children[randomPlacement].dataset.antiMagnet
//             delete enemyWaters.children[randomPlacement].dataset.ship
//             createComputerShips(shipInfo)
//             return
//             // THIS CHECKS TO SEE IF ONLY ONE BLOCK APPEARS
//         }

//         if (enemyWaters.children[i].style.background !== 'red' && enemyWaters.children[i].dataset.row == numbers.indexOf(testRow) + 1
//         && enemyWaters.children[i].dataset.column == enemyWaters.children[randomPlacement].dataset.column
//         && enemyWaters.children[i].dataset.row == random.dataset.row
//         && enemyWaters.children[i].dataset.row == previous.dataset.row
//         && random) {
//             console.log('CLONER', enemyWaters.children[i], enemyWaters.children[i].nextElementSibling, random)
            
//             while (k != shipInfo && random && previous && random.nextElementSibling) {
//                 console.log('UP', random, previous)
//                 if (random.nextElementSibling.style.background == 'red') {
//                     console.log('EXPLODE UP', random, enemyWaters.children[i], enemyWaters.children[randomPlacement])
                    
//                     let nextChildren = enemyWaters.children[randomPlacement].nextElementSibling
//                     while (nextChildren && nextChildren.dataset.ship == enemyWaters.children[randomPlacement].dataset.ship) {
//                         console.log('EXPLODE IS RED', enemyWaters.children[randomPlacement], enemyWaters.children[randomPlacement].nextElementSibling, nextChildren)
                        
//                         nextChildren.style.background = 'transparent'
//                         delete nextChildren.dataset.antiMagnet
//                         delete nextChildren.dataset.ship
                        

//                         if (!nextChildren) createComputerShips(shipInfo)

//                         nextChildren = nextChildren.nextElementSibling
//                     }
//                 } else {
//                     random.dataset.antiMagnet = 'true';
//                     random.previousElementSibling.dataset.antiMagnet = 'true';
//                     random.nextElementSibling.dataset.antiMagnet = 'true';
//                     previous.dataset.antiMagnet = 'true';
//                     random.dataset.ship = shipArray[0]
//                     previous.dataset.ship = shipArray[0]
//                     random.previousElementSibling.dataset.ship = shipArray[0]
//                     random.nextElementSibling.dataset.ship = shipArray[0]
//                 }
                
//                 k++
//                 random = random.nextElementSibling
//             }
//         } 
        
//         if (enemyWaters.children[i].style.background !== 'red' && enemyWaters.children[i].dataset.row == numbers.indexOf(testRow) - 1 
//         && enemyWaters.children[i].dataset.column == enemyWaters.children[randomPlacement].dataset.column
//         && enemyWaters.children[i].dataset.row == nextRandom.dataset.row
//         && enemyWaters.children[i].dataset.row == previousRandom.dataset.row
//         && nextRandom) {
//             while (p != shipInfo && nextRandom && previousRandom) {
//                 console.log('DOWN', nextRandom, previousRandom)
//                 // FIX THE PATROL BOAT TO PREVENT IT FROM BEING PLACED DIAGONALLY
                
//                 if (nextRandom.nextElementSibling.style.background == 'red') {
//                     let nextChildren = enemyWaters.children[randomPlacement].nextElementSibling
                    
//                     console.log('EXPLODE DOWN', nextRandom, enemyWaters.children[i], enemyWaters.children[randomPlacement], nextChildren)
                    
//                     while (nextChildren && nextChildren.dataset.ship == enemyWaters.children[randomPlacement].dataset.ship) {
//                         console.log('EXPLODE IS RED', enemyWaters.children[randomPlacement], enemyWaters.children[randomPlacement].nextElementSibling, nextChildren)

//                         nextChildren.style.background = 'transparent'
//                         delete nextChildren.dataset.antiMagnet
//                         delete nextChildren.dataset.ship
//                         delete enemyWaters.children[randomPlacement].previousElementSibling.dataset.ship
//                         delete enemyWaters.children[randomPlacement].previousElementSibling.dataset.antiMagnet


//                         if (!nextChildren) createComputerShips(shipInfo)

//                         nextChildren = nextChildren.nextElementSibling
//                     }
//                 } else {
//                     nextRandom.dataset.antiMagnet = 'true'
//                     nextRandom.previousElementSibling.dataset.antiMagnet = 'true';
//                     nextRandom.nextElementSibling.dataset.antiMagnet = 'true'
//                     previousRandom.dataset.antiMagnet = 'true';
                    
//                     nextRandom.dataset.ship = shipArray[0]
//                     nextRandom.previousElementSibling.dataset.ship = shipArray[0]
//                     nextRandom.nextElementSibling.dataset.ship = shipArray[0]
//                     previousRandom.dataset.ship = shipArray[0]
//                 }
                
//                 p++
//                 nextRandom = nextRandom.nextElementSibling
//             }
//         } 
//     }
// }

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
    const allyBoardCoordinates = getGridPosition(allyWaters, getElementIndex(randomSelectionCheck()));
    // CHECK WHY THE ALLY BOARD MAKES IT NOT WORK
    
    console.log('CHECK ARRAY', playerShips.checkShipConditions())
    // console.log('SECOND ARRAY', player.attackPlayer('Human', [enemyBoardCoordinates.row, enemyBoardCoordinates.column]), playerShips.board, playerShips.shipAttacks, playerShips.missedBlasts)
    // console.log('COMPUTER vs HUMAN ARRAY', computer.attackPlayer('Human', [allyBoardCoordinates.row, allyBoardCoordinates.column]), computerShips.board, computerShips.shipAttacks)
    console.log('HUMAN VS COMPUTER ARRAY', player.attackPlayer('Human', [enemyBoardCoordinates.row, enemyBoardCoordinates.column]), computerShips.board)
    // console.log('CHECK IF WORKS', computerShips.receiveAttack([enemyBoardCoordinates.row, enemyBoardCoordinates.column]))
    if (playerShips.checkShipConditions() == true) {
        alert('PLAYER WINNER')

    } else if (computerShips.checkShipConditions() == true) {
        alert('COMPUTER WINNER')

    }
    
    
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

    

    console.log('ENEMY', enemyBoardCoordinates, enemyBoardCoordinates.row) // USE TO ATTACK ENEMY
    console.log('ALLY', allyBoardCoordinates) // USE FOR COMPUTER TO ATTACK
}

const randomSelectionCheck = () => { // ALLY TARGETS
    const randomSelection = allyWaters.children[Math.floor(Math.random() * allyWaters.children.length)]
    // WHY DID IT WORK TO HERE BUT NOT WHEN PASSING IT INTO A FUNCTION 
    console.log('RANDOM', randomSelection, randomSelection.dataset.shot)
       
    if (array.indexOf(randomSelection.dataset.row + randomSelection.dataset.column) == -1 && randomSelection) {
        array.push(randomSelection.dataset.row + randomSelection.dataset.column)
        randomSelection.innerHTML = `<i class="fas fa-circle"></i>`;
        randomSelection.dataset.shot = true;

        for (let i = 0; i < allyWaters.children.length; i++) {
            if (randomSelection.dataset.row == allyWaters.children[i].dataset.row && randomSelection.dataset.column == allyWaters.children[i].dataset.column
            && allyWaters.children[i].dataset.ship) {
                allyWaters.children[i].style.background = 'purple'
            }
        }

        return randomSelection
    } else {
        randomSelectionCheck()
        return randomSelection
    }
}

const hoverOutGridCell = (event) => {
    if (event.target.dataset.ship) return
    else event.target.style.background = 'transparent'
}

window.addEventListener('load', loadGridBlocks)

console.log(rice)

export default rice