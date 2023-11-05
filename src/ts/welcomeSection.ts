const canvas = <HTMLCanvasElement>document.getElementById("start-canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  draw()
})
const bgColor = '#181818'
const lineColor = '#ff0a00'
const dotsCount = Math.floor(Math.min(window.innerHeight, window.innerWidth) / 20)
const lengthLine = 120
const dotsSpeed = 0.01
const dots: { x: number; y: number; mx: number; my: number; suit: string }[] = []

const printMousePos = (e: MouseEvent) => {
  const moveX = (getRandomInt(100) - 50) * dotsSpeed
  const moveY = (getRandomInt(100) - 50) * dotsSpeed
  const suits = ["♠", "♥", "♦", "♣"]
  const suit = suits[getRandomInt(suits.length)]
  dots.push({
    x: e.clientX,
    y: e.clientY,
    mx: moveX,
    my: moveY,
    suit: suit,
  })
}

canvas.addEventListener("click", printMousePos)

const initDots = () => {
  for (let i = 0; i < dotsCount; i++) {
    const moveX = (getRandomInt(100) - 50) * dotsSpeed
    const moveY = (getRandomInt(100) - 50) * dotsSpeed
    const suits = ["♠", "♥", "♦", "♣"]
    const suit = suits[getRandomInt(suits.length)]
    dots.push({
      x: getRandomInt(canvas.width),
      y: getRandomInt(canvas.height),
      mx: moveX,
      my: moveY,
      suit: suit,
    })
  }
}
initDots()

const draw = () => {
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; dots.length > i; i++) {
    ctx.strokeStyle = lineColor
    for (let j = i + 1; dots.length > j; j++) {
      const distance = Math.sqrt(
        Math.pow(dots[i].x - dots[j].x, 2) +
        Math.pow(dots[i].y - dots[j].y, 2)
      )
      if (distance < lengthLine) {
        ctx.globalAlpha = 1 - distance / lengthLine
        ctx.beginPath()
        ctx.moveTo(dots[i].x, dots[i].y)
        ctx.lineTo(dots[j].x, dots[j].y)
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }
    if (
      dots[i].x + dots[i].mx > canvas.width ||
      dots[i].x + dots[i].mx < 0
    ) {
      dots[i].mx = dots[i].mx * -1
    }
    dots[i].x = dots[i].x + dots[i].mx
    if (
      dots[i].y + dots[i].my > canvas.height ||
      dots[i].y + dots[i].my < 0
    ) {
      dots[i].my = dots[i].my * -1
    }
    dots[i].y = dots[i].y + dots[i].my
    ctx.font = "20px Arial"
    ctx.fillStyle = lineColor
    ctx.fillText(
      dots[i].suit,
      dots[i].x - 5,
      dots[i].y + 5
    )
  }
}
setInterval(draw, 20)

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}