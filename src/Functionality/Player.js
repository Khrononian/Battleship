import GameBoard from './GameBoard'

const Player = () => {
    const human = GameBoard();
    const computer = GameBoard();
    const playerAttacks = []
    
    const gamePlayer = (player, coordinates) => {
        const attackHuman = human.receiveAttack(coordinates);
        const attackComputer = computer.receiveAttack(coordinates);

        if (player == 'Human') return attackHuman
        else return attackComputer
    }
        
    // USE BOTH, PLAYER AND COMPUTER GAMEBOARDS, TO RECORD EACH SHOT ON THEIR BOARD
    // MAKE SURE CHECK IF A POSITION IS POSSIBLE OR NOT
    // USE RANDOM FOR COMPUTER TO MAKE RANDOM CHOICES
            
            
    return { gamePlayer, human, computer }
}

export default Player