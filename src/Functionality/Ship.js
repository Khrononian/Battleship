const CreateShips = (shipName, length) => {
    const hitCoordinates = [];
    let sunk = false;

    const hit = num => {
        if (hitCoordinates.indexOf(num) == -1) {
            hitCoordinates.push(num)
            
            return hitCoordinates
        } 
    }

    const isSunk = (length) => {
        if (hitCoordinates.length == length) {
            hitCoordinates[2].sunk = true

            return sunk = true
        } else return sunk = false
    }

    return { hit, isSunk }
}
const ship = CreateShips('Carrier', 5, false);

export default CreateShips
export { ship }