import GameBoard from './GameBoard'
import Player from './Player'
import { ship, carrier, battleShip, destroyer, submarine, patrolBoat } from './Ship'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters');
const allyWaters = document.querySelector('.allied-waters');
const shipZone = document.querySelector('.ship-zone');
const dropZone = document.querySelector('.zone');
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
        
        
        enemyWaters.append(enemyDivs)
        allyDivs.classList.add('grid-ally');
        allyWaters.append(allyDivs);
        enemyDivs.style.cursor = 'pointer'
        shipZone.append(shipDivs)

        enemyDivs.dataset.row = getGridPosition(enemyWaters, getElementIndex(enemyDivs)).row;
        enemyDivs.dataset.column = getGridPosition(enemyWaters, getElementIndex(enemyDivs)).column;
        allyDivs.dataset.row = getGridPosition(allyWaters, getElementIndex(allyDivs)).row;
        allyDivs.dataset.column = getGridPosition(allyWaters, getElementIndex(allyDivs)).column;
        allyDivs.dataset.shot = false;
    }
}

const dropDownShips = (event) => {
    console.log(event.currentTarget)
    event.currentTarget.style.opacity = 1
}
document.querySelector('.carrier').addEventListener('ondragstart', dropDownShips)

const allowDrop = (event) => {
    console.log(event)
    event.preventDefault()
}
const drop = (event) => {
    console.log(event)
    event.preventDefault()
    event.target.append(document)
}
dropZone.addEventListener('ondragover', allowDrop)
dropZone.addEventListener('ondrop', drop)

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
    const shipBlocks = document.querySelector('.ship-block');

    event.target.style.background = '#3232';
    ship.hit(Number(event.target.innerText)) // Not sure what this is, check later
    console.log('Find', event.target.innerText) 


    
    const logPositions = getGridPosition(enemyWaters, getElementIndex(event.target))

    
    shipBlocks.style.left = (event.target.offsetLeft) + 'px' // WORKS
    shipBlocks.style.top = (event.target.offsetTop) + 'px' // WORKS

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