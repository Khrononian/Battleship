import GameBoard from './GameBoard'

const Player = () => {
    const human = GameBoard();
    const computer = GameBoard();
    
    const attackPlayer = (player, coordinates) => {
        if (player == 'Human') return computer.receiveAttack(coordinates);
        else return human.receiveAttack(coordinates)
    }
    
    const restartPlayers = (player) => {
        let clearPlayerBoard = human.board;
        let clearComputerBoard = computer.board;

        // clearPlayerBoard = GameBoard().board
        for (let i = 0; i < clearPlayerBoard.length; i++) {
            if (clearPlayerBoard[i].length == 3) clearPlayerBoard[i].splice(2, 1)
        }
        
        // clearComputerBoard = GameBoard().board
        for (let i = 0; i < clearComputerBoard.length; i++) {
            if (clearComputerBoard[i].length == 3) clearComputerBoard[i].splice(2, 1)
        }
            
        return [clearPlayerBoard, clearComputerBoard]
    }
            
    return { attackPlayer, human, computer, restartPlayers }
}

export default Player