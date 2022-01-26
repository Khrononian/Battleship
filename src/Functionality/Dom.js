import GameBoard from './GameBoard'
import Player from './Player'
import { ship, carrier, battleShip, destroyer, submarine, patrolBoat } from './Ship'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters');
const allyWaters = document.querySelector('.allied-waters');
const shipZone = document.querySelector('.ship-zone');
const shipBlocks = document.querySelector('.ship-block');
const getShipPositions = GameBoard()
const getPlayerType = Player()
const shipArray = ['Carrier', 'Battle Ship', 'Destroyer', 'Submarine', 'Patrol Boat']
const shipLengths = [carrier.length, battleShip.length, destroyer.length, submarine.length, patrolBoat.length]
const array = [];
let hoverMagnet = false

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
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let shipArrayInfo = shipArray[0]
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
                shipBlocks.children[upper].dataset.antiMagnet = nextInnerGridCell.dataset.antiMagnet
                if (shipBlocks.children.length > 3) shipBlocks.lastElementChild.dataset.antiMagnet = 'undefined'
                else {
                    shipBlocks.lastElementChild.dataset.antiMagnet = 'undefined'
                    hoverMagnet = false
                }
                
                if (!shipBlocks.children[upper].dataset.antiMagnet || shipBlocks.children[upper].dataset.antiMagnet == 'undefined' || !event.target.dataset.antiMagnet ){
                    hoverMagnet = false
                    
                }
                else {
                    console.log('TRUTHY', shipBlocks[upper], event.target)
                    
                    
                }

                console.log('Check children', nextInnerGridCell, shipBlocks.children[upper], shipBlocks.lastElementChild.dataset.column)
                console.log('Exit', nextInnerGridCell, shipBlocks.children[upper], hoverMagnet )
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
    // SHIP BLOCKS INCREASE WHEN HOVERING
    // TRY TO USE COORDINATES TO PREVENT NEIGHBOR SHIPS
    for (let i = 0; i < shipBlocks.children.length; i++) {
        if (event.target.dataset.column !== -1) {

        }
        else return
    }
}
let firstIndex = 2
let secondIndex = 3

const clickShipPlacement = event => {
    let accurateRow;
    let testRow
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    console.log('HOVER', hoverMagnet, firstIndex, secondIndex, shipBlocks.lastElementChild)

    hoverMagnet = false;
    if (shipBlocks.children[firstIndex].dataset.column < shipBlocks.children[secondIndex].dataset.column && event.target.style.background != 'red' 
    && enemyWaters.children[Math.floor(Math.random() * enemyWaters.childElementCount)].style.background != 'red' 
    && !event.target.dataset.antiMagnet && hoverMagnet == false && shipBlocks.children[secondIndex].dataset.antiMagnet == 'undefined') {
        if (firstIndex !== 0) {
            firstIndex--
            secondIndex-- 
        } 
        console.log('EXECUTES')
        placePlayerShips()
        
    }
    else return
    // RECHECK THE CLICKS TO SEE IF IT WORKS
    for (let i = 0; i < shipZone.children.length; i++) {
        
        for(let k = 0; k < shipBlocks.children.length; k++) {
            let row = shipBlocks.children[k].dataset.row
            let highRow = shipZone.children[i].dataset.row
            
            testRow = Number(row)
            accurateRow = Number(highRow) + 1
            if (shipZone.children[i].style.background !== 'red'  && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
            && shipZone.children[i].dataset.row == numbers.indexOf(testRow) + 1 // TRY INDEXOF
            && shipZone.children[i].nextElementSibling && shipZone.children[i].previousElementSibling
            && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row
            && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
                console.log('COLORS', shipZone.children[i], testRow, accurateRow, 'Next Sib', shipZone.children[i].nextElementSibling, 'Prev Sib', shipZone.children[i].previousElementSibling)
                shipZone.children[i].dataset.antiMagnet = true;
                shipZone.children[i].nextElementSibling.dataset.antiMagnet = true;
                shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
            }

            if (shipZone.children[i].style.background !== 'red'  && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
            && shipZone.children[i].dataset.row == numbers.indexOf(testRow) - 1 // TRY INDEXOF
            && shipZone.children[i].nextElementSibling && shipZone.children[i].previousElementSibling
            && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row
            && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
                console.log('BEFORE COLORS', shipZone.children[i])
                shipZone.children[i].dataset.antiMagnet = true;
                shipZone.children[i].nextElementSibling.dataset.antiMagnet = true;
                shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
            }

            if (shipZone.children[i].nextElementSibling && shipZone.children[i].nextElementSibling.style.background != 'red'
            && shipZone.children[i].dataset.row == testRow && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
            && shipZone.children[i].nextElementSibling.dataset.row == shipZone.children[i].dataset.row) {
                console.log('CHECK NEXT SIBLING', shipZone.children[i].nextElementSibling)
                shipZone.children[i].nextElementSibling.dataset.antiMagnet = true
            // TURN SIBLING CHECKER INTO A FUNCTION THAT RETURNS TRUE/FALSE IF NEAR OTHER SHIPS
            } 
            
            if (shipZone.children[i].previousElementSibling && shipZone.children[i].style.background != 'red' && shipZone.children[i].previousElementSibling.style.background != 'red'
            && shipZone.children[i].dataset.row == testRow && shipZone.children[i].dataset.column == shipBlocks.children[k].dataset.column
            && shipZone.children[i].previousElementSibling.dataset.row == shipZone.children[i].dataset.row) {
                console.log('CHECK PREVIOUS SIBLING', shipZone.children[i].previousElementSibling)
                shipZone.children[i].previousElementSibling.dataset.antiMagnet = true;
            } 
        }
    }

    console.log('Find sibling', shipBlocks, shipBlocks.nextElementSibling)
    
    console.log('Find surrounding targets position', event.target.offsetTop)
    // TRY TO USE THE SHIP ZONES CURRENT POSITION

    for (let i = 0; i < allyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            if (shipBlocks.children[0].dataset.row == allyWaters.children[i].dataset.row
            && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column
            ) {
                allyWaters.children[i].style.background = 'red'
                allyWaters.children[i].dataset.ship = shipArray[0];
                event.target.style.background = 'red'
            }

            for (let k = 0; k < shipZone.children.length; k++) {
                if (shipBlocks.children[0].dataset.row == shipZone.children[k].dataset.row &&
                shipBlocks.children[j].dataset.column == shipZone.children[k].dataset.column 
                )  {
                    shipZone.children[k].style.background = 'red'
                    shipZone.children[k].dataset.ship = shipArray[0]
                    
                }
                
            }
        }
    }

    
    if (shipArray[0] == carrier.shipName) {
        shipBlocks.removeChild(shipBlocks.lastElementChild);
        shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`
        shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
    } else if (shipArray[0] == battleShip.shipName) {
        shipBlocks.removeChild(shipBlocks.lastElementChild);
        shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
    } else if (shipArray[0] == submarine.shipName) shipBlocks.removeChild(shipBlocks.lastElementChild);
    
    if (shipArray.length !== 1 && shipLengths.length !== 1) {
        shipArray.splice(0, 1)
        shipLengths.splice(0, 1)
    }
    else {
        document.querySelector('.contain').style.filter = 'none'
        document.querySelector('header').style.filter = 'none'
        document.querySelector('.contain-ships').remove();
    }
}

const placePlayerShips = () => {
    switch (shipArray[0]) {
        case carrier.shipName:
            console.log('Carrier works');
            createComputerShips(carrier.length - 1)

            break;
        case battleShip.shipName:
            console.log('Battleship works');
            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
            createComputerShips(battleShip.length - 1)

            break;
        case destroyer.shipName:
            console.log('Destroyer works');
            shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
            createComputerShips(destroyer.length - 1)

            break;
        case submarine.shipName:
            console.log('Submarine works');
            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
            shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`
            createComputerShips(submarine.length - 1)

            break;
        case patrolBoat.shipName:
            console.log('Patrol Boat');
            
            createComputerShips(patrolBoat.length - 1)

            break;
    }
}

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
                shipArray.unshift(shipArray[0])
                enemyWaters.children[randomPlacement].style.background = 'transparent';
                delete enemyWaters.children[randomPlacement].dataset.ship
                delete enemyWaters.children[randomPlacement].dataset.antiMagnet
                enemyWaters.children[randomPlacement].nextElementSibling.style.background = 'transparent'
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.ship
                delete enemyWaters.children[randomPlacement].nextElementSibling.dataset.antiMagnet
                nextGrid.style.background = 'transparent';
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
                if (random.nextElementSibling.style.background == 'red') console.log('EXPLODE UP', random, enemyWaters.children[i], enemyWaters.children[randomPlacement])
                
                random.dataset.antiMagnet = 'true';
                random.previousElementSibling.dataset.antiMagnet = 'true';
                random.nextElementSibling.dataset.antiMagnet = 'true';
                previous.dataset.antiMagnet = 'true';
                random.dataset.ship = shipArray[0]
                previous.dataset.ship = shipArray[0]
                random.previousElementSibling.dataset.ship = shipArray[0]
                random.nextElementSibling.dataset.ship = shipArray[0]
                
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
                // IT WORKS, NOW MAKE THE FUNCTION CALL ITSELF AGAIN AND REMOVE ALL CORRELATIONS
                // FIX THE PATROL BOAT TO PREVENT IT FROM BEING PLACED DIAGONALLY
                if (nextRandom.nextElementSibling.style.background == 'red') console.log('EXPLODE DOWN', nextRandom, enemyWaters.children[i], enemyWaters.children[randomPlacement])
                nextRandom.dataset.antiMagnet = 'true'
                nextRandom.previousElementSibling.dataset.antiMagnet = 'true';
                nextRandom.nextElementSibling.dataset.antiMagnet = 'true'
                previousRandom.dataset.antiMagnet = 'true';
                
                nextRandom.dataset.ship = shipArray[0]
                nextRandom.previousElementSibling.dataset.ship = shipArray[0]
                nextRandom.nextElementSibling.dataset.ship = shipArray[0]
                previousRandom.dataset.ship = shipArray[0]

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
    ship.hit(Number(event.target.innerText)) // Not sure what this is, check later



    
    const logPositions = getGridPosition(enemyWaters, getElementIndex(event.target))

    

    // USE getShipPositions to find the receivedattacks coordinates

    

    console.log('Find it - enemyWaters', logPositions ) // USE THIS AND GET POSITION FOR CLICKS

    console.log('Random allyWaters', getGridPosition(allyWaters, Math.floor(Math.random() * allyWaters.childElementCount)) )
    
    
    console.log('Find ally coords', allyWaters.children[Math.floor(Math.random() * allyWaters.childElementCount)] )
    
    // ABOVE WORKS, NOW FIND A WAY TO MAKE IT NOT COORDINATE TWICE
}

const clickGridCell = (event) => {
    const enemyBoardCoordinates = getGridPosition(enemyWaters, getElementIndex(event.target));
    const allyBoardCoordinates = getGridPosition(allyWaters, getElementIndex(event.target));
    const findShip = event.target;

    event.target.innerHTML = `<i class="fas fa-circle"></i>`
    event.target.style.pointerEvents = 'none'
    event.target.style.cursor = 'none'

    

    console.log('Check receives', getShipPositions.receiveAttack(getPlayerType.computerAi(randomSelectionCheck(array))))
    console.log('Check enemy coordinates', getShipPositions.receiveAttack(getPlayerType.gamePlayer(enemyBoardCoordinates)))
}

const randomSelectionCheck = (array) => { // ALLY TARGETS
    const randomSelection = Math.floor(Math.random() * allyWaters.childElementCount) 

    if (array.indexOf(randomSelection) === -1 && allyWaters.children[randomSelection]) {
        allyWaters.children[randomSelection].innerHTML = `<i class="fas fa-circle"></i>`
        allyWaters.children[randomSelection].dataset.shot = true
        array.push(randomSelection)
        console.log('Array', allyWaters.children[randomSelection].childNodes[0], allyWaters.children[randomSelection].childNodes[0].className === `fas fa-circle`)
        console.log(array)
        return allyWaters.children[randomSelection]
    } else {
        randomSelectionCheck(array) // CHECK THIS IN FUTURE TO SEE IF THIS STILL WORKS (RECURSION)
        return 
    }
}

const hoverOutGridCell = (event) => event.target.style.background = 'transparent'

window.addEventListener('load', loadGridBlocks)





console.log(rice)

export default rice
export { getGridPosition, enemyWaters, allyWaters }