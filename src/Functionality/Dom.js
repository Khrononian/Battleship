import GameBoard from './GameBoard'
import { ship } from './Ship'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters')

const loadGridBlocks = () => { // WORK ON GETTING COORDINATES
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');

        div.classList.add('grid-cell')
        div.classList.add('grid-enemy')
        div.addEventListener('mouseover', hoverGridCell)
        div.addEventListener('mouseout', hoverOutGridCell)
        enemyWaters.append(div)


    }
}

const hoverGridCell = (event) => {
    const getShipPositions = GameBoard()

    event.target.style.background = '#3232';
    ship.hit(Number(event.target.innerText))
    console.log('Find', event.target.innerText)
    
    const getGridPosition = index => {
        let offset = Number(window.getComputedStyle(enemyWaters.children[0]).gridColumnStart) - 1

        if (isNaN(offset)) offset = 0;

        const colCount = window.getComputedStyle(enemyWaters).gridTemplateColumns.split(' ').length;
        const rowPosition = Math.floor((index + offset) / colCount);
        const colPosition = (index + offset) % colCount

        return { row: rowPosition, column: colPosition }
    }

    const getElementIndex = (element) => {
        const findElement = element.parentNode.children;
       
        for (let i = 0; i < findElement.length; i++) if (findElement[i] === element) return i
    }
    
    const logPositions = getGridPosition(getElementIndex(event.target))
    console.log('Get position', getShipPositions.receiveAttack(getGridPosition(getElementIndex(event.target))))
    // USE getShipPositions to find the receivedattacks coordinates
    // ALSO, USE EVENT TARGET FOR THE HIT FUNCTION WHEN THE GRID IS CLICKED
    // USE CLICK EVENT TO ADD AN ARRAY OF THE ROW/COLUMNS AND PUSH IT INTO AN EMPTY ARRAY FOR HIT FUNC TO FIND

    console.log('Find it', logPositions )

    
}

console.log('Log', hoverGridCell)

const hoverOutGridCell = (event) => event.target.style.background = 'transparent'

window.addEventListener('load', loadGridBlocks)





console.log(rice)

export default rice