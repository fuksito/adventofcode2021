
let buff: number[] = []
process.stdin.pipe(require('split')()).on('data', (line) => buff.push(parseInt(line)))

process.stdin.on('end', () => {
  const countIncreases = (buff: number[]): number => {
    let counter = 0
    let prev = buff[0]
    for (let i = 0; i < buff.length; i++) {
      const curr = buff[i]
      // if (!curr) continue;
      const isIncrease = curr > prev
      // console.log(`${i} ${curr} ${isIncrease ? '(increase)' : ''}`)
      if (isIncrease) counter++
      prev = curr
    }

    return counter
  }

  let groups: number[] = []
  for (let i = 0; i < buff.length; i++) {
    if (i + 3 >= buff.length) continue;
    groups.push(buff[i] + buff[i + 1] + buff[i + 2])
  }

  console.log('groups:', countIncreases(groups))
})
