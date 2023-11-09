import { botDeckDiv, discardedBtn, tableDiv } from "./htmlElements.ts"
import { cleanSelectCard } from "./playerMove.ts"
import {
  isBotDefending,
  tableRanks,
  allTableDeck,
  notBrokenDeckCards,
  playerAttackCards,
  botAttackCards,
  botDeck,
  isBotQueue,
  trumpSuit,
  changeSuitColor,
  isBotTake,
  setIsBotDefending,
  setIsBotTake,
  resetValues,
  changeActionBtns,
  setIsBotQueue,
  cleanTableDiv,
  dealingCardsToBotAndPlayer
} from "./script.ts"
import { canPlayCard, cardsSorting, isAttackSuccessful, isWin, botThinks } from "./utils.ts"

export const botMove = () => {
  if ((!isBotQueue && allTableDeck.length) || isBotQueue) botThinks(true)
  setTimeout(() => {
    if (isBotDefending && !isBotTake) {
      for (let i = 0; i < notBrokenDeckCards.length; i++) {
        for (let j = 0; j < botDeck.length; j++) {
          if (isAttackSuccessful(botDeck[j], notBrokenDeckCards[i], trumpSuit)) {
            notBrokenDeckCards.splice(i, 1)
            allTableDeck.push(botDeck[j])
            tableRanks.push(botDeck[j].slice(0, -1))
            botDeckDiv.children[j].className = 'card defense'
            changeSuitColor(botDeck[j], botDeckDiv.children[j] as HTMLElement)
            tableDiv.children[playerAttackCards.length - 1].appendChild(botDeckDiv.children[j])
            botDeck.splice(j, 1)
            if (!notBrokenDeckCards.length) {
              discardedBtn.style.display = 'block'
            }
            break
          }
          discardedBtn.style.display = ''
          if (j + 1 === botDeck.length) {
            setIsBotTake(true)
            changeActionBtns()
          }
        }
      }
    } else if (isBotQueue) {
      let attackArray = [...botDeck]
      attackArray.sort((a, b) => cardsSorting(a, b, 'botAttack'))
      attackArray = attackArray.filter(card => !card.endsWith(trumpSuit))
      if (!attackArray.length) {
        attackArray = [...botDeck.sort((a, b) => cardsSorting(a, b, 'botAttack'))]
      }
      let attackCard = attackArray[0]
      if (botAttackCards.length) {
        attackArray = []
        for (let i = 0; i < botDeck.length; i++) {
          if (canPlayCard(botDeck[i])) {
            attackArray.push(botDeck[i])
          }
        }
        attackCard = attackArray[0]
      }
      if (!notBrokenDeckCards.length && attackCard === undefined) {
        cleanSelectCard() // для фикса бага с выбранной картой при обновлении колод
        dealingCardsToBotAndPlayer()
        setIsBotQueue(false)
        cleanTableDiv(true)
        discardedBtn.style.display = 'none'
        setIsBotDefending(true)
        resetValues()
      }
      if (attackCard === undefined) return botThinks(false)
      if (botAttackCards.length < 6 && canPlayCard(attackCard)) {
        const card: HTMLElement = document.querySelector(`[data-card='${attackCard}']`)
        card.className = 'card attack'
        changeSuitColor(attackCard, card)
        tableDiv.children[botAttackCards.length].appendChild(card)
        botAttackCards.push(attackCard)
        allTableDeck.push(attackCard)
        notBrokenDeckCards.push(attackCard)
        const cardIndex = botDeck.indexOf(attackCard)
        botDeck.splice(cardIndex, 1)
        botMove()
      } else if (botAttackCards.length > 5 && !notBrokenDeckCards.length) {
        cleanSelectCard()
        dealingCardsToBotAndPlayer()
        setIsBotQueue(false)
        cleanTableDiv(true)
        discardedBtn.style.display = 'none'
        setIsBotDefending(true)
        resetValues()
      }
    }
    isWin()
    botThinks(false)
  }, 1000)
}