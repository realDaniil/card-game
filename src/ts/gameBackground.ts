import ConfettiGenerator from "confetti-js"
import diamonds from '../images/diamonds.svg'
import spades from '../images/spades.svg'
import hearts from '../images/hearts.svg'
import clubs from '../images/clubs.svg'

const backgroundElement = document.getElementById('game-canvas')
const backgroundSettings = {
  target: backgroundElement,
  rotate: true,
  start_from_edge: true,
  max: 8,
  clock: 1,
  props: [
    {
      type: "svg",
      src: diamonds,
      size: 25,
      weight: 1
    },
    {
      type: "svg",
      src: spades,
      size: 22,
      weight: 1
    },
    {
      type: "svg",
      src: hearts,
      size: 20,
      weight: 1
    },
    {
      type: "svg",
      src: clubs,
      size: 20,
      weight: 1
    }
  ]
}
const background = new ConfettiGenerator(backgroundSettings)
background.render()