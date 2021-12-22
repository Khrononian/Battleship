const CreateBattleShips = (shipName, length) => {
    return {
        shipName,
        length, 
        sunk: false,
        location: [0, 1, 2, 3, 4], // USE PLACEMENT OF SHIP TO CALCULATE LOCATION, ALSO CHANGE LOCATION TO PARAMETER
        hit(num) {
            console.log(this.location, 'Food')
            const numIndex = this.location.indexOf(num)
            if (this.location.indexOf(num) !== -1) {
                console.log('FOUND', num, numIndex)
                this.location.splice(numIndex, 1, 'X')
                console.log('Changed', this.location)
            }
            else console.log(num)
            
            return num
        },
        isSunk() {
            const locate = this.location;

            if (locate.every(x => x === 'X')) return this.sunk = true;
            else return false;
        }
    }

}
const ship = CreateBattleShips('Carrier', 5, false);
console.log(ship, ship.hit(5), ship.isSunk(), ship.sunk) // Works
setInterval(() => {
    console.log('Test', ship, ship.hit())
},2500)

export default CreateBattleShips
export { ship }