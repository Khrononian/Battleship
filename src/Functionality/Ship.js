const CreateShips = () => {
    const hitCoordinates = [];

    const hit = num => {
        if (hitCoordinates.indexOf(num) == -1) {
            hitCoordinates.push(num)
            
            return hitCoordinates
        } 
    }

    const isSunk = (length) => {
        if (hitCoordinates.length == length) {
            hitCoordinates[2].sunk = true

            return true
        } else return false
    }

    return { hit, isSunk }
}

export default CreateShips