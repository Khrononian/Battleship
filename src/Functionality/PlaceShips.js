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
let shipCopy = []

const clickShipPlacement = event => {
    let nextSibling = event.target.nextElementSibling
    let numberIndex = 1;
    // CHANGE PURPLE BACKGROUNDS INTO A DATASET OF SHIP
    if (event.target.style.background == 'purple' || event.target.style.background == 'black') return 
    
    if (rotateBtn.id == 'Horizontal') {
        if (event.target.dataset.column > 9 - shipArray[0].length + 1) return

        while (nextSibling && numberIndex !== shipArray[0].length) {
            if (nextSibling.style.background == 'purple') return
            
            numberIndex++
            nextSibling = nextSibling.nextElementSibling
        }
    } else {
        if (shipBlocks.lastElementChild.dataset.row > 9) return

        for (let i = 0; i < shipZone.children.length; i++) {
            if (shipBlocks.lastElementChild.dataset.row == shipZone.children[i].dataset.row 
            && shipBlocks.lastElementChild.dataset.column == shipZone.children[i].dataset.column
            && shipZone.children[i].style.background == 'purple') return
        }
    }
    
    if (rotateBtn.id == 'Horizontal') player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
    else player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Vertical')
    placeComputerShips()

    console.log('COMPUTER', player.computer.board)
    
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
                    // SWITCH PURPLE COLORS INTO DATASETS OF OUTERS
                    if (rotateBtn.id == 'Horizontal') {
                        if (event.target.previousElementSibling  && event.target.previousElementSibling.dataset.row == event.target.dataset.row) event.target.previousElementSibling.style.background = 'purple'
                        if (shipZone.children[g + 1] && shipZone.children[g + 1].dataset.row == event.target.dataset.row) shipZone.children[g + 1].style.background = 'purple'
                        if (shipZone.children[g + 10]) shipZone.children[g + 10].style.background = 'purple'
                        if (shipZone.children[g - 10]) shipZone.children[g - 10].style.background = 'purple'
                        if (shipZone.children[g - 10] && shipZone.children[g - 10].previousElementSibling && shipZone.children[g - 10].previousElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].previousElementSibling.style.background = 'purple'
                        if (shipZone.children[g - 10] && shipZone.children[g - 10].nextElementSibling.dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].nextElementSibling.style.background = 'purple'
                        if (shipZone.children[g + 10] && shipZone.children[g + 10].previousElementSibling && shipZone.children[g + 10].previousElementSibling.dataset.row == Number(event.target.dataset.row) + 1) shipZone.children[g + 10].previousElementSibling.style.background = 'purple'
                        if (shipZone.children[g + 10] && shipZone.children[g + 10].nextElementSibling && shipZone.children[g + 10].nextElementSibling.dataset.row == Number(event.target.dataset.row) + 1) shipZone.children[g + 10].nextElementSibling.style.background = 'purple'
                    
                    } else {
                        if (shipZone.children[g + 10] ) shipZone.children[g + 10].style.background = 'purple'

                        if (shipZone.children[g + 11] && shipZone.children[g + 11].dataset.column != 0) shipZone.children[g + 11].style.background = 'purple'
                        if (shipZone.children[g + 9] && shipZone.children[g + 9].dataset.column != 9) shipZone.children[g + 9].style.background = 'purple'

                        if (shipZone.children[g - 10] && shipZone.children[g - 10].dataset.row == event.target.dataset.row - 1) shipZone.children[g - 10].style.background = 'purple'
                        if (shipZone.children[g - 11] && shipZone.children[g - 11].dataset.column != 9) shipZone.children[g - 11].style.background = 'purple'
                        if (shipZone.children[g - 9] && shipZone.children[g - 9].dataset.column != 0) shipZone.children[g - 9].style.background = 'purple'
                        
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
    console.log('COPY', shipCopy, shipArray)
    shipArray.splice(0, 1)
    if (shipArray[0]) document.querySelector('p').innerText = shipArray[0].name
}

const placeComputerShips = () => {
    const direction = ['Horizontal', 'Vertical']
    const randomView = Math.floor(Math.random() * direction.length)
    const random = player.computer.board[Math.floor(Math.random() * player.computer.board.length)]
    
    if (direction[randomView] == 'Horizontal') {
        // console.log('GET RANDOM', random, random[1] + 1)
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
        console.log('BOARD', player.computer.board)
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let k = 0; k < player.computer.board.length; k++) {
                // for (let col = 0; col < shipArray[0].length; col++) { 
                    if (random[1] > 5 && shipArray[0].name == 'Carrier') {  
                        random.length = 2
                        placeComputerShips()
                        
                        return player.computer.board
                    } else  if (shipArray[0].name == 'Carrier'){
                        
                        player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal') 
                    }
                    // player.human.placeShips(shipArray[0].name, shipArray[0].length, [event.target.dataset.row, event.target.dataset.column], 'Horizontal')
                    if (random[1] > 6 && shipArray[0].name == 'Battle Ship') {
                        random.length = 2
                        placeComputerShips()
                        
                        console.log('INNER BATTLE TEST')
                        return player.computer.board
                    }  else if (shipArray[0].name == 'Battle Ship')  {
                        
                        player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal') 
                    }   
                    
                    if (random[1] > 7 && shipArray[0].name == 'Destroyer') {
                        random.length = 2
                        placeComputerShips()
                        
                        console.log('INNER DESTROYER TEST')
                        return player.computer.board
                    }  else if (shipArray[0].name == 'Destroyer') {
                        
                        player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal') 
                    }
                    
                    if (random[1] > 7 && shipArray[0].name == 'Submarine') {
                        random.length = 2
                        placeComputerShips()
                        
                        console.log('INNER SUB TEST')
                        return player.computer.board
                    }  else if (shipArray[0].name == 'Submarine') {
                        
                        player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal') 
                    }   
                    
                    if (random[1] > 8 && shipArray[0].name == 'Patrol Boat') {
                        random.length = 2
                        placeComputerShips()
                        
                        console.log('INNER PATROL TEST')
                        return player.computer.board
                    } else  if (shipArray[0].name == 'Patrol Boat'){
                        
                        player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Horizontal') 
                    }   
                // }
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
                        
                        // enemyWaters.children[i + row].style.background = 'red'
                        enemyWaters.children[i + row].dataset.ship = shipArray[0].name
                        enemyWaters.children[i + row].dataset.shot = false
                    }
                }
            }
        }
    } else {
        // console.log('G RAND', random)
        if (random.length == 3) {
            placeComputerShips()
            return
        }

        for (let row = 0; row < player.computer.board.length; row++) {
            for (let cols = 10; cols <= shipArray[0].length * 10; cols += 10) {
                if (player.computer.board[row - 1] && player.computer.board[row - 1][0] == random[0] && player.computer.board[row - 1][1] == random[1] - 1 && player.computer.board[row - 1][2]) {
                    console.log('first TEST')
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + 10] && player.computer.board[row + 10 ][0] == random[0] + 10  && player.computer.board[row + 10 ][1] == random[1] && player.computer.board[row + 10 ][2]) {
                    console.log('TEST')
                    placeComputerShips()
                    return
                }

                if (player.computer.board[row + cols] && player.computer.board[row][0] == random[0] && player.computer.board[row][1] == random[1]
                && player.computer.board[row + cols][1] == random[1] && player.computer.board[row + cols][2]) {
                    console.log('DOWN TEST')
                    placeComputerShips()
                    return
                }
            }
        }
        console.log('COLUMN COMP', player.computer.board)
        for (let i = 0; i < enemyWaters.children.length; i++) {
            for (let row = 0; row < player.computer.board.length; row++) {
                if (random[0] > 5 && shipArray[0].name == 'Carrier') {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical')           
                
                if (random[0] > 6 && shipArray[0].name == 'Battle Ship') {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical') 
                
                if (random[0] > 7 && shipArray[0].name == 'Destroyer') {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical') 
                
                if (random[0] > 7 && shipArray[0].name == 'Submarine') {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical') 
                
                if (random[0] > 8 && shipArray[0].name == 'Patrol Boat') {
                    random.length = 2
                    placeComputerShips()
                    
                    return player.computer.board
                } else player.computer.placeShips(shipArray[0].name, shipArray[0].length, [random[0], random[1]], 'Vertical') 
                
                for (let index = 0; index <= shipArray[0].length + 1; index++) {
                    if (player.computer.board[row + 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row + 1][2] = {outer: 'OUTER'}
                    if (player.computer.board[row - 1] && player.computer.board[row + index] && player.computer.board[row + index][0] == random[0] + index && player.computer.board[row][1] == random[1]) player.computer.board[row - 1][2] = {outer: 'OUTER'}
                }
                for (let column = 10; column < shipArray[0].length * 10; column += 10) {
                    if (player.computer.board[row + column] && player.computer.board[row + column][0] == random[0] + 1 && player.computer.board[row][1] == random[1]
                    && player.computer.board[row + column][1] == random[1]) {
                        // console.log('RING', player.computer.board[row + column + shipArray[0].length * 10 - 10])
                        if (player.computer.board[row + column + shipArray[0].length * 10 - 10]) player.computer.board[row + column + shipArray[0].length * 10 - 10][2] = {outer: 'OUTER'}
                    }
                }
                
                if (player.computer.board[row - 11] && player.computer.board[row - 11][0] == random[0] - 1 && player.computer.board[row - 11][1] == random[1] - 1) player.computer.board[row - 11][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 9] && player.computer.board[row - 9][0] == random[0] - 1 && player.computer.board[row - 9][1] == random[1] + 1) player.computer.board[row - 9][2] = {outer: 'OUTER'}
                if (player.computer.board[row - 10] && player.computer.board[row - 10][0] == random[0] - 1 && player.computer.board[row][1] == random[1]) player.computer.board[row - 10][2] = {outer: 'OUTER'}
                
                if (enemyWaters.children[i].dataset.row == random[0] && enemyWaters.children[i].dataset.column == random[1]
                && random[2]) {
                    // if (enemyWaters.children[i].style.background == 'red' || enemyWaters.children[i].style.background == 'purple') {
                    //     console.log('RANDOM WAS TAKEN')
                    //     placeComputerShips()
                    //     return player.computer.board
                    // }
                    
                    // enemyWaters.children[i].style.background = 'red'

                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 10]) enemyWaters.children[i - 10].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 11]) enemyWaters.children[i - 11].dataset.outer = 'Outer'
                    if (enemyWaters.children[i - 9]) enemyWaters.children[i - 9].dataset.outer = 'Outer'

                    enemyWaters.children[i].dataset.shot = false;
                    enemyWaters.children[i].dataset.ship = shipArray[0].name
                    
                    // enemyWaters.children[i += 10].dataset.ship = shipArray[0].name 
                    if (enemyWaters.children[i].dataset.ship == 'Carrier') {
                        for (let col = 0; col < 4; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            // enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false

                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Battle Ship') {
                        for (let col = 0; col < 3; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            // enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Destroyer') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            // enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Submarine') {
                        for (let col = 0; col < 2; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            // enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1] ) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    } else if (enemyWaters.children[i].dataset.ship == 'Patrol Boat') {
                        for (let col = 0; col < 1; col++) {
                            enemyWaters.children[i += 10].dataset.ship = shipArray[0].name
                            // enemyWaters.children[i].style.background = 'red'
                            enemyWaters.children[i].dataset.shot = false
                            
                            if (enemyWaters.children[i + 10] && enemyWaters.children[i + 10].dataset.column == random[1]) enemyWaters.children[i + 10].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 1]) enemyWaters.children[i + 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i - 1]) enemyWaters.children[i - 1].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 11]) enemyWaters.children[i + 11].dataset.outer = 'Outer'
                            if (enemyWaters.children[i + 9]) enemyWaters.children[i + 9].dataset.outer = 'Outer'
                        }
                    }
                }
            }
        }
    }
    return player.computer.board
}

export { clickShipPlacement, player, shipArray, shipCopy, array }