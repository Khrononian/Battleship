

const Player = () => {
    return {
        realPlayer(playerTurn) {
            if (playerTurn) return true
            else return false;
        },
        computerAi(computerTurn) {
        const div = document.querySelectorAll('.grid-enemy');    
            if (this.realPlayer(computerTurn) === false) {
                // RANDOMLY SELECT GRID CELL AFTER PLAYER'S TURN IS OVER
                // USE THE DOM FUNCTIONALITY TO CALL THE COMPUTER METHOD

                

                for (let i = 0; i < div.length; i++) {
                    // USE MATH RANDOM TO SELECT A RANDOM DIV
                    // USE METHODS/FUNCTIONS TO FIND WHERE BOATS ARE


                }
            }
        
        }
    }
}

export default Player