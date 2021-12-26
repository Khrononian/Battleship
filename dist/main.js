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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameBoard */ \"./src/Functionality/GameBoard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/Functionality/Ship.js\");\n\n\n\nconst rice = 'Mans'\nconst enemyWaters = document.querySelector('.enemy-waters')\n\nconst loadGridBlocks = () => { // WORK ON GETTING COORDINATES\n    for (let i = 0; i < 100; i++) {\n        const div = document.createElement('div');\n\n        div.classList.add('grid-cell')\n        div.classList.add('grid-enemy')\n        div.addEventListener('mouseover', hoverGridCell)\n        div.addEventListener('mouseout', hoverOutGridCell)\n        enemyWaters.append(div)\n\n\n    }\n}\n\nconst hoverGridCell = (event) => {\n    const getShipPositions = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])()\n\n    event.target.style.background = '#3232';\n    _Ship__WEBPACK_IMPORTED_MODULE_1__.ship.hit(Number(event.target.innerText))\n    console.log('Find', event.target.innerText)\n    \n    const getGridPosition = index => {\n        let offset = Number(window.getComputedStyle(enemyWaters.children[0]).gridColumnStart) - 1\n\n        if (isNaN(offset)) offset = 0;\n\n        const colCount = window.getComputedStyle(enemyWaters).gridTemplateColumns.split(' ').length;\n        const rowPosition = Math.floor((index + offset) / colCount);\n        const colPosition = (index + offset) % colCount\n\n        return { row: rowPosition, column: colPosition }\n    }\n\n    const getElementIndex = (element) => {\n        const findElement = element.parentNode.children;\n       \n        for (let i = 0; i < findElement.length; i++) if (findElement[i] === element) return i\n    }\n    \n    const logPositions = getGridPosition(getElementIndex(event.target))\n    console.log('Get position', getShipPositions.receiveAttack(getGridPosition(getElementIndex(event.target))))\n    // USE getShipPositions to find the receivedattacks coordinates\n    // ALSO, USE EVENT TARGET FOR THE HIT FUNCTION WHEN THE GRID IS CLICKED\n    // USE CLICK EVENT TO ADD AN ARRAY OF THE ROW/COLUMNS AND PUSH IT INTO AN EMPTY ARRAY FOR HIT FUNC TO FIND\n\n    console.log('Find it', logPositions )\n\n    \n}\n\nconsole.log('Log', hoverGridCell)\n\nconst hoverOutGridCell = (event) => event.target.style.background = 'transparent'\n\nwindow.addEventListener('load', loadGridBlocks)\n\n\n\n\n\nconsole.log(rice)\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rice);\n\n//# sourceURL=webpack://battleship/./src/Functionality/Dom.js?");

/***/ }),

/***/ "./src/Functionality/GameBoard.js":
/*!****************************************!*\
  !*** ./src/Functionality/GameBoard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nconst GameBoard = () => {\n    return {\n        shipPlacement() {\n\n        },\n        receiveAttack(coordinate, findNum) {\n            const gridCells = document.querySelectorAll('.grid-enemy');\n            // COORDINATE PARAMETER TAKES THE X/Y VALUES\n            // CHECK IF FINDNUM PARAMETER CAN FIND THE NUMBER WITHIN HIT FUNCTION\n            // POTENTIALLY USE ONLY COORDINATE PARAMETER TO PASS IT INTO THE HIT FUNCTION\n\n            return coordinate\n        },\n        checkShipCondition() {\n\n        }\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://battleship/./src/Functionality/GameBoard.js?");

/***/ }),

/***/ "./src/Functionality/Ship.js":
/*!***********************************!*\
  !*** ./src/Functionality/Ship.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"ship\": () => (/* binding */ ship)\n/* harmony export */ });\nconst CreateBattleShips = (shipName, length) => {\n    return {\n        shipName,\n        length, \n        sunk: false,\n        location: [0, 1, 2, 3, 4], // USE PLACEMENT OF SHIP TO CALCULATE LOCATION, ALSO CHANGE LOCATION TO PARAMETER\n        hit(num) {\n            console.log(this.location, 'Food')\n            const numIndex = this.location.indexOf(num)\n            if (this.location.indexOf(num) !== -1) {\n                console.log('FOUND', num, numIndex)\n                this.location.splice(numIndex, 1, 'X')\n                console.log('Changed', this.location)\n            }\n            else console.log(num)\n            \n            return num\n        },\n        isSunk() {\n            if (this.location.every(x => x === 'X')) return this.sunk = true;\n            else return false;\n        },\n\n    }\n}\nconst ship = CreateBattleShips('Carrier', 5, false);\nconsole.log(ship, ship.isSunk(), ship.sunk) // Works\nsetInterval(() => {\n    console.log('Test', ship, ship.hit(2), ship.isSunk(), 'Oh?')\n},2500)\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreateBattleShips);\n\n\n//# sourceURL=webpack://battleship/./src/Functionality/Ship.js?");

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