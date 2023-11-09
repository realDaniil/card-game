import { botMove } from "./botMove.ts"
import { playerMove } from './playerMove.ts'
import { cardsSorting, changeSuitColor, shuffleDeck } from "./utils.ts"
import { botDeckDiv, botMessage, cardsCountElement, deckDiv, discardedBtn, passBtn, playerAndBotTurnP, playerDeckDiv, playerTakeBtn, tableDiv } from './htmlElements.ts'
import { selectLang } from "./translate.ts"
import translateArr from '../lang.json'

const deck:string[] = []
const tableRanks:string[] = []
const allTableDeck:string[] = []
const notBrokenDeckCards:string[] = []
const playerAttackCards:string[] = []
const botAttackCards:string[] = []
const playerDeck:string[] = []
const botDeck:string[] = []

let isBotQueue: boolean, isBotDefending: boolean, isBotTake: boolean
let trumpSuit: string

const updateDeckDiv = () => {
  deckDiv.innerHTML = ''
  for (let i = 0; i < deck.length; i++) {
    const cardRankAndSuit = deck[i]
    const card = document.createElement('div')
    card.innerHTML = `
    <div class='top'>${cardRankAndSuit}</div>
    <div class='suit'>${cardRankAndSuit.slice(-1)}</div>
    <div class='bottom'>${cardRankAndSuit}</div>
  `
    card.dataset.card = cardRankAndSuit
    card.className = i + 1 < deck.length ? 'card hide' : 'card visible'
    changeSuitColor(cardRankAndSuit, card)
    if (i + 1 < deck.length) card.style.transform = `translate(${-i / 5}px, ${-i / 5}px )`
    deckDiv.appendChild(card)
  }
  if (deck.length) {
    cardsCountElement.innerHTML = deck.length + ''
  } else {
    cardsCountElement.innerHTML = trumpSuit
    cardsCountElement.style.fontSize = '40px'
    cardsCountElement.style.top = '50%'
    cardsCountElement.style.transform = 'translateY(-50%)'
  }
}

const dealingCards = (targetArray: string[], source: number | string[]) => {
  const parentDiv = (targetArray === playerDeck) ? playerDeckDiv! : botDeckDiv!
  parentDiv.innerHTML = ''
  if (Array.isArray(source)) {
    for (let i = 0; i < source.length; i++) {
      targetArray.push(source[i])
    }
  } else if (typeof source === 'number') {
    for (let i = 0; i < source; i++) {
      if (!deck.length) break
      const cardRankAndSuit = deck.shift()
      if (cardRankAndSuit !== undefined) {
        targetArray.push(cardRankAndSuit)
      }
    }
  }
  targetArray.sort(cardsSorting)
  for (let i = 0; i < targetArray.length; i++) {
    const card = document.createElement('div')
    card.innerHTML = `
  <div class='top'>${targetArray[i]}</div>
  <div class='suit'>${targetArray[i].slice(-1)}</div>
  <div class='bottom'>${targetArray[i]}</div>
`
    card.dataset.card = targetArray[i]
    card.className = parentDiv === botDeckDiv ? 'card hide' : 'card visible'
    changeSuitColor(targetArray[i], card)
    parentDiv.appendChild(card)
  }
  updateDeckDiv()
}

const dealingCardsToBotAndPlayer = () => {
  if (isBotQueue) {
    dealingCards(botDeck, 6 - botDeck.length)
    dealingCards(playerDeck, 6 - playerDeck.length)
  } else {
    dealingCards(playerDeck, 6 - playerDeck.length)
    dealingCards(botDeck, 6 - botDeck.length)
  }
}

const changeActionBtns = () => {
  if (isBotQueue) {
    playerAndBotTurnP.innerText = translateArr['bots-turn'][selectLang]
    playerTakeBtn.style.display = 'block'
  } else {
    playerAndBotTurnP.innerText = translateArr['your-turn'][selectLang]
    playerTakeBtn.style.display = 'none'
  }
  if (isBotTake) {
    botMessage.innerText = 'I Take'
    passBtn.style.display = 'block'
  } else {
    botMessage.innerText = ''
  }
}

const resetValues = () => {
  playerAttackCards.length = 0
  botAttackCards.length = 0
  notBrokenDeckCards.length = 0
  allTableDeck.length = 0
  tableRanks.length = 0
  changeActionBtns()
}

const startGame = () => {
  isBotQueue = Boolean(Math.floor(Math.random() * 2))
  shuffleDeck(deck)
  trumpSuit = deck[deck.length - 1].slice(-1)
  changeSuitColor(' ' + trumpSuit, cardsCountElement)
  updateDeckDiv()
  dealingCards(playerDeck, 6)
  dealingCards(botDeck, 6)
  resetValues()
  botMove()
  playerMove()
}

const cleanTableDiv = (isInTrash: boolean = false) => {
  if (isInTrash) {
    const cards = Array.from(document.querySelectorAll('#table .card'))
    for (let card of cards) {
      card.className += ' trash';
      (card as HTMLElement).style.left = card.getBoundingClientRect().x + 'px';
      (card as HTMLElement).style.top = card.getBoundingClientRect().y + 'px';
      document.body.append(card)
      setTimeout(() => {
        card.remove()
      }, 1000)
    }
  }
  for (let i = 0; i < tableDiv.children.length; i++) {
    tableDiv.children[i].innerHTML = ''
  }
}

passBtn.addEventListener('click', () => {
  dealingCards(botDeck, allTableDeck)
  cleanTableDiv()
  dealingCards(playerDeck, 6 - playerDeck.length)
  passBtn.style.display = 'none'
  isBotTake = false
  resetValues()
})

discardedBtn.addEventListener('click', () => {
  cleanTableDiv(true)
  dealingCardsToBotAndPlayer()
  discardedBtn.style.display = 'none'
  isBotQueue = true
  isBotDefending = false
  resetValues()
  botMove()
})

playerTakeBtn.addEventListener('click', () => {
  dealingCards(playerDeck, allTableDeck)
  cleanTableDiv()
  dealingCards(botDeck, 6 - botDeck.length)
  playerTakeBtn.style.display = 'none'
  discardedBtn.style.display = 'none'
  isBotQueue = true
  isBotDefending = false
  resetValues()
  botMove()
})

export function setIsBotDefending(value: boolean) {
  isBotDefending = value
}

export function setIsBotTake(value: boolean) {
  isBotTake = value
}

export function setIsBotQueue(value: boolean) {
  isBotQueue = value
}

export {
  deck,
  tableRanks,
  allTableDeck,
  notBrokenDeckCards,
  playerAttackCards,
  botAttackCards,
  playerDeck,
  botDeck,
  isBotDefending,
  isBotQueue,
  trumpSuit,
  changeSuitColor,
  isBotTake,
  dealingCards,
  resetValues,
  changeActionBtns,
  startGame,
  cleanTableDiv,
  dealingCardsToBotAndPlayer
}