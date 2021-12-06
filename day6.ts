import {sum} from 'lodash'
import { readFileSync } from 'fs'

const dataFile = 'day6.txt'
const data = readFileSync(dataFile, 'utf8')
const lines: string[] = data.split("\n").filter(line => line.length)
let directory = new Array(9).fill(0)
let population = lines[0].split(',').map(x => parseInt(x))
population.forEach(n => directory[n] += 1)

const days = 256
for (let day = 1; day <= days; day++) {
  const zeroes = directory[0]
  directory = directory.slice(1)
  directory.push(zeroes)
  directory[6] += zeroes
}

console.log('Final population: ' + sum(directory))

