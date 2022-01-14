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
const array = [];

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
    let shipArrayInfo = shipArray[0]

    shipBlocks.style.display = 'grid'
    shipBlocks.style.left = (event.target.offsetLeft) + 'px'
    shipBlocks.style.top = (event.target.offsetTop) + 'px'
    shipBlocks.lastElementChild.style.border = 'transparent'
    

    console.log('Previos Ship placement', event.target.previousElementSibling)// WORKS
    const leftPos = (element) => (element.offsetLeft) 
    const topPos = (element) => (element.offsetTop) + 'px'
    

    if (shipBlocks.children[0] !== undefined) shipBlocks.children[0].dataset.row = event.target.dataset.row
    else return
    
    for (let i = 0; i < shipZone.children.length; i++) {
        for (let k = 0; k < shipBlocks.children.length; k++) {
            shipBlocks.children[k].dataset.ship = shipArrayInfo

            if (shipZone.children[i].style.background == 'red' && shipBlocks.children[k]
            ) {
                console.log('Next ship placement', shipBlocks.children[k], shipZone.children[i], leftPos(shipBlocks.children[k]), shipZone.children[i].offsetLeft)
                // Incomplete
                
            }

            if (shipZone.children[i].dataset.row == shipBlocks.children[k].dataset.row &&
            shipZone.children[i].dataset.ship == shipArrayInfo) {
                // CHANGE THIS TO SOMETHING THAT CAN EQUAL TO THE LENGTH OF THE SHIPBLOCK
                console.log('Testy')
                shipZone.children[i].style.background = 'red'
            }
            
        }
    }

    for (let i = 0; i < shipBlocks.children.length; i++) {
        let nextGridCell = event.target.nextElementSibling
        if (!shipBlocks.children[i].dataset.row) shipBlocks.children[i].dataset.row = event.target.dataset.row
        else shipBlocks.children[i].dataset.row = event.target.dataset.row
        
        while (nextGridCell.dataset.row == shipBlocks.children[i].dataset.row ) {
            if (!shipBlocks.children[i].dataset.column) shipBlocks.children[i].dataset.column = event.target.dataset.column
            else { 
                shipBlocks.children[0].dataset.column = event.target.dataset.column
                shipBlocks.children[i].dataset.column = nextGridCell.dataset.column
                console.log('Check sibling', nextGridCell)

            }
            nextGridCell = nextGridCell.nextElementSibling
            
        }
    }
    event.target.dataset.column--
    
    
    console.log('Outside icnrease')
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
    event.target.dataset.column++ // CHECK THIS
    
    console.log('Hover array', shipArray)
}

const clickShipPlacement = event => {
    if (shipBlocks.lastElementChild.dataset.column < 10 && event.target.style.background != 'red' 
    && enemyWaters.children[Math.floor(Math.random() * enemyWaters.childElementCount)].style.background != 'red' ) placePlayerShips()
    else return

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
                shipBlocks.children[j].dataset.column == shipZone.children[k].dataset.column )  {
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
    
    if (shipArray.length !== 1) shipArray.splice(0, 1)
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

    
    if (enemyWaters.children[randomPlacement].style.background != 'red' &&  Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1 <= 10
    && enemyWaters.children[randomPlacement].dataset.ship != shipArray[0]
    ) {
        enemyWaters.children[randomPlacement].dataset.ship = shipArray[0];
        
    } else {
        console.log('First Else Find array', shipArray)
        createComputerShips(shipInfo)
        
        return
    }
    console.log('Check placement array', shipArray)

    
    // TRY TO MAKE RANDOM PLACEMENTS ALLOW SPACE FOR LENGTH OF SHIP TO BE PLACED
    
        // IFGURE OUT WHY IT SOMETIMES DOESNT CREATE THE AI SHIP
        console.log('Inner sibling', shipLength, Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1, shipInfo + 1)
        while (j != shipInfo && nextGrid) {
            console.log('Sibling', nextGrid)
            if (nextGrid.style.background != 'red' && enemyWaters.children[randomPlacement].dataset.row == nextGrid.dataset.row
            ) {
                nextGrid.style.background = 'red'
                j++
            } else {
                console.log('Second else find array', shipArray)
                createComputerShips(shipInfo)
                return
            }
            
            nextGrid.dataset.ship = shipArray[0]
            
            nextGrid = nextGrid.nextElementSibling
            
        }
    for (let i = 0; i < enemyWaters.children.length; i++) {

        if (enemyWaters.children[i].dataset.ship == shipArray[0] 
        ) {
            enemyWaters.children[i].style.background = 'red'
            console.log('Check ships', enemyWaters.children[i])
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
    console.log('Find', event.target.innerText) 


    
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