import {unzip, sum} from 'lodash'

let buff3: string[] = []
process.stdin.pipe(require('split')()).on('data', (line) => line.length && buff3.push(line))

const flipBits = (n: number) => {
  return parseInt(
    (n).toString(2).split('').map(x => x === '1' ? '0' : '1').join(''),
    2
  )
}

const buildBitMap = (bins: (number[])[]) => {
  const result: number[] = []
  const columns = unzip(bins)
  const columnHalf = columns[0].length / 2
  columns.forEach((cs, index): void => {
    const bitSum = sum(cs)
    if (bitSum === columnHalf) {
      result[index] = -1
    } else if (bitSum > columnHalf) {
      result[index] = 1
    } else {
      result[index] = 0
    }
  })

  return result
}

process.stdin.on('end', () => {
  const bins: (number[])[] = buff3.map((s) => s.split('').map(x => parseInt(x)))
  const binLength = bins[0].length
  const columns = unzip(bins)
  const fn1 = () => {
    const columnHalf = columns[0].length / 2
    const bitMap = buildBitMap(bins)
    const gamma = parseInt(bitMap.join(''), 2)
    const epsilon = flipBits(gamma)

    console.log(gamma * epsilon) // must be 1025636
  }

  const fn2 = () => {
    const findOxygen = () => {
      let candidates = bins
      for (let i = 0; i < binLength; i++) {
        const bitMap = buildBitMap(candidates)
        candidates = candidates.filter(bin => bitMap[i] === -1 ? bin[i] === 1 : bin[i] === bitMap[i])
        if (candidates.length === 1) {
          return candidates[0]
        }
      }
    }

    const findCO2 = () => {
      let candidates = bins
      for (let i = 0; i < binLength; i++) {
        const bitMap = buildBitMap(candidates)
        candidates = candidates.filter(bin => bitMap[i] === -1 ? bin[i] === 0 : bin[i] !== bitMap[i])
        if (candidates.length === 1) {
          return candidates[0]
        }
      }
    }

    console.log(
      parseInt(findOxygen().join(''), 2) * parseInt(findCO2().join(''), 2)
    )
  }

  fn1()
  fn2()
})
