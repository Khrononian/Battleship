import { player, array } from "./PlaceShips";
import { enemyWaters, allyWaters } from "./Dom";

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

const clickGridCell = (event) => {
    const enemyBoardCoordinates = getGridPosition(enemyWaters, getElementIndex(event.target));
   
    player.attackPlayer('Human', [enemyBoardCoordinates.row, enemyBoardCoordinates.column])
    randomSelectionCheck()

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
        document.querySelector('.winner').innerText = 'COMPUTER WON'
        document.querySelector('.restart-overlay').style.display = 'flex';
    } else if (player.computer.checkShipConditions()) {
        document.querySelector('.winner').innerText = 'HUMAN WON'
        document.querySelector('.restart-overlay').style.display = 'flex';
    }
}

const randomSelectionCheck = () => { // ALLY TARGETS
    const randomSelection = allyWaters.children[Math.floor(Math.random() * allyWaters.children.length)]
       
    if (array.indexOf(randomSelection.dataset.row + randomSelection.dataset.column) == -1 ) {
        array.push(randomSelection.dataset.row + randomSelection.dataset.column)
        randomSelection.dataset.shot = true;

        for (let i = 0; i < allyWaters.children.length; i++) {
            if (randomSelection.dataset.row == allyWaters.children[i].dataset.row && randomSelection.dataset.column == allyWaters.children[i].dataset.column
            && randomSelection.dataset.ship) {
                allyWaters.children[i].style.background = 'red'
                player.attackPlayer('Computer', [randomSelection.dataset.row, randomSelection.dataset.column])
                return
            } else if (randomSelection.dataset.row == allyWaters.children[i].dataset.row && randomSelection.dataset.column == allyWaters.children[i].dataset.column
            && !allyWaters.children[i].dataset.ship) {
                player.attackPlayer('Computer', [randomSelection.dataset.row, randomSelection.dataset.column])
                randomSelection.innerHTML = `<i class="fas fa-circle"></i>`;
                return
            }
        }

        return 
    } else {
        randomSelectionCheck()

        return 
    }
}

export { clickGridCell, getGridPosition, getElementIndex }