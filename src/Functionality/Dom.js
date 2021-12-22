import { ship } from './Ship'

const rice = 'Mans'
const enemyWaters = document.querySelector('.enemy-waters')

for (let i = 0; i < enemyWaters.children.length; i++) {
    enemyWaters.children[i].addEventListener('mouseover', (event) => {
        event.target.style.background = '#3232';
        ship.hit(Number(event.target.innerText))
        console.log('Find', event.target.innerText)
    })
    
    enemyWaters.children[i].addEventListener('mouseout', (event) => event.target.style.background = 'transparent')
    console.log(enemyWaters.children[i].getBoundingClientRect())
}

console.log(rice)

export default rice