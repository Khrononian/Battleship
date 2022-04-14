import { player, shipArray, shipCopy, array } from './PlaceShips'

const enemyWaters = document.querySelector('.enemy-waters');
const allyWaters = document.querySelector('.allied-waters');
const shipZone = document.querySelector('.ship-zone');
const shipBlocks = document.querySelector('.ship-block');
const restartBtn = document.querySelector('.restart-btn');
const rotateBtn = document.querySelector('.rotate-btn');

const rotateShip = event => {
    if (event.target.id == 'Horizontal') {
        event.target.id = 'Vertical'
        shipBlocks.style.gridTemplateColumns = 'none'
        shipBlocks.lastElementChild.style.borderBottom = 'transparent'

        for (let i = 0; i < shipBlocks.children.length; i++) {
            shipBlocks.children[i].classList.toggle('grid-styles')
            shipBlocks.children[i].classList.toggle('grid-vertical')
            if (shipArray[0].name == 'Carrier') {
                shipBlocks.style.gridTemplateRows = `repeat(5, 1fr)`
                shipBlocks.style.setProperty('width', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('height', 'calc(100% - 50%)') + 'px'
            } else if (shipArray[0].name == 'Battle Ship') {
                shipBlocks.style.gridTemplateRows = `repeat(4, 1fr)`
                shipBlocks.style.setProperty('width', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('height', 'calc(100% - 60%)') + 'px'
            } else if (shipArray[0].name == 'Submarine') {
                shipBlocks.style.gridTemplateRows = `repeat(3, 1fr)`
                shipBlocks.style.setProperty('width', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('height', 'calc(100% - 70%)') + 'px'
            } else if (shipArray[0].name == 'Destroyer') {
                shipBlocks.style.gridTemplateRows = `repeat(3, 1fr)`
                shipBlocks.style.setProperty('width', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('height', 'calc(100% - 70%)') + 'px'
            } else if (shipArray[0].name == 'Patrol Boat') {
                shipBlocks.style.gridTemplateRows = `repeat(2, 1fr)`
                shipBlocks.style.setProperty('width', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('height', 'calc(100% - 80%)')+ 'px'
            }
        }
    } else {
        event.target.id = 'Horizontal'
        shipBlocks.style.gridTemplateRows = 'none'
        shipBlocks.lastElementChild.style.borderRight = 'transparent'

        for (let i = 0; i < shipBlocks.children.length; i++) {
            shipBlocks.children[i].classList.toggle('grid-vertical')
            shipBlocks.children[i].classList.toggle('grid-styles')

            if (shipArray[0].name == 'Carrier') {
                shipBlocks.style.gridTemplateColumns = `repeat(5, 1fr)`
                shipBlocks.style.setProperty('height', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('width', 'calc(100% - 50%') + 'px'
            } else if (shipArray[0].name == 'Battle Ship') {
                shipBlocks.style.setProperty('height', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('width', 'calc(100% - 60%') + 'px'
                shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`
            } else if (shipArray[0].name == 'Destroyer') {
                shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
                shipBlocks.style.setProperty('height', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('width', 'calc(100% - 70%') + 'px'
            } else if (shipArray[0].name == 'Submarine') {
                shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
                shipBlocks.style.setProperty('height', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('width', 'calc(100% - 70%') + 'px'
            } else if (shipArray[0].name == 'Patrol Boat') {
                shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`
                shipBlocks.style.setProperty('height', 'calc(100% - 90%') + 'px'
                shipBlocks.style.setProperty('width', 'calc(100% - 80%')+ 'px'
            }
        }
    }
}

const hoverShipPlacements = event => {
    let nextInnerGridCell = event.target.nextElementSibling
    let upper = 0;

    shipBlocks.style.display = 'grid'
    shipBlocks.style.left = (event.target.offsetLeft) + 'px'
    shipBlocks.style.top = (event.target.offsetTop) + 'px'
    shipBlocks.style.visibility = 'unset'
    
    if (rotateBtn.id == 'Horizontal') {
        for (let i = 0; i < shipBlocks.children.length; i++) {
            while (upper != shipArray[0].length && nextInnerGridCell) { 
                if (shipBlocks.children[upper] && event.target.dataset.row == nextInnerGridCell.dataset.row ) shipBlocks.children[upper].dataset.column = nextInnerGridCell.dataset.column - 1 
                else if (shipBlocks.lastElementChild.previousElementSibling.dataset.column == 8) shipBlocks.lastElementChild.dataset.column = 9;

                upper++
                nextInnerGridCell = nextInnerGridCell.nextElementSibling
            }
            if (!shipBlocks.children[i].dataset.row) shipBlocks.children[i].dataset.row = event.target.dataset.row
            else shipBlocks.children[i].dataset.row = event.target.dataset.row
            if (shipBlocks.children[0].dataset.column && event.target.dataset.row == shipBlocks.children[i].dataset.row) shipBlocks.children[0].dataset.column = event.target.dataset.column
        }
    } else {
        for (let i = 0; i < shipBlocks.children.length; i++) {
            
            while (upper != shipArray[0].length ) {
                if (!shipBlocks.children[upper].dataset.row) shipBlocks.children[upper].dataset.row = Number(event.target.dataset.row) + upper
                else shipBlocks.children[upper].dataset.row = Number(event.target.dataset.row) + upper
                if (shipBlocks.children[upper] && event.target.dataset.column == shipBlocks.children[upper].dataset.column
                ) shipBlocks.children[upper].dataset.row = Number(event.target.dataset.row ) + upper

                upper++
            }
            if (!shipBlocks.children[i].dataset.column) shipBlocks.children[i].dataset.column = event.target.dataset.column
            else shipBlocks.children[i].dataset.column = event.target.dataset.column
            if (shipBlocks.children[0].dataset.row && event.target.dataset.column == shipBlocks.children[i].dataset.column) shipBlocks.children[0].dataset.row = event.target.dataset.row
        }
    }
}

const hoverOutShipPlacements = () => {
    shipBlocks.style.display = 'none'
}

const hoverGridCell = (event) => {
    event.target.classList.toggle('block')
}

const restartBoard = event => {
    clearBoard();

    player.restartPlayers()
    event.target.parentElement.parentElement.style.display = 'none';
    document.querySelector('.contain-ships').style.display = 'flex';
    document.querySelector('.contain').style.filter ='blur(4px)';
    document.querySelector('header').style.filter = 'blur(4px)';
    
    shipCopy.map(ship => shipArray.push(ship))
    shipBlocks.style.gridTemplateColumns = 'repeat(5, 1fr)';
    shipBlocks.style.width = '198px';
    shipBlocks.style.height = '36px';
    shipBlocks.style.gridTemplateRows = 'none';
    rotateBtn.id = 'Horizontal'

    if (shipBlocks.children[0].classList.contains('grid-vertical') && shipBlocks.children[1].classList.contains('grid-vertical')) {
        shipBlocks.children[0].classList.toggle('grid-vertical')
        shipBlocks.children[0].classList.toggle('grid-styles')
        shipBlocks.children[1].classList.toggle('grid-vertical')
        shipBlocks.children[1].classList.toggle('grid-styles')
    }

    shipCopy.splice(0, 5);
    player.human.shipAttacks.length = 0;
    player.human.missedBlasts.length = 0;
    player.computer.shipAttacks.length = 0;
    player.computer.missedBlasts.length = 0;

    for (let i = 0; i < 3; i++) {
        const createDiv = document.createElement('div');

        shipBlocks.append(createDiv);
        createDiv.classList.add('grid-styles')
        createDiv.dataset.column
        createDiv.dataset.row
        createDiv.style.background = 'black'
        if (i > 2) createDiv.style.borderRight = 'transparent'
    }
}

const clearBoard = () => {
    for (let i = 0; i < enemyWaters.children.length; i++) {
        enemyWaters.children[i].style.background = ''
        delete enemyWaters.children[i].dataset.ship
        delete enemyWaters.children[i].dataset.shot
        delete enemyWaters.children[i].dataset.outer
        enemyWaters.children[i].style.pointerEvents = 'auto'
        enemyWaters.children[i].style.cursor = 'pointer'
        if (enemyWaters.children[i].firstChild) enemyWaters.children[i].firstChild.remove()
    }
    for (let i = 0; i < allyWaters.children.length; i++) {
        allyWaters.children[i].style.background = '';
        delete allyWaters.children[i].dataset.ship;
        allyWaters.children[i].dataset.shot = false
        if (allyWaters.children[i].firstChild) allyWaters.children[i].firstChild.remove()
    }
    for (let i = 0; i < shipZone.children.length; i++) {
        shipZone.children[i].style.background = ''
        delete shipZone.children[i].dataset.ship
        delete shipZone.children[i].dataset.outer
    }
    
    array.length = 0;
}

const hoverOutGridCell = (event) => {
    event.target.classList.toggle('block')
}

export { 
    shipBlocks, rotateBtn, hoverOutGridCell, hoverGridCell,
    enemyWaters, allyWaters, restartBoard, hoverOutShipPlacements,
    shipZone, rotateShip, hoverShipPlacements, restartBtn
}