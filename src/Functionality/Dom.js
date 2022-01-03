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

        enemyDivs.dataset.row = getGridPosition(enemyWaters, getElementIndex(enemyDivs)).row;
        enemyDivs.dataset.column = getGridPosition(enemyWaters, getElementIndex(enemyDivs)).column;
        allyDivs.dataset.row = getGridPosition(allyWaters, getElementIndex(allyDivs)).row;
        allyDivs.dataset.column = getGridPosition(allyWaters, getElementIndex(allyDivs)).column;
        shipDivs.dataset.row = getGridPosition(shipZone, getElementIndex(shipDivs)).row;
        shipDivs.dataset.column = getGridPosition(shipZone, getElementIndex(shipDivs)).column;
        allyDivs.dataset.shot = false;
    }
}

const hoverShipPlacements = event => {
    
    shipBlocks.style.display = 'grid'
    shipBlocks.style.left = (event.target.offsetLeft) + 'px' // WORKS
    shipBlocks.style.top = (event.target.offsetTop) + 'px' // WORKS

    
}

const clickShipPlacement = event => {
    const elementSibling = event.target

    console.log('Checks', elementSibling.dataset.row)
    // CHECK THE CLICKED BLOCK BASED OFF THE ROW OR COLUMN
    for (let i = 0; i < enemyWaters.children.length; i++) {

        console.log('Check length', enemyWaters.children.length)
        if (elementSibling.dataset.row === enemyWaters.children[i].dataset.row
        && enemyWaters.children[i].dataset.column >= elementSibling.dataset.column
        && enemyWaters.children[i].dataset.column < carrier.length) { // WORKS
            
            console.log('Find rows', enemyWaters.children[i].dataset.row)
            console.log('First', enemyWaters.children[i], i)
            console.log('Find clicked row', elementSibling.dataset.row, elementSibling.dataset.column)
            enemyWaters.children[i].style.background = 'red'
        } else if (enemyWaters.children[i].dataset.column > carrier.length) {
            enemyWaters.children[i].style.background = 'red'
        }

        // TRY USING THE ELEMENT SIBLINGS OF THE SHIP THAT WILL BE PLACED

    }

    
}

const hoverOutShipPlacements = event => {
    shipBlocks.style.display = 'none'
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