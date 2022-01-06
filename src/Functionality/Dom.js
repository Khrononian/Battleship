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
    
    shipBlocks.style.display = 'grid'
    shipBlocks.style.left = (event.target.offsetLeft) + 'px'
    shipBlocks.style.top = (event.target.offsetTop) + 'px'

    if (shipBlocks.children[0] !== undefined) shipBlocks.children[0].dataset.row = event.target.dataset.row
    else return
    
    for (let i = 0; i < shipBlocks.children.length; i++) {
        if (!shipBlocks.children[i].dataset.column) shipBlocks.children[i].dataset.column = event.target.dataset.column++
        else if (event.target.dataset.column !== 10 ) shipBlocks.children[i].dataset.column = event.target.dataset.column++
        else return
    }
    event.target.dataset.column--
}

const hoverOutShipPlacements = event => {
    shipBlocks.style.display = 'none'

    for (let i = 0; i < shipBlocks.children.length; i++) {
        if (event.target.dataset.column !== -1) shipBlocks.children[i].dataset.column = event.target.dataset.column--
        else return
    }
    event.target.dataset.column++
}

const clickShipPlacement = event => {
    const elementSibling = event.target
    

    
    switch (shipArray[0]) {
        case carrier.shipName:
            console.log('Carrier works');

            break;
        case battleShip.shipName:
            console.log('Battleship works');
            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'


            break;
        case destroyer.shipName:
            console.log('Destroyer works');
            shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`

            break;
        case submarine.shipName:
            console.log('Submarine works');
            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'
            break;
        case patrolBoat.shipName:
            console.log('Patrol Boat')
            break;
    }
    
    
    for (let i = 0; i < enemyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            console.log('Block position', shipBlocks.children[j], shipBlocks.children[j].offsetTop, shipBlocks.children[j].offsetLeft)

            if (shipBlocks.children[0].dataset.row == enemyWaters.children[i].dataset.row
            && enemyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column) {
                console.log('Found it', enemyWaters.children[i], shipBlocks.children[j].dataset.column, enemyWaters.children[i].dataset.column)
                enemyWaters.children[i].style.background = 'red'
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

    }

    
    shipArray.splice(0, 1)
}

const createShipLength = (length) => {
    for (let i = 0; i < length; i++) {
        const div = createElement('div');
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

    

    console.log('Event hover', event, event.target.nextElementSibling, event.target.offsetTop)
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

    // GET THE ALLIED WATERS COORDINATES
    // USE RANDOMSELECTIONCHECK FUNCTION FOR ALLY COORDINATES
    // USE randomSelectionCheck TO GET THE ROW AND COLUMN
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