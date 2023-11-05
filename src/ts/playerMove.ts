import { botMove } from "./botMove.ts"
import { playerDeckDiv, tableDiv } from "./htmlElements.ts"
import {
  tableRanks,
  allTableDeck,
  notBrokenDeckCards,
  playerAttackCards,
  playerDeck,
  isBotQueue,
  trumpSuit,
  changeSuitColor,
  setIsBotDefending,
  changeActionBtns,
} from "./script.ts"
import { canPlayCard, isAttackSuccessful, isWin } from "./utils.ts"

const resetPlayerCardsStyles = () => {
  for (let i = 0; i < playerDeckDiv.children.length; i++) {
    (playerDeckDiv.children[i] as HTMLElement).style.border = '';
    (playerDeckDiv.children[i] as HTMLElement).style.scale = '';
    (playerDeckDiv.children[i] as HTMLElement).style.margin = '';
  }
}

export const playerMove = () => {
  let selectedCard: HTMLElement
  let temporaryCard: HTMLElement | null
  let offsetX: number, offsetY: number, firstY: number, isTouch: boolean, clientX: number, clientY: number
  const downHandler = (e) => {
    isTouch = Boolean(e.touches)
    const target = isTouch ? e.touches[0].target : e.target
    if (target.classList.contains('card')) {
      temporaryCard = e.target as HTMLElement
      firstY = isTouch ? e.touches[0].clientY : e.clientY
      temporaryCard.style.border = '1px solid rgb(255, 255, 255)'
      temporaryCard.style.scale = '0.9'
      temporaryCard.style.margin = '0 10px'
      if (isTouch) {
        document.addEventListener('touchmove', moveHandler)
      } else document.addEventListener('mousemove', moveHandler)
    }
  }

  const moveHandler = (e) => {
    clientX = isTouch ? e.touches[0].clientX : e.clientX
    clientY = isTouch ? e.touches[0].clientY : e.clientY
    if (selectedCard) {
      selectedCard.style.left = clientX - offsetX + 'px'
      selectedCard.style.top = clientY - offsetY + 'px'
      selectedCard.style.zIndex = '2'
      selectedCard.style.position = 'fixed'
      return
    }
    if (playerDeckDiv.getBoundingClientRect().y > clientY && temporaryCard && !selectedCard) {
      selectedCard = temporaryCard
      temporaryCard = null
      const rect = selectedCard.getBoundingClientRect()
      offsetX = rect.width / 2
      offsetY = rect.height / 2
    } else if (temporaryCard && temporaryCard !== document.elementFromPoint(clientX, firstY)
      && document.elementFromPoint(clientX, firstY).classList.contains('card')) {
      resetPlayerCardsStyles()
      temporaryCard = document.elementFromPoint(clientX, firstY) as HTMLElement
      temporaryCard!.style.border = '1px solid rgb(255, 255, 255)'
      temporaryCard!.style.scale = '0.9'
      temporaryCard.style.margin = '0 10px'
    }
  }

  const upHandler = (e) => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    resetPlayerCardsStyles()
    if (selectedCard) {
      selectedCard.style.display = 'none'
      let elementUnderCard = document.elementFromPoint(clientX, clientY)
      if (elementUnderCard.classList.contains('card')) {
        elementUnderCard = elementUnderCard.parentElement
      }
      selectedCard.style.display = ''
      if (elementUnderCard.childNodes.length < 2) {
        const tableRect = tableDiv.getBoundingClientRect()
        if (
          clientX >= tableRect.left &&
          clientX <= tableRect.right &&
          clientY >= tableRect.top &&
          clientY <= tableRect.bottom
        ) {
          if (elementUnderCard.classList.contains('table__card-holder')) {
            const attackCard = selectedCard.dataset.card
            if (!isBotQueue && playerAttackCards.length < 6 && canPlayCard(attackCard)) {
              selectedCard.className = 'card attack'
              changeSuitColor(attackCard, selectedCard)
              tableDiv.children[playerAttackCards.length].appendChild(selectedCard)
              playerAttackCards.push(attackCard)
              allTableDeck.push(attackCard)
              notBrokenDeckCards.push(attackCard)
              const cardIndex = playerDeck.indexOf(attackCard)
              playerDeck.splice(cardIndex, 1)
              setIsBotDefending(true)
              botMove()
              changeActionBtns()
            } else if (isBotQueue && elementUnderCard.childNodes.length) {
              const defenseCard = (elementUnderCard.firstChild as HTMLElement).dataset.card
              if (isAttackSuccessful(attackCard, defenseCard, trumpSuit)) {
                notBrokenDeckCards.splice(notBrokenDeckCards.indexOf(defenseCard), 1)
                allTableDeck.push(attackCard)
                tableRanks.push(attackCard.slice(0, -1))
                selectedCard.className = 'card defense'
                changeSuitColor(attackCard, selectedCard)
                elementUnderCard.appendChild(selectedCard)
                playerDeck.splice(playerDeck.indexOf(attackCard), 1)
                botMove()
                changeActionBtns()
              }
            }
          }
        }
      }
      selectedCard.style.left = ''
      selectedCard.style.top = ''
      selectedCard.style.zIndex = ''
      selectedCard.style.position = ''
      selectedCard = null
      temporaryCard = null
      isWin()
    }
  }

  playerDeckDiv.addEventListener('mousedown', downHandler)
  playerDeckDiv.addEventListener('touchstart', downHandler)
  document.addEventListener('mouseup', upHandler)
  document.addEventListener('touchend', upHandler)
}