import { trim, some, every, unzip, flatten, sum } from 'lodash'
import { readFileSync } from 'fs'

const lineToNumbers = (line: string) => trim(line).split(/\s+/).map((x: string) => parseInt(x))

// const dataFile = 'day4.example.txt'
const dataFile = 'day4.txt'
const data = readFileSync(dataFile, 'utf8')
const lines: string[] = data.split("\n")
const draws: number[] = lines[0].split(',').map(x => parseInt(x))

const cards = [[]]
lines.slice(2).forEach((line: string) => {
  if (line.length !== 0) {
    if (cards[cards.length - 1].length === 5) cards.push([])
    let card = cards[cards.length - 1]
    card.push(lineToNumbers(line))
  }
})

// console.log(cards)
const isAnyLineFullNegative = (card) => some(card, (line) => every(line, x => x < 0))
const isCardWinning = (card) => isAnyLineFullNegative(card) || isAnyLineFullNegative(unzip(card))

const wonCards = []
let lastScore = 0
draws.forEach((draw) => {
  // console.log(`DRAW ${draw}`)
  // console.log(cards)
  cards.forEach((card, cardIndex) => {
    // cards.forEach((line, ci) => cards[ci] = line.map(el => el === draw ? -el : el))
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (card[i][j] === draw) card[i][j] *= -1
      }
    }
    const isWin = isCardWinning(card)
    // console.log(card)
    // console.log(`WIN: ${isWin ? 'YES' : 'NO'}`)
    if (isWin) {
      if (!wonCards.includes(cardIndex)) {
        wonCards.push(cardIndex)
        const unmarkedSum = sum(flatten(card).filter(x => x > 0))
        const result = unmarkedSum * draw
        if (wonCards.length === 1) console.log('FIRST SCORE: ', result)
        lastScore = result
      }
    }
  })
})

console.log('LAST SCORE: ', lastScore)
