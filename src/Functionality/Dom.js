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
                else if (nextInnerGridCell.dataset.column == 0) shipBlocks.lastElementChild.dataset.column = 9;
                
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

    if (direction[0] == 'Horizontal') {
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let col = 0; col < computerShips.board.length; col++) {
                if (random[1] > 5 && shipArray[0].name == 'Carrier') {
                    placeComputerShips()
                    return computerShips.board
                }                
                for (let row = 0; row < shipArray[0].length; row++) {
                    if (random[1] > 6 && shipArray[0].name == 'Battle Ship') {
                        placeComputerShips()
                        return computerShips.board
                    } 
                    
                    if (random[1] > 7 && shipArray[0].name == 'Destroyer') {
                        placeComputerShips()
                        return computerShips.board
                    } 
                    
                    if (random[1] > 7 && shipArray[0].name == 'Submarine') {
                        placeComputerShips()
                        return computerShips.board
                    } 
                    
                    if (random[1] > 8 && shipArray[0].name == 'Patrol Boat') {
                        placeComputerShips()
                        return computerShips.board
                    }

                    // if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1] && enemyWaters.children[i].dataset.ship != shipArray[0].name) {
                    //     placeComputerShips()
                    //     return computerShips.board
                    // }
                
                    if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                    && random[2]) {
                        enemyWaters.children[i + row].style.background = 'red'
                        enemyWaters.children[i + row].dataset.ship = shipArray[0].name
                    }
                }
                computerShips.placeHorizontal(shipArray[0].name, shipArray[0].length, [random[0], random[1]])
                // for (let row = 0; row < shipArray[0].length; row++) {
                    
                //     if (random[1] > 5) {
                //         placeComputerShips()
                //         return computerShips.board
                //     }                
                    
                //     if (random[1] > 6 && random[2] ) {
                //         placeComputerShips()
                //         return computerShips.board
                //     } 
                    
                //     if (random[1] > 7 && random[2] ) {
                //         placeComputerShips()
                //         return computerShips.board
                //     } 
                    
                //     if (random[1] > 7 && random[2] ) {
                //         placeComputerShips()
                //         return computerShips.board
                //     } 
                    
                //     if (random[1] > 8 && random[2] ) {
                //         placeComputerShips()
                //         return computerShips.board
                //     } 
                        
                    
                //     if (computerShips.board[col][1] == random[1] && computerShips.board[col + row][0] == random[0]) {
                //         computerShips.board[col + row][2] = {name: shipArray[0].name, shot: false}   
                //         if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                //         && random[2]) {
                //             enemyWaters.children[i + row].style.background = 'red'
                //         }
                //     }
                // } 
                 
            }
        }
        
    } else {

    }
    return computerShips.board
}
const clickShipPlacement = event => {
    
    playerShips.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
    
    
    for (let i = 0; i < allyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            for (let k = 0; k < playerShips.board.length; k++) {
                // if (playerShips.board[k])
                if (allyWaters.children[i].dataset.row == shipBlocks.children[j].dataset.row 
                && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column) {
                    allyWaters.children[i].style.background = 'red'
                }
            }
            for (let g = 0; g < shipZone.children.length; g++) {
                if (shipBlocks.children[j].dataset.row == shipZone.children[g].dataset.row &&
                    shipBlocks.children[j].dataset.column == shipZone.children[g].dataset.column)  {
                    shipZone.children[g].style.background = 'red'
                    
                    // shipZone.children[g].dataset.ship = shipArray[0]
                    // event.target.style.background = 'red'
                    
                }
            }
        }
    }
    console.log(computerShips.board, 'Test')
    
    // PUT COMPUTER SHIP PLACEMENT FUNCTION HERE
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
    }

    if (shipArray[0].name == 'Patrol Boat') {
        document.querySelector('.contain-ships').remove()
        document.querySelector('.contain').style.filter = 'none'
        document.querySelector('header').style.filter = 'none'
    }
    else shipArray.splice(0, 1)
    


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

// const placePlayerShips = () => {
//     switch (shipArray[0]) {
//         case carrier.shipName:
//             console.log('Carrier works');
//             createComputerShips(carrier.length - 1)

//             break;
//         case battleShip.shipName:
//             console.log('Battleship works');
//             shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
//             createComputerShips(battleShip.length - 1)

//             break;
//         case destroyer.shipName:
//             console.log('Destroyer works');
//             shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
//             createComputerShips(destroyer.length - 1)

//             break;
//         case submarine.shipName:
//             console.log('Submarine works');
//             shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
//             shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`
//             createComputerShips(submarine.length - 1)

//             break;
//         case patrolBoat.shipName:
//             console.log('Patrol Boat');
            
//             createComputerShips(patrolBoat.length - 1)

//             break;
//     }
// }

const createComputerShips = (shipInfo) => {
    const randomPlacement = Math.floor(Math.random() * enemyWaters.childElementCount);
    let previousGrid = enemyWaters.children[randomPlacement].previousElementSibling
    let nextGrid = enemyWaters.children[randomPlacement].nextElementSibling
    let j = 0;
    let shipLength = 0;
    let testRow;
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


    let row = enemyWaters.children[randomPlacement].dataset.row

    testRow = Number(row)
    
    
    
    if (enemyWaters.children[randomPlacement].style.background != 'red' &&  Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1 <= 10
    && enemyWaters.children[randomPlacement].dataset.ship != shipArray[0]
    && !enemyWaters.children[randomPlacement].dataset.antiMagnet && !enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
    ) {
        
        enemyWaters.children[randomPlacement].dataset.ship = shipArray[0];
        enemyWaters.children[randomPlacement].style.background = 'red'
        enemyWaters.children[randomPlacement].dataset.antiMagnet = 'true'
        console.log('DID IT ADD?', enemyWaters.children[randomPlacement])
    } else {
        console.log('First Else Find array', shipArray, enemyWaters.children[randomPlacement])
        createComputerShips(shipInfo)
        
        return
    }

    let p = 0;
    let k = 0;


    for (let i = 0; i < enemyWaters.children.length; i++) {
        let nextRandom = enemyWaters.children[i].nextElementSibling
        let random = enemyWaters.children[i].nextElementSibling
        let previousRandom = enemyWaters.children[i].previousElementSibling
        let previous = enemyWaters.children[i].previousElementSibling

        
        while (j != shipInfo && nextGrid && previousGrid ) {
            console.log('MINI', enemyWaters.children[randomPlacement], nextGrid, nextGrid.nextElementSibling)

            if (nextGrid.nextElementSibling && nextGrid.nextElementSibling.style.background != 'red'
            && enemyWaters.children[randomPlacement].dataset.row == nextGrid.nextElementSibling.dataset.row
            ) {
                console.log('PALE', nextGrid, nextGrid.nextElementSibling)
                nextGrid.nextElementSibling.dataset.antiMagnet = 'true'
                nextGrid.nextElementSibling.dataset.ship = shipArray[0]
            } 
            
            if (enemyWaters.children[randomPlacement].dataset.ship == shipArray[0] && enemyWaters.children[randomPlacement].dataset.row == nextGrid.dataset.row
            && enemyWaters.children[randomPlacement].dataset.row == previousGrid.dataset.row
            && enemyWaters.children[randomPlacement].dataset.ship == shipArray[0]
            ) {
                console.log('ENEMY CLONE', previousGrid, nextGrid, nextGrid.nextElementSibling)
                nextGrid.style.background = 'red'                                                                             
                nextGrid.dataset.antiMagnet = 'true'
                previousGrid.dataset.antiMagnet = 'true';
                nextGrid.dataset.ship = shipArray[0]
                previousGrid.dataset.ship = shipArray[0]
                
                j++
            } else {
                console.log('ANGEL FAIL', enemyWaters.children[randomPlacement], nextGrid, shipArray)
                enemyWaters.children[randomPlacement].style.background = 'transparent'
                enemyWaters.children[randomPlacement].nextElementSibling.style.background = 'transparent'
                nextGrid.style.background = 'transparent'
                nextGrid.previousElementSibling.style.background = 'transparent'
                nextGrid.nextElementSibling.style.background = 'transparent'
                delete enemyWaters.children[randomPlacement].dataset.antiMagnet
                delete enemyWaters.children[randomPlacement].dataset.ship
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
                delete nextGrid.dataset.ship
                delete nextGrid.previousElementSibling.dataset.antiMagnet
                delete nextGrid.previousElementSibling.dataset.ship
                delete nextGrid.dataset.antiMagnet
                delete nextGrid.nextElementSibling.dataset.ship
                delete nextGrid.nextElementSibling.dataset.antiMagnet

                createComputerShips(shipInfo)
                return
            } 
            
            nextGrid.dataset.ship = shipArray[0]
            
            if (nextGrid.nextElementSibling && enemyWaters.children[randomPlacement].dataset.row == nextGrid.nextElementSibling.dataset.row && nextGrid.nextElementSibling.dataset.ship != shipArray[0]) {
                console.log('TITANIC', enemyWaters.children[randomPlacement], nextGrid, nextGrid.nextElementSibling, shipArray)
                // THIS PREVENTS IT FROM APPEARING SIDE BY SIDE
                
                shipArray.unshift(shipArray[0]) // try removing this
                enemyWaters.children[randomPlacement].style.background = 'transparent';
                delete enemyWaters.children[randomPlacement].dataset.ship
                delete enemyWaters.children[randomPlacement].dataset.antiMagnet
                enemyWaters.children[randomPlacement].nextElementSibling.style.background = 'transparent'
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
                nextGrid.style.background = 'transparent';
                // nextGrid.previousElementSibling.style.background = 'transparent'
                // delete nextGrid.previousElementSibling.dataset.ship
                // delete nextGrid.previousElementSibling.dataset.antiMagnet
                delete nextGrid.dataset.ship
                delete nextGrid.dataset.antiMagnet


            }
           

            
            nextGrid = nextGrid.nextElementSibling

        }
        

        if (enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship != shipArray[0]) {
            console.log('KING MAN', enemyWaters.children[randomPlacement])
            // CHECK IF THIS IS STILL NEEDED
            enemyWaters.children[randomPlacement].style.background = 'transparent'
            delete enemyWaters.children[randomPlacement].dataset.antiMagnet
            delete enemyWaters.children[randomPlacement].dataset.ship
            createComputerShips(shipInfo)
            return
            // THIS CHECKS TO SEE IF ONLY ONE BLOCK APPEARS
        }

        if (enemyWaters.children[i].style.background !== 'red' && enemyWaters.children[i].dataset.row == numbers.indexOf(testRow) + 1
        && enemyWaters.children[i].dataset.column == enemyWaters.children[randomPlacement].dataset.column
        && enemyWaters.children[i].dataset.row == random.dataset.row
        && enemyWaters.children[i].dataset.row == previous.dataset.row
        && random) {
            console.log('CLONER', enemyWaters.children[i], enemyWaters.children[i].nextElementSibling, random)
            
            while (k != shipInfo && random && previous && random.nextElementSibling) {
                console.log('UP', random, previous)
                if (random.nextElementSibling.style.background == 'red') {
                    console.log('EXPLODE UP', random, enemyWaters.children[i], enemyWaters.children[randomPlacement])
                    
                    let nextChildren = enemyWaters.children[randomPlacement].nextElementSibling
                    while (nextChildren && nextChildren.dataset.ship == enemyWaters.children[randomPlacement].dataset.ship) {
                        console.log('EXPLODE IS RED', enemyWaters.children[randomPlacement], enemyWaters.children[randomPlacement].nextElementSibling, nextChildren)
                        
                        nextChildren.style.background = 'transparent'
                        delete nextChildren.dataset.antiMagnet
                        delete nextChildren.dataset.ship
                        

                        if (!nextChildren) createComputerShips(shipInfo)

                        nextChildren = nextChildren.nextElementSibling
                    }
                } else {
                    random.dataset.antiMagnet = 'true';
                    random.previousElementSibling.dataset.antiMagnet = 'true';
                    random.nextElementSibling.dataset.antiMagnet = 'true';
                    previous.dataset.antiMagnet = 'true';
                    random.dataset.ship = shipArray[0]
                    previous.dataset.ship = shipArray[0]
                    random.previousElementSibling.dataset.ship = shipArray[0]
                    random.nextElementSibling.dataset.ship = shipArray[0]
                }
                
                k++
                random = random.nextElementSibling
            }
        } 
        
        if (enemyWaters.children[i].style.background !== 'red' && enemyWaters.children[i].dataset.row == numbers.indexOf(testRow) - 1 
        && enemyWaters.children[i].dataset.column == enemyWaters.children[randomPlacement].dataset.column
        && enemyWaters.children[i].dataset.row == nextRandom.dataset.row
        && enemyWaters.children[i].dataset.row == previousRandom.dataset.row
        && nextRandom) {
            while (p != shipInfo && nextRandom && previousRandom) {
                console.log('DOWN', nextRandom, previousRandom)
                // FIX THE PATROL BOAT TO PREVENT IT FROM BEING PLACED DIAGONALLY
                
                if (nextRandom.nextElementSibling.style.background == 'red') {
                    let nextChildren = enemyWaters.children[randomPlacement].nextElementSibling
                    
                    console.log('EXPLODE DOWN', nextRandom, enemyWaters.children[i], enemyWaters.children[randomPlacement], nextChildren)
                    
                    while (nextChildren && nextChildren.dataset.ship == enemyWaters.children[randomPlacement].dataset.ship) {
                        console.log('EXPLODE IS RED', enemyWaters.children[randomPlacement], enemyWaters.children[randomPlacement].nextElementSibling, nextChildren)

                        nextChildren.style.background = 'transparent'
                        delete nextChildren.dataset.antiMagnet
                        delete nextChildren.dataset.ship
                        delete enemyWaters.children[randomPlacement].previousElementSibling.dataset.ship
                        delete enemyWaters.children[randomPlacement].previousElementSibling.dataset.antiMagnet


                        if (!nextChildren) createComputerShips(shipInfo)

                        nextChildren = nextChildren.nextElementSibling
                    }
                } else {
                    nextRandom.dataset.antiMagnet = 'true'
                    nextRandom.previousElementSibling.dataset.antiMagnet = 'true';
                    nextRandom.nextElementSibling.dataset.antiMagnet = 'true'
                    previousRandom.dataset.antiMagnet = 'true';
                    
                    nextRandom.dataset.ship = shipArray[0]
                    nextRandom.previousElementSibling.dataset.ship = shipArray[0]
                    nextRandom.nextElementSibling.dataset.ship = shipArray[0]
                    previousRandom.dataset.ship = shipArray[0]
                }
                
                p++
                nextRandom = nextRandom.nextElementSibling
            }
        } 
    }
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
    const random = computerShips.board[Math.floor(Math.random() * computerShips.board.length)]
    const enemyBoardCoordinates = getGridPosition(enemyWaters, getElementIndex(event.target));
    const allyBoardCoordinates = getGridPosition(allyWaters, getElementIndex(randomSelectionCheck([])));

    event.target.innerHTML = `<i class="fas fa-circle"></i>`
    event.target.style.pointerEvents = 'none'
    event.target.style.cursor = 'none'

    // player.attackPlayer('Human', [enemyBoardCoordinates.row, enemyBoardCoordinates.column])
    // computer.attackPlayer('Computer', [allyBoardCoordinates.row, allyBoardCoordinates.column])
    
    for (let i = 0; i < enemyWaters.children.length; i++) {
        for (let k = 0; k < allyWaters.children.length; k++) {
            if (event.target.dataset.row == enemyBoardCoordinates.row && event.target.dataset.column == enemyBoardCoordinates.column) {
                event.target.style.background = 'yellow'
                
            } else if (allyWaters.children[k].dataset.row == allyBoardCoordinates.row && allyWaters.children[k].dataset.column == allyBoardCoordinates.column) {
                allyWaters.children[k].style.background = 'purple'
                console.log('NEW ENEMY', allyWaters.children[k])
            }
        }
    }

    console.log('ENEMY', enemyBoardCoordinates, enemyBoardCoordinates.row) // USE TO ATTACK ENEMY
    console.log('ALLY', allyBoardCoordinates) // USE FOR COMPUTER TO ATTACK
}

const randomSelectionCheck = (array) => { // ALLY TARGETS
    const randomSelection = allyWaters.children[Math.floor(Math.random() * allyWaters.children.length)]

    
    randomSelection.innerHTML = `<i class="fas fa-circle"></i>`
    randomSelection.dataset.shot = true
    array.push(randomSelection.dataset.row, randomSelection.dataset.column)
    console.log('Array', randomSelection.childNodes[0], randomSelection.childNodes[0].className === `fas fa-circle`)
    console.log(array)
    return randomSelection
    
}

const hoverOutGridCell = (event) => event.target.style.background = 'transparent'

window.addEventListener('load', loadGridBlocks)


console.log(rice)

export default rice