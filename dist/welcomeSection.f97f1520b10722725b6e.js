/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/welcomeSection.ts":
/*!******************************!*\
  !*** ./ts/welcomeSection.ts ***!
  \******************************/
/***/ (() => {

eval("var canvas = document.getElementById(\"start-canvas\");\nvar ctx = canvas.getContext(\"2d\");\ncanvas.width = window.innerWidth;\ncanvas.height = window.innerHeight;\nwindow.addEventListener('resize', function () {\n  canvas.width = window.innerWidth;\n  canvas.height = window.innerHeight;\n  draw();\n});\nvar bgColor = '#181818';\nvar lineColor = '#ff0a00';\nvar dotsCount = Math.floor(Math.min(window.innerHeight, window.innerWidth) / 20);\nvar lengthLine = 120;\nvar dotsSpeed = 0.01;\nvar dots = [];\nvar printMousePos = function printMousePos(e) {\n  var moveX = (getRandomInt(100) - 50) * dotsSpeed;\n  var moveY = (getRandomInt(100) - 50) * dotsSpeed;\n  var suits = [\"♠\", \"♥\", \"♦\", \"♣\"];\n  var suit = suits[getRandomInt(suits.length)];\n  dots.push({\n    x: e.clientX,\n    y: e.clientY,\n    mx: moveX,\n    my: moveY,\n    suit: suit\n  });\n};\ncanvas.addEventListener(\"click\", printMousePos);\nvar initDots = function initDots() {\n  for (var i = 0; i < dotsCount; i++) {\n    var moveX = (getRandomInt(100) - 50) * dotsSpeed;\n    var moveY = (getRandomInt(100) - 50) * dotsSpeed;\n    var suits = [\"♠\", \"♥\", \"♦\", \"♣\"];\n    var suit = suits[getRandomInt(suits.length)];\n    dots.push({\n      x: getRandomInt(canvas.width),\n      y: getRandomInt(canvas.height),\n      mx: moveX,\n      my: moveY,\n      suit: suit\n    });\n  }\n};\ninitDots();\nvar draw = function draw() {\n  ctx.fillStyle = bgColor;\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n  for (var i = 0; dots.length > i; i++) {\n    ctx.strokeStyle = lineColor;\n    for (var j = i + 1; dots.length > j; j++) {\n      var distance = Math.sqrt(Math.pow(dots[i].x - dots[j].x, 2) + Math.pow(dots[i].y - dots[j].y, 2));\n      if (distance < lengthLine) {\n        ctx.globalAlpha = 1 - distance / lengthLine;\n        ctx.beginPath();\n        ctx.moveTo(dots[i].x, dots[i].y);\n        ctx.lineTo(dots[j].x, dots[j].y);\n        ctx.stroke();\n        ctx.globalAlpha = 1;\n      }\n    }\n    if (dots[i].x + dots[i].mx > canvas.width || dots[i].x + dots[i].mx < 0) {\n      dots[i].mx = dots[i].mx * -1;\n    }\n    dots[i].x = dots[i].x + dots[i].mx;\n    if (dots[i].y + dots[i].my > canvas.height || dots[i].y + dots[i].my < 0) {\n      dots[i].my = dots[i].my * -1;\n    }\n    dots[i].y = dots[i].y + dots[i].my;\n    ctx.font = \"20px Arial\";\n    ctx.fillStyle = lineColor;\n    ctx.fillText(dots[i].suit, dots[i].x - 5, dots[i].y + 5);\n  }\n};\nsetInterval(draw, 20);\nfunction getRandomInt(max) {\n  return Math.floor(Math.random() * Math.floor(max));\n}\n\n//# sourceURL=webpack:///./ts/welcomeSection.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./ts/welcomeSection.ts"]();
/******/ 	
/******/ })()
;