import { trim } from 'lodash'
import { readFileSync } from 'fs'

const dataFile = 'day4.example.txt'
const data = readFileSync(dataFile, 'utf8')
const lines = data.split("\n")
const draws = lines[0].split(',').map(x => parseInt(x))

const cards = [[]]
lines.slice(2).forEach((line: string) => {
  if (line.length !== 0) {
    if (cards[cards.length - 1].length === 5) cards.push([])
    let card = cards[cards.length - 1]
    card.push(trim(line).split(/\s+/).map(x => parseInt(x)))
  }
})

console.log(cards)
