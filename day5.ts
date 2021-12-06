// import { trim, some, every, unzip, flatten, sum } from 'lodash'
import { flatten, unzip, max } from 'lodash'
import { readFileSync } from 'fs'

const dataFile = 'day5.example.txt'
// const dataFile = 'day5.txt'
const data = readFileSync(dataFile, 'utf8')
const lines: string[] = data.split("\n").filter(line => line.length)

const vents = lines.map(l => l.split(' -> ').map(points => points.split(',').map(x => parseInt(x))))
console.log(vents)

const [xs, ys] = unzip(flatten(vents))
const maxX = max(xs)
const maxY = max(ys)

let land = []
for (let y = 0; y < maxY; y++) {
  land.push(new Array(maxX).fill(0))
  // for (let x = 0; y < maxX; x++) {
  //   land[y].push()
  // }
}
// let land = new Array(maxY)
// land.forEach((_element, row) => {
//   land[row] = (new Array(maxX)).fill(0)
// })

console.log(land)
// console.log('xs', xs)
// console.log('ys', ys)
