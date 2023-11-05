import ConfettiGenerator from "confetti-js"
import hat from '../images/hat.svg'

export const renderWinSection = (isBotWin: boolean) => {
  document.getElementById('win-btn').className += !isBotWin && ' blue' 
  const confettiElement = document.getElementById('win-canvas')
  const confettiSettings = {
    target: confettiElement,
    rotate: true,
    start_from_edge: true,
    max: isBotWin ? 15 : 60 ,
    props: isBotWin ? [{
      type: "svg",
      src: hat,
      size: 45,
      weight: 1
    }]
      :
      [
        "circle",
        "square",
        "triangle",
        "line"
      ]
  }
  const confetti = new ConfettiGenerator(confettiSettings)
  confetti.render()
  setTimeout(() => {
    document.getElementById('win-section').style.display = 'flex'
  }, 1000)
}

document.getElementById('win-btn').addEventListener('click', () => {
  window.location.reload()
})