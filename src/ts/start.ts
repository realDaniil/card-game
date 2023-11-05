import { startGame } from "./script.ts"

const gameInit = () => {
  document.getElementById('start-section').style.display = 'none'
  document.getElementById('game-section').style.display = 'grid'
  startGame()
}

export default function init() {
  document.getElementById('start-game-button').addEventListener('click', gameInit)
}