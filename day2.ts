let buff2: string[] = []
process.stdin.pipe(require('split')()).on('data', (line) => line.length && buff2.push(line))

class Command {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

process.stdin.on('end', () => {
  const steps = buff2.map((s) => {
    const parts = s.split(' ')

    const command = parts[0]
    const value = parseInt(parts[1])
    return new Command(command, value)
  })

  const fn1 = () => {
    let depth = 0
    let position = 0
    steps.forEach(({name, value}) => {
      // console.log(name, value)
      if (name === 'forward') {
        position += value
      } else if (name === 'up') {
        depth -= value
      } else if (name === 'down') {
        depth += value
      }
    })
    console.log('fn1:', depth * position)
  }

  const fn2 = () => {
    let depth = 0
    let position = 0
    let aim = 0
    steps.forEach(({name, value}) => {
      // console.log(name, value)
      if (name === 'forward') {
        position += value
        depth += aim * value
      } else if (name === 'up') {
        aim -= value
      } else if (name === 'down') {
        aim += value
      }
    })
    console.log('fn2:', depth * position)
  }

  fn1()
  fn2()
})
