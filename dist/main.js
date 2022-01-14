/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Functionality/Dom.js":
/*!**********************************!*\
  !*** ./src/Functionality/Dom.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getGridPosition\": () => (/* binding */ getGridPosition),\n/* harmony export */   \"enemyWaters\": () => (/* binding */ enemyWaters),\n/* harmony export */   \"allyWaters\": () => (/* binding */ allyWaters)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/Functionality/GameBoard.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player */ \"./src/Functionality/Player.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ \"./src/Functionality/Ship.js\");\n\n\n\n\nconst rice = 'Mans'\nconst enemyWaters = document.querySelector('.enemy-waters');\nconst allyWaters = document.querySelector('.allied-waters');\nconst shipZone = document.querySelector('.ship-zone');\nconst shipBlocks = document.querySelector('.ship-block');\nconst getShipPositions = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\nconst getPlayerType = (0,_Player__WEBPACK_IMPORTED_MODULE_1__[\"default\"])()\nconst shipArray = ['Carrier', 'Battle Ship', 'Destroyer', 'Submarine', 'Patrol Boat']\nconst array = [];\n\nconst loadGridBlocks = () => { // WORK ON GETTING COORDINATES\n    for (let i = 0; i < 100; i++) {\n        const enemyDivs = document.createElement('div');\n        const allyDivs = document.createElement('div');\n        const shipDivs = document.createElement('div');\n\n        enemyDivs.classList.add('grid-cell')\n        enemyDivs.classList.add('grid-enemy')\n\n        enemyDivs.addEventListener('mouseover', hoverGridCell)\n        enemyDivs.addEventListener('click', clickGridCell)\n        enemyDivs.addEventListener('mouseout', hoverOutGridCell)\n        shipDivs.addEventListener('mouseover', hoverShipPlacements)\n        shipDivs.addEventListener('mouseout', hoverOutShipPlacements)\n        shipDivs.addEventListener('click', clickShipPlacement);\n        \n        enemyWaters.append(enemyDivs)\n        allyDivs.classList.add('grid-ally');\n        allyWaters.append(allyDivs);\n        enemyDivs.style.cursor = 'pointer'\n        shipZone.append(shipDivs)\n        shipDivs.classList.add('grid-ships')\n        shipBlocks.style.visibility = 'unset'\n        shipZone.append(shipBlocks)\n\n        enemyDivs.dataset.row = Number(getGridPosition(enemyWaters, getElementIndex(enemyDivs)).row);\n        enemyDivs.dataset.column = Number(getGridPosition(enemyWaters, getElementIndex(enemyDivs)).column);\n        allyDivs.dataset.row = Number(getGridPosition(allyWaters, getElementIndex(allyDivs)).row);\n        allyDivs.dataset.column = Number(getGridPosition(allyWaters, getElementIndex(allyDivs)).column);\n        shipDivs.dataset.row = Number(getGridPosition(shipZone, getElementIndex(shipDivs)).row);\n        shipDivs.dataset.column = Number(getGridPosition(shipZone, getElementIndex(shipDivs)).column);\n        allyDivs.dataset.shot = false;\n    }\n}\n\nconst hoverShipPlacements = event => {\n    let shipArrayInfo = shipArray[0]\n\n    shipBlocks.style.display = 'grid'\n    shipBlocks.style.left = (event.target.offsetLeft) + 'px'\n    shipBlocks.style.top = (event.target.offsetTop) + 'px'\n    shipBlocks.lastElementChild.style.border = 'transparent'\n    \n\n    console.log('Previos Ship placement', event.target.previousElementSibling)// WORKS\n    const leftPos = (element) => (element.offsetLeft) \n    const topPos = (element) => (element.offsetTop) + 'px'\n    \n\n    if (shipBlocks.children[0] !== undefined) shipBlocks.children[0].dataset.row = event.target.dataset.row\n    else return\n    \n    for (let i = 0; i < shipZone.children.length; i++) {\n        for (let k = 0; k < shipBlocks.children.length; k++) {\n            shipBlocks.children[k].dataset.ship = shipArrayInfo\n\n            if (shipZone.children[i].style.background == 'red' && shipBlocks.children[k]\n            ) {\n                console.log('Next ship placement', shipBlocks.children[k], shipZone.children[i], leftPos(shipBlocks.children[k]), shipZone.children[i].offsetLeft)\n                // Incomplete\n                \n            }\n\n            if (shipZone.children[i].dataset.row == shipBlocks.children[k].dataset.row &&\n            shipZone.children[i].dataset.ship == shipArrayInfo) {\n                // CHANGE THIS TO SOMETHING THAT CAN EQUAL TO THE LENGTH OF THE SHIPBLOCK\n                console.log('Testy')\n                shipZone.children[i].style.background = 'red'\n            }\n            \n        }\n    }\n\n    for (let i = 0; i < shipBlocks.children.length; i++) {\n        let nextGridCell = event.target.nextElementSibling\n        if (!shipBlocks.children[i].dataset.row) shipBlocks.children[i].dataset.row = event.target.dataset.row\n        else shipBlocks.children[i].dataset.row = event.target.dataset.row\n        \n        while (nextGridCell.dataset.row == shipBlocks.children[i].dataset.row ) {\n            if (!shipBlocks.children[i].dataset.column) shipBlocks.children[i].dataset.column = event.target.dataset.column\n            else { \n                shipBlocks.children[0].dataset.column = event.target.dataset.column\n                shipBlocks.children[i].dataset.column = nextGridCell.dataset.column\n                console.log('Check sibling', nextGridCell)\n\n            }\n            nextGridCell = nextGridCell.nextElementSibling\n            \n        }\n    }\n    event.target.dataset.column--\n    \n    \n    console.log('Outside icnrease')\n}\n\nconst hoverOutShipPlacements = event => {\n    shipBlocks.style.display = 'none'\n    // SHIP BLOCKS INCREASE WHEN HOVERING\n    // TRY TO USE COORDINATES TO PREVENT NEIGHBOR SHIPS\n    for (let i = 0; i < shipBlocks.children.length; i++) {\n        if (event.target.dataset.column !== -1) {\n\n        }\n        else return\n    }\n    event.target.dataset.column++ // CHECK THIS\n    \n    console.log('Hover array', shipArray)\n}\n\nconst clickShipPlacement = event => {\n    if (shipBlocks.lastElementChild.dataset.column < 10 && event.target.style.background != 'red' \n    && enemyWaters.children[Math.floor(Math.random() * enemyWaters.childElementCount)].style.background != 'red' ) placePlayerShips()\n    else return\n\n    console.log('Find sibling', shipBlocks, shipBlocks.nextElementSibling)\n    \n    console.log('Find surrounding targets position', event.target.offsetTop)\n    // TRY TO USE THE SHIP ZONES CURRENT POSITION\n\n    for (let i = 0; i < allyWaters.children.length; i++) {\n        for (let j = 0; j < shipBlocks.children.length; j++) {\n            if (shipBlocks.children[0].dataset.row == allyWaters.children[i].dataset.row\n            && allyWaters.children[i].dataset.column == shipBlocks.children[j].dataset.column\n            ) {\n                allyWaters.children[i].style.background = 'red'\n                allyWaters.children[i].dataset.ship = shipArray[0];\n                event.target.style.background = 'red'\n            }\n\n            for (let k = 0; k < shipZone.children.length; k++) {\n                if (shipBlocks.children[0].dataset.row == shipZone.children[k].dataset.row &&\n                shipBlocks.children[j].dataset.column == shipZone.children[k].dataset.column )  {\n                    shipZone.children[k].style.background = 'red'\n                    shipZone.children[k].dataset.ship = shipArray[0]\n                    \n                }\n            }\n        }\n    }\n\n    \n    if (shipArray[0] == _Ship__WEBPACK_IMPORTED_MODULE_2__.carrier.shipName) {\n        shipBlocks.removeChild(shipBlocks.lastElementChild);\n        shipBlocks.style.gridTemplateColumns = `repeat(4, 1fr)`\n        shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'\n    } else if (shipArray[0] == _Ship__WEBPACK_IMPORTED_MODULE_2__.battleShip.shipName) {\n        shipBlocks.removeChild(shipBlocks.lastElementChild);\n        shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`\n    } else if (shipArray[0] == _Ship__WEBPACK_IMPORTED_MODULE_2__.submarine.shipName) shipBlocks.removeChild(shipBlocks.lastElementChild);\n    \n    if (shipArray.length !== 1) shipArray.splice(0, 1)\n    else {\n        document.querySelector('.contain').style.filter = 'none'\n        document.querySelector('header').style.filter = 'none'\n        document.querySelector('.contain-ships').remove();\n    }\n}\n\nconst placePlayerShips = () => {\n    switch (shipArray[0]) {\n        case _Ship__WEBPACK_IMPORTED_MODULE_2__.carrier.shipName:\n            console.log('Carrier works');\n            createComputerShips(_Ship__WEBPACK_IMPORTED_MODULE_2__.carrier.length - 1)\n\n            break;\n        case _Ship__WEBPACK_IMPORTED_MODULE_2__.battleShip.shipName:\n            console.log('Battleship works');\n            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'\n            createComputerShips(_Ship__WEBPACK_IMPORTED_MODULE_2__.battleShip.length - 1)\n\n            break;\n        case _Ship__WEBPACK_IMPORTED_MODULE_2__.destroyer.shipName:\n            console.log('Destroyer works');\n            shipBlocks.style.gridTemplateColumns = `repeat(3, 1fr)`\n            createComputerShips(_Ship__WEBPACK_IMPORTED_MODULE_2__.destroyer.length - 1)\n\n            break;\n        case _Ship__WEBPACK_IMPORTED_MODULE_2__.submarine.shipName:\n            console.log('Submarine works');\n            shipBlocks.style.width = (shipBlocks.offsetWidth - 40)+ 'px'\n            shipBlocks.style.gridTemplateColumns = `repeat(2, 1fr)`\n            createComputerShips(_Ship__WEBPACK_IMPORTED_MODULE_2__.submarine.length - 1)\n\n            break;\n        case _Ship__WEBPACK_IMPORTED_MODULE_2__.patrolBoat.shipName:\n            console.log('Patrol Boat');\n            \n            createComputerShips(_Ship__WEBPACK_IMPORTED_MODULE_2__.patrolBoat.length - 1)\n\n            break;\n    }\n}\n\nconst createComputerShips = (shipInfo) => {\n    const randomPlacement = Math.floor(Math.random() * enemyWaters.childElementCount);\n    let previousGrid = enemyWaters.children[randomPlacement].previousElementSibling\n    let nextGrid = enemyWaters.children[randomPlacement].nextElementSibling\n    let j = 0;\n    let shipLength = 0;\n\n    \n    if (enemyWaters.children[randomPlacement].style.background != 'red' &&  Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1 <= 10\n    && enemyWaters.children[randomPlacement].dataset.ship != shipArray[0]\n    ) {\n        enemyWaters.children[randomPlacement].dataset.ship = shipArray[0];\n        \n    } else {\n        console.log('First Else Find array', shipArray)\n        createComputerShips(shipInfo)\n        \n        return\n    }\n    console.log('Check placement array', shipArray)\n\n    \n    // TRY TO MAKE RANDOM PLACEMENTS ALLOW SPACE FOR LENGTH OF SHIP TO BE PLACED\n    \n        // IFGURE OUT WHY IT SOMETIMES DOESNT CREATE THE AI SHIP\n        console.log('Inner sibling', shipLength, Number(enemyWaters.children[randomPlacement].dataset.column) + shipInfo + 1, shipInfo + 1)\n        while (j != shipInfo && nextGrid) {\n            console.log('Sibling', nextGrid)\n            if (nextGrid.style.background != 'red' && enemyWaters.children[randomPlacement].dataset.row == nextGrid.dataset.row\n            ) {\n                nextGrid.style.background = 'red'\n                j++\n            } else {\n                console.log('Second else find array', shipArray)\n                createComputerShips(shipInfo)\n                return\n            }\n            \n            nextGrid.dataset.ship = shipArray[0]\n            \n            nextGrid = nextGrid.nextElementSibling\n            \n        }\n    for (let i = 0; i < enemyWaters.children.length; i++) {\n\n        if (enemyWaters.children[i].dataset.ship == shipArray[0] \n        ) {\n            enemyWaters.children[i].style.background = 'red'\n            console.log('Check ships', enemyWaters.children[i])\n        } \n\n    }    \n    \n}\n\nconst getGridPosition = (parent, index) => {\n    let offset = Number(window.getComputedStyle(parent.children[0]).gridColumnStart) - 1;\n\n    if (isNaN(offset)) offset = 0;\n\n    const colCount = window.getComputedStyle(parent).gridTemplateColumns.split(' ').length;\n    const rowPosition = Math.floor((index + offset) / colCount);\n    const colPosition = (index + offset) % colCount;\n        \n    return { row: rowPosition, column: colPosition }\n}\n\nconst getElementIndex = (element) => {\n    const findElement = element.parentNode.children;\n       \n    for (let i = 0; i < findElement.length; i++) if (findElement[i] === element) return i\n}\n\nconst hoverGridCell = (event) => {\n    event.target.style.background = '#3232';\n    _Ship__WEBPACK_IMPORTED_MODULE_2__.ship.hit(Number(event.target.innerText)) // Not sure what this is, check later\n    console.log('Find', event.target.innerText) \n\n\n    \n    const logPositions = getGridPosition(enemyWaters, getElementIndex(event.target))\n\n    \n\n    // USE getShipPositions to find the receivedattacks coordinates\n\n    \n\n    console.log('Find it - enemyWaters', logPositions ) // USE THIS AND GET POSITION FOR CLICKS\n\n    console.log('Random allyWaters', getGridPosition(allyWaters, Math.floor(Math.random() * allyWaters.childElementCount)) )\n    \n    \n    console.log('Find ally coords', allyWaters.children[Math.floor(Math.random() * allyWaters.childElementCount)] )\n    \n    // ABOVE WORKS, NOW FIND A WAY TO MAKE IT NOT COORDINATE TWICE\n}\n\nconst clickGridCell = (event) => {\n    const enemyBoardCoordinates = getGridPosition(enemyWaters, getElementIndex(event.target));\n    const allyBoardCoordinates = getGridPosition(allyWaters, getElementIndex(event.target));\n    const findShip = event.target;\n\n    event.target.innerHTML = `<i class=\"fas fa-circle\"></i>`\n    event.target.style.pointerEvents = 'none'\n    event.target.style.cursor = 'none'\n\n    \n\n    console.log('Check receives', getShipPositions.receiveAttack(getPlayerType.computerAi(randomSelectionCheck(array))))\n    console.log('Check enemy coordinates', getShipPositions.receiveAttack(getPlayerType.gamePlayer(enemyBoardCoordinates)))\n}\n\nconst randomSelectionCheck = (array) => { // ALLY TARGETS\n    const randomSelection = Math.floor(Math.random() * allyWaters.childElementCount) \n\n    if (array.indexOf(randomSelection) === -1 && allyWaters.children[randomSelection]) {\n        allyWaters.children[randomSelection].innerHTML = `<i class=\"fas fa-circle\"></i>`\n        allyWaters.children[randomSelection].dataset.shot = true\n        array.push(randomSelection)\n        console.log('Array', allyWaters.children[randomSelection].childNodes[0], allyWaters.children[randomSelection].childNodes[0].className === `fas fa-circle`)\n        console.log(array)\n        return allyWaters.children[randomSelection]\n    } else {\n        randomSelectionCheck(array) // CHECK THIS IN FUTURE TO SEE IF THIS STILL WORKS (RECURSION)\n        return \n    }\n}\n\nconst hoverOutGridCell = (event) => event.target.style.background = 'transparent'\n\nwindow.addEventListener('load', loadGridBlocks)\n\n\n\n\n\nconsole.log(rice)\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rice);\n\n\n//# sourceURL=webpack://battleship/./src/Functionality/Dom.js?");

/***/ }),

/***/ "./src/Functionality/GameBoard.js":
/*!****************************************!*\
  !*** ./src/Functionality/GameBoard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Functionality/Ship */ \"./src/Functionality/Ship.js\");\n\n\n\nconst GameBoard = () => {\n    return {\n        gameEnded: false,\n        missedShots: [],\n        shipPlacement() {\n\n        },\n        receiveAttack(coordinates, determineAttack, findNum) {\n\n            // COORDINATE PARAMETER TAKES THE X/Y VALUES\n            // CHECK IF FINDNUM PARAMETER CAN FIND THE NUMBER WITHIN HIT FUNCTION\n            // POTENTIALLY USE ONLY COORDINATE PARAMETER TO PASS IT INTO THE HIT FUNCTION\n            if (coordinates && determineAttack === 'Ship') {\n                console.log('Hi there', coordinates)\n                return (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().hit(coordinates)\n            }\n            else {\n                return this.missedAttacks(coordinates)\n            }\n        },\n        missedAttacks(missedCoordinate) {\n            this.missedShots.push(missedCoordinate)\n\n            return this.missedShots;\n        },\n        checkAllShipConditions(alliedShips, enemyShips) {\n            if (alliedShips === 5) return 'All allied ships sunk' \n            else if (enemyShips === 5) return 'All enemy ships sunk'\n            else return 'All enemy ships havent sunk' || 0\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship/./src/Functionality/GameBoard.js?");

/***/ }),

/***/ "./src/Functionality/Player.js":
/*!*************************************!*\
  !*** ./src/Functionality/Player.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dom */ \"./src/Functionality/Dom.js\");\n\n\nconst Player = () => {\n    return {\n        gamePlayer(playerTurn) {\n            return playerTurn\n        },\n        computerAi(computerTurn) {\n    \n            // RANDOMLY SELECT GRID CELL AFTER PLAYER'S TURN IS OVER\n            // USE THE DOM FUNCTIONALITY TO CALL THE COMPUTER METHOD\n            // USE MATH RANDOM TO SELECT A RANDOM DIV\n            // USE METHODS/FUNCTIONS TO FIND WHERE BOATS ARE\n            \n            return computerTurn\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://battleship/./src/Functionality/Player.js?");

/***/ }),

/***/ "./src/Functionality/Ship.js":
/*!***********************************!*\
  !*** ./src/Functionality/Ship.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"ship\": () => (/* binding */ ship),\n/* harmony export */   \"carrier\": () => (/* binding */ carrier),\n/* harmony export */   \"battleShip\": () => (/* binding */ battleShip),\n/* harmony export */   \"destroyer\": () => (/* binding */ destroyer),\n/* harmony export */   \"submarine\": () => (/* binding */ submarine),\n/* harmony export */   \"patrolBoat\": () => (/* binding */ patrolBoat)\n/* harmony export */ });\nconst CreateBattleShips = (shipName, length) => {\n    return {\n        shipName,\n        length, \n        sunk: false,\n        location: [], // USE PLACEMENT OF SHIP TO CALCULATE LOCATION, ALSO CHANGE LOCATION TO PARAMETER\n        hit(num) {\n            const numIndex = this.location.indexOf(num)\n\n            if (numIndex && num) {\n                this.location.push(num)\n                this.location.splice(numIndex, 1, 'X')\n            }\n            \n            return this.location\n        },\n        isSunk() {\n            if (this.location.every(x => x === 'X') && this.location.length === this.length) return this.sunk = true;\n            else return this.sunk = false;\n        },\n    }\n}\nconst ship = CreateBattleShips('Carrier', 5, false);\n\nconst carrier = CreateBattleShips('Carrier', 5, false);\nconst battleShip = CreateBattleShips('Battle Ship', 4, false);\nconst destroyer = CreateBattleShips('Destroyer', 3, false);\nconst submarine = CreateBattleShips('Submarine', 3, false);\nconst patrolBoat = CreateBattleShips('Patrol Boat', 2, false);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateBattleShips);\n\n\n//# sourceURL=webpack://battleship/./src/Functionality/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Functionality_Dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Functionality/Dom */ \"./src/Functionality/Dom.js\");\n\n\nconsole.log('Food', _Functionality_Dom__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;