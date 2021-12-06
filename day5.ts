// import { trim, some, every, unzip, flatten, sum } from 'lodash'
import { min, flatten, unzip, max, times } from 'lodash'
import { readFileSync } from 'fs'

// const dataFile = 'day5.example.txt'
const dataFile = 'day5.txt'
const data = readFileSync(dataFile, 'utf8')
const lines: string[] = data.split("\n").filter(line => line.length)

const vents = lines.map(l => l.split(' -> ').map(points => points.split(',').map(x => parseInt(x))))
// console.log(vents)

const printLand = (land) => {
  console.log('x:' + times(10, String).join(''))
  console.log('y ' + times(10, () => '|').join(''))
  land.forEach((row, index) => {
    console.log(`${index}-` + row.map(x => x === 0 ? '.' : (x).toString()).join(''))
  })
}

const [xs, ys] = unzip(flatten(vents))
const width = max(xs) + 1
const height = max(ys) + 1

let land = []
for (let y = 0; y < height; y++) {
  land.push(new Array(width).fill(0))
}
// printLand(land)
// console.log('vents', vents)
const applyVentToLand = (vent, land) => {
  const [x1, y1] = vent[0]
  const [x2, y2] = vent[1]
  // console.log('vent', vent)
  if (x1 === x2) {
    for (let yi = min([y1, y2]); yi <= max([y1, y2]); yi++) land[yi][x1] += 1
  } else if (y1 === y2) {
    for (let xi = min([x1, x2]); xi <= max([x1, x2]); xi++) land[y1][xi] += 1
  } else {
    const steps = Math.abs(x2 - x1)
    const xDir = (x2 - x1) / steps
    const yDir = (y2 - y1) / steps
    for (let i = 0; i <= steps; i++) {
      land[y1 + yDir * i][x1 + xDir * i] += 1
    }
  }
  // printLand(land)
}
// applyVentToLand(vents[1], land)
// applyVentToLand(vents[8], land)
vents.forEach(vent => applyVentToLand(vent, land))
printLand(land)
const result = flatten(land).filter(x => x > 1).length
console.log('task2: ', result)
