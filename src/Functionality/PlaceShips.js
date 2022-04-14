import { shipBlocks, rotateBtn, enemyWaters, allyWaters, shipZone } from './Dom'
import Player from './Player'

const player = Player();
const array = [];
let shipArray = [
    {name: 'Carrier', length: 5},
    {name: 'Battle Ship', length: 4},
    {name: 'Destroyer', length: 3},
    {name: 'Submarine', length: 3},
    {name: 'Patrol Boat', length: 2}
]
let shipCopy = [];
let placeLength = 5;
let verticalLength = 4;

const clickShipPlacement = event => {
    let nextSibling = event.target.nextElementSibling
    let numberIndex = 1;

    if (event.target.dataset.ship || event.target.style.background == 'black') return 
    
    if (rotateBtn.id == 'Horizontal') {
        if (event.target.dataset.column > 9 - shipArray[0].length + 1) return

        while (nextSibling && numberIndex !== shipArray[0].length) {
            if (nextSibling.dataset.ship) return
            
            numberIndex++
            nextSibling = nextSibling.nextElementSibling
        }
    } else {
        if (shipBlocks.lastElementChild.dataset.row > 9) return

        for (let i = 0; i < shipZone.children.length; i++) {
            if (shipBlocks.lastElementChild.dataset.row == shipZone.children[i].dataset.row 
            && shipBlocks.lastElementChild.dataset.column == shipZone.children[i].dataset.column
            && shipZone.children[i].dataset.ship) return
        }
    }
    
    if (rotateBtn.id == 'Horizontal') player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
    else player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Vertical')
    placeComputerShips()
    
    for (let i = 0; i < allyWaters.children.length; i++) {
        for (let j = 0; j < shipBlocks.children.length; j++) {
            for (let k = 0; k < player.human.board.length; k++) {
                if (allyWaters.children[i].dataset.row == shipBlocks.children[j].dataset.row 
                && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column) {
                    allyWaters.children[i].style.background = 'black'
                    allyWaters.children[i].dataset.ship = shipArray[0].name
                }
            }
            for (let g = 0; g < shipZone.children.length; g++) {
                if (shipBlocks.children[j].dataset.row == shipZone.children[g].dataset.row &&
                shipBlocks.children[j].dataset.column == shipZone.children[g].dataset.column)  {
                    event.target.style.background = 'black'
                    shipZone.children[g].style.background = 'black'
                    shipZone.children[g].dataset.ship = shipArray[0].name

                    if (rotateBtn.id == 'Horizontal') {
                        if (event.target.previousElementSibling  && event.target.previousElementSibling.dataset.row == event.target.dataset.row) event.target.previousElementSibling.dataset.ship = shipArray[0].name
                        if (shipZone.children[g + 1] && shipZone.children[g + 1].dataset.row == event.target.dataset.row) shipZone.children[g + 1].dataset.ship = shipArray[0].name
                        if (shipZone.children[g + 10]) shipZone.children[g + 10].dataset.ship = shipArray[0].name
                        if (shipZone.children[g - 10]) shipZone.children[g - 10].dataset.ship = shipArray[0].name
                        if (shipZone.children[g - 10] && shipZone.children[g - 10].previousElementSibling && shipZone.children[g - 10].previousElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].previousElementSibling.dataset.ship = shipArray[0].name
                        if (shipZone.children[g - 10] && shipZone.children[g - 10].nextElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].nextElementSibling.dataset.ship = shipArray[0].name
                        if (shipZone.children[g + 10] && shipZone.children[g + 10].previousElementSibling && shipZone.children[g + 10].previousElementSibling.dataset.row == Number(event.target.dataset.row) + 1) shipZone.children[g + 10].previousElementSibling.dataset.ship = shipArray[0].name
                        if (shipZone.children[g + 10] && shipZone.children[g + 10].nextElementSibling && shipZone.children[g + 10].nextElementSibling.dataset.row == Number(event.target.dataset.row) + 1) shipZone.children[g + 10].nextElementSibling.dataset.ship = shipArray[0].name
                    } else {
                        if (shipZone.children[g + 10] ) shipZone.children[g + 10].dataset.ship = shipArray[0].name

                        if (shipZone.children[g + 11] && shipZone.children[g + 11].dataset.column != 0) shipZone.children[g + 11].dataset.ship = shipArray[0].name
                        if (shipZone.children[g + 9] && shipZone.children[g + 9].dataset.column != 9) shipZone.children[g + 9].dataset.ship = shipArray[0].name

                        if (shipZone.children[g - 10] && shipZone.children[g - 10].dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].dataset.ship = shipArray[0].name
                        if (shipZone.children[g - 11] && shipZone.children[g - 11].dataset.column != 9) shipZone.children[g - 11].dataset.ship = shipArray[0].name
                        if (shipZone.children[g - 9] && shipZone.children[g - 9].dataset.column != 0) shipZone.children[g - 9].dataset.ship = shipArray[0].name
                    }
                } 
            }
            shipBlocks.children[j].style.background = 'black'
        }
    }
    
    if (rotateBtn.id == 'Horizontal') {
        if (shipArray[0].name == 'Carrier') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`
            shipBlocks.style.setProperty('width', 'calc(100% - 60%)')  + 'px'
        } else if (shipArray[0].name == 'Battle Ship') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`
            shipBlocks.style.setProperty('width', 'calc(100% - 70%)')  + 'px'
        } else if (shipArray[0].name == 'Submarine') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`
            shipBlocks.style.setProperty('width', 'calc(100% - 80%)')  + 'px'
        } else if (shipArray[0].name == 'Patrol Boat') {
            document.querySelector('.contain-ships').style.display = 'none'
            document.querySelector('.contain').style.filter = 'none'
            document.querySelector('header').style.filter = 'none'
            document.querySelector('.overlay').querySelector('p').innerText = 'Carrier'
        }
    } else {
        if (shipArray[0].name == 'Carrier') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateRows = `repeat(4, 1fr)`
            shipBlocks.style.setProperty('height', 'calc(100% - 60%') + 'px'
        } else if (shipArray[0].name == 'Battle Ship') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateRows = `repeat(3, 1fr)`
            shipBlocks.style.setProperty('height', 'calc(100% - 70%') + 'px'
        } else if (shipArray[0].name == 'Submarine') {
            shipBlocks.removeChild(shipBlocks.lastElementChild);
            shipBlocks.style.gridTemplateRows = `repeat(2, 1fr)`
            shipBlocks.style.setProperty('height', 'calc(100% - 80%') + 'px'
        } else if (shipArray[0].name == 'Patrol Boat') {
            document.querySelector('.contain-ships').style.display = 'none'
            document.querySelector('.contain').style.filter = 'none'
            document.querySelector('header').style.filter = 'none'
            document.querySelector('.overlay').querySelector('p').innerText = 'Carrier'
        }
    }
    shipCopy.push(shipArray[0])
    shipArray.splice(0, 1)
    if (shipArray[0]) document.querySelector('p').innerText = shipArray[0].name
}

const placeComputerShips = () => {
    const direction = ['Horizontal', 'Vertical']
    const randomView = Math.floor(Math.random() * direction.length)
    const random = player.computer.board[Math.floor(Math.random() * player.computer.board.length)]

    if (direction[randomView] == 'Horizontal') {
        if (random.length == 3) {
            placeComputerShips()
            return
        }
        for (let k = 0; k < player.computer.board.length; k++) {
            for (let cols = 0; cols < shipArray[0].length; cols++) {
                if (player.computer.board[k - 1] && player.computer.board[k - 1][0] == random[0] && player.computer.board[k - 1][1] == random[1] - 1 && player.computer.board[k - 1][2] ) {
                    placeComputerShips()
                    return
                }
                if (player.computer.board[k + cols + 1] && player.computer.board[k + cols + 1][0] == random[0] && player.computer.board[k + cols + 1][1] == random[1] + cols + 1 && player.computer.board[k + cols + 1][2]) {
                    placeComputerShips()
                    return
                }
            }
        }
        
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let k = 0; k < player.computer.board.length; k++) {
                if (random[1] > placeLength && shipArray[0].name) {  
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else if (shipArray[0].name){

                    player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal')
                }  
                for (let row = 0; row < shipArray[0].length; row++) {
                    if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                    && random[2] ) {
                        switch (shipArray[0].name) {
                            case 'Carrier':
                                for (let j = 9; j < 16; j++) {
                                    if (enemyWaters.children[i + j] ) enemyWaters.children[i + j].dataset.outer = 'Outer'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer`}
                                    }
                                }
                                for (let j = 11; j > 4; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].dataset.outer = 'Outer'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer`}
                                    }
                                }
                                break;
                            case 'Battle Ship': 
                                for (let j = 9; j < 15; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].dataset.outer = 'Outer'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer`}
                                    }
                                }
                                for (let j = 11; j > 5; j--) {
                                    if (enemyWaters.children[i - j] ) enemyWaters.children[i - j].dataset.outer = 'Outer'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer`}
                                    }
                                }
                                break;
                            case 'Destroyer':
                                for (let j = 9; j < 14; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].dataset.outer = 'Outer'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer`}
                                    }
                                }
                                for (let j = 11; j > 6; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].dataset.outer = 'Outer'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer`}
                                    }
                                }
                                break;
                            case 'Submarine':
                                for (let j = 9; j < 14; j++) {
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].dataset.outer = 'Outer'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer`}
                                    }
                                }
                                for (let j = 11; j > 6; j--) {
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].dataset.outer = 'Outer'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer`}
                                    }
                                }
                                break;
                            case 'Patrol Boat':
                                for (let j = 9; j < 13; j++) {
                                    
                                    if (enemyWaters.children[i + j]  ) enemyWaters.children[i + j].dataset.outer = 'Outer'
                                    if (player.computer.board[k + j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k + j][2] = {outer: `Outer`}
                                    }
                                }
                                for (let j = 11; j > 7; j--) {
                                    
                                    if (enemyWaters.children[i - j]) enemyWaters.children[i - j].dataset.outer = 'Outer'
                                    if (player.computer.board[k - j] && player.computer.board[k][0] == random[0] && player.computer.board[k][1] == random[1]) {
                                        player.computer.board[k - j][2] = {outer: `Outer`}
                                    }
                                }
                            break;
                        }
                        if (enemyWaters.children[i - 1] && enemyWaters.children[i - 1].dataset.column != 9) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                        if (player.computer.board[k - 1] && player.computer.board[k - 1][0] == random[0] && player.computer.board[k - 1][1] == random[1] - 1 && player.computer.board[k - 1][1] != 9) player.computer.board[k - 1][2] = {outer: 'OUTER'}
                        if (enemyWaters.children[i + row + 1] && enemyWaters.children[i + row + 1].dataset.column != 0) enemyWaters.children[i + row + 1].dataset.outer = 'Outer'
                        if (player.computer.board[k + row + 1] && player.computer.board[k + row + 1][0] == random[0] && player.computer.board[k + row + 1][1] == random[1] + row + 1 && player.computer.board[k + row + 1][1] != 0) player.computer.board[k + row + 1][2] = {outer: 'OUTER'}
                        
                        enemyWaters.children[i + row].dataset.ship = shipArray[0].name
                        enemyWaters.children[i + row].dataset.shot = false
                    }
                }
            }
        }
        if (shipArray[0].name != 'Destroyer' && shipArray[0].name != 'Submarine') {
            placeLength++
            verticalLength--
        }
        if (shipArray[0].name == 'Patrol Boat') {
            placeLength = 5
            verticalLength = 4
        }
    } else {
        if (random.length == 3) {
            placeComputerShips()
            return
        }

        for (let row = 0; row < player.computer.board.length; row++) {
            for (let cols = 10; cols <= shipArray[0].length * 10; cols += 10) {
                if (player.computer.board[row - 1] && player.computer.board[row - 1][0] == random[0] && player.computer.board[row - 1][1] == random[1] - 1 && player.computer.board[row - 1][2]) {
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + 10] && player.computer.board[row + 10 ][0] == random[0] + 10  && player.computer.board[row + 10 ][1] == random[1] && player.computer.board[row + 10 ][2]) {
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + cols] && player.computer.board[row][0] == random[0] && player.computer.board[row][1] == random[1]
                && player.computer.board[row + cols][1] == random[1] && player.computer.board[row + cols][2]) {
                    placeComputerShips()
                    return
                }
            }
        }
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let row = 0; row < player.computer.board.length; row++) {
                if (random[0] > placeLength && shipArray[0].name) {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else if (shipArray[0].name) {
                    player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical')
                    
                }
                for (let index = 0; index <= shipArray[0].length + 1; index++) {
                    if (player.computer.board[row + 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row + 1][2] = {outer: 'OUTER'}
                    if (player.computer.board[row - 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row - 1][2] = {outer: 'OUTER'}
                }
                for (let column = 10; column < shipArray[0].length * 10; column += 10) {
                    if (player.computer.board[row + column] && player.computer.board[row + column][0] == random[0] + 1 && player.computer.board[row][1] == random[1]
                    && player.computer.board[row + column][1] == random[1]) {
                        if (player.computer.board[row + column + shipArray[0].length * 10 - 10]) player.computer.board[row + column + shipArray[0].length * 10 - 10][2] = {outer: 'OUTER'}
                    }
                }
                
                if (player.computer.board[row - 11] && player.computer.board[row - 11][0] == random[0] - 1 && player.computer.board[row - 11][1] == random[1] - 1) player.computer.board[row - 11][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 9] && player.computer.board[row - 9][0] == random[0] - 1 && player.computer.board[row - 9][1] == random[1] + 1) player.computer.board[row - 9][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 10] && player.computer.board[row - 10][0] == random[0] - 1 && player.computer.board[row][1] == random[1]) player.computer.board[row - 10][2] = {outer: 'OUTER'}
                
                if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                && random[2]) {
                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 10]) enemyWaters.children[i - 10].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 11]) enemyWaters.children[i - 11].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 9]) enemyWaters.children[i - 9].dataset.outer = 'Outer'

                    enemyWaters.children[i].dataset.shot = false;
                    enemyWaters.children[i].dataset.ship = shipArray[0].name
                    
                    if (enemyWaters.children[i].dataset.ship == shipArray[0].name) {
                        if (shipArray[0].name == 'Patrol Boat') verticalLength = 1
                        for (let col = 0; col < verticalLength; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            enemyWaters.children[i].dataset.shot = false

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    }
                }
            }
        }
        if (shipArray[0].name != 'Destroyer' && shipArray[0].name != 'Submarine') {
            placeLength++
            verticalLength--
        }
        if (shipArray[0].name == 'Patrol Boat') {
            placeLength = 5
            verticalLength = 4
        }
    }
    return player.computer.board
}

export { clickShipPlacement, player, shipArray, shipCopy, array, placeLength }