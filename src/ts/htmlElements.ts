export const playerDeckDiv = document.getElementById('player-deck')!
export const botDeckDiv = document.getElementById('bot-deck')!
export const deckDiv = document.getElementById('deck')!
export const tableDiv = document.getElementById('table')!
export const passBtn = document.getElementById('pass-button')!
export const discardedBtn = document.getElementById('discarded-button')!
export const botMessage = document.getElementById('bot-message')!
export const playerTakeBtn = document.getElementById('i-take-button')!
export const playerAndBotTurnP = document.getElementById('player-and-bot-turn-p')!
export const winText = document.getElementById('win-text')!
export const botThinksElement = document.getElementById('bot-thinks')!
export const cardsCountElement = document.getElementById('cards-count')!

// Добавляем прокрутку колодам с помощью колеса мыши  
playerDeckDiv.addEventListener('wheel', (e: WheelEvent) => {
  if (e.deltaMode === e.DOM_DELTA_PIXEL) {
    playerDeckDiv.scrollLeft += e.deltaY
    e.preventDefault()
  }
})

botDeckDiv.addEventListener('wheel', (e: WheelEvent) => {
  if (e.deltaMode === e.DOM_DELTA_PIXEL) {
    botDeckDiv.scrollLeft += e.deltaY
    e.preventDefault()
  }
})