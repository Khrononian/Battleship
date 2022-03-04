import GameBoard from './GameBoard'

const Player = () => {
    const human = GameBoard();
    const computer = GameBoard();
    
    const attackPlayer = (player, coordinates) => {
        const attackHuman = human.receiveAttack(coordinates);
        const attackComputer = computer.receiveAttack(coordinates);

        if (player == 'Human') return attackHuman
        else return attackComputer
    }
    
    const restartPlayers = (player) => {
        let clearPlayerBoard = human.board;
        let clearComputerBoard = computer.board;

        if (player == 'Human') {
            clearPlayerBoard = GameBoard().board
            return clearPlayerBoard
        }
        else {
            clearComputerBoard = GameBoard().board
            return clearComputerBoard
        }
    }
            
    return { attackPlayer, human, computer, restartPlayers }
}

export default Player