import { botThinksElement, tableDiv, winText } from "./htmlElements.ts";
import { botDeck, deck, playerDeck, tableRanks, trumpSuit } from "./script.ts"
import { renderWinSection } from "./winSection.ts";

export const shuffleDeck = (array: string[]) => {
  array.length = 0
  array.push(
    '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠', 'A♠',
    '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣', 'A♣',
    '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥', 'A♥',
    '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦', 'A♦'
  )
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export const changeSuitColor = (cardRankAndSuit: string, element: HTMLElement) => {
  if (cardRankAndSuit.slice(-1) === '♥') {
    element.className += ' red'
  } else if (cardRankAndSuit.slice(-1) === '♣') {
    element.className += ' green'
  } else if (cardRankAndSuit.slice(-1) === '♦') {
    element.className += ' blue'
  } else element.className += ' black'
}

export const cardsSorting = (a: any, b: any, type: string = 'default') => {
  const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const suits = ['♠', '♥', '♦', '♣'].filter(i => i !== trumpSuit)
  suits.push(trumpSuit)
  const aRank = ranks.indexOf(a.slice(0, -1))
  const aSuit = suits.indexOf(a.slice(-1))
  const bRank = ranks.indexOf(b.slice(0, -1))
  const bSuit = suits.indexOf(b.slice(-1))
  if (type === 'botAttack') {
    return aRank - bRank
  }
  if (aSuit === bSuit) {
    return aRank - bRank
  } else {
    return aSuit - bSuit
  }
}

export const canPlayCard = (card: string) => {
  if (!tableRanks.length) {
    // Если на столе еще нет карт, можно положить любую
    tableRanks.push(card.slice(0, -1))
    return true
  }
  // Проверяем, соответствует ли карта
  return tableRanks.includes(card.slice(0, -1))
}

// Функция для сравнения рангов карт
const compareCardRanks = (rank1: string, rank2: string) => {
  const ranks = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const index1 = ranks.indexOf(rank1)
  const index2 = ranks.indexOf(rank2)
  return index1 > index2
}

export const isAttackSuccessful = (attackCard: string, defenseCard: string, trumpSuit: string) => {
  const attackRank = attackCard.slice(0, -1)
  const attackSuit = attackCard.slice(-1)
  const defenseRank = defenseCard.slice(0, -1)
  const defenseSuit = defenseCard.slice(-1)
  // Проверяем является ли атакующая карта козырем
  const isAttackTrump = attackSuit === trumpSuit
  // Проверяем является ли защищающаяся карта козырем
  const isDefenseTrump = defenseSuit === trumpSuit
  // Если атакующая карта козырь, а защищающаяся нет, атака успешная
  if (isAttackTrump && !isDefenseTrump) {
    return true
  }
  // Если обе карты козыри, сравниваем их ранги
  if (isAttackTrump && isDefenseTrump) {
    // Сравниваем ранги козырных карт
    return compareCardRanks(attackRank, defenseRank)
  }
  // Если обе карты не козыри, сравниваем их масти
  if (!isAttackTrump && !isDefenseTrump) {
    if (attackSuit === defenseSuit) {
      // Если масти одинаковые, сравниваем ранги карт
      return compareCardRanks(attackRank, defenseRank)
    } else {
      // Если масти разные, атака успешна
      return false
    }
  }
  // Если атакующая карта не козырь, а защищающаяся козырь, атака неуспешная
  if (!isAttackTrump && isDefenseTrump) {
    return false
  }
}

export const botThinks = (isThink: boolean) => {
  if (isThink) {
    botThinksElement.className = 'active'
    tableDiv.style.pointerEvents = 'none'
  } else {
    botThinksElement.className = ''
    tableDiv.style.pointerEvents = ''
  }
}

export const isWin = () => {
  if (!deck.length) {
    if (!playerDeck.length) {
      winText.innerHTML = 'Player won'
      winText.className += ' blue'
      renderWinSection(false)
    } else if (!botDeck.length) {
      winText.innerHTML = 'Bot won'
      winText.className += ' red'
      renderWinSection(true)
    }
  }
}