const CreateBattleShips = (shipName, length) => {
    return {
        shipName,
        length, 
        sunk: false,
        location: [], // USE PLACEMENT OF SHIP TO CALCULATE LOCATION, ALSO CHANGE LOCATION TO PARAMETER
        hit(num) {
            const numIndex = this.location.indexOf(num)

            if (numIndex && num) {
                this.location.push(num)
                this.location.splice(numIndex, 1, 'X')
            }
            
            return this.location
        },
        isSunk() {
            if (this.location.every(x => x === 'X') && this.location.length === this.length) return this.sunk = true;
            else return this.sunk = false;
        },
    }
}
const ship = CreateBattleShips('Carrier', 5, false);

const carrier = CreateBattleShips('Carrier', 5, false);
const battleShip = CreateBattleShips('Battle Ship', 4, false);
const destroyer = CreateBattleShips('Destroyer', 3, false);
const submarine = CreateBattleShips('Submarine', 3, false);
const patrolBoat = CreateBattleShips('Patrol Boat', 2, false);

export default CreateBattleShips
export { ship, carrier, battleShip, destroyer, submarine, patrolBoat }