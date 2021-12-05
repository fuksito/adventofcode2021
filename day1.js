// import { bench, read } from '@lib'
// const depths =
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });
// let deepths: number[] = []
// rl.on('line', function(line: number){
//     // console.log(line);
//     deepths.push(line)
// })
var buff = [];
// process.stdin
//   .on('data', line => buff.push(line.split()))
//   .on('end', () => {
//     console.log(buff)
//   })
process.stdin.pipe(require('split')()).on('data', function (line) { return buff.push(line); });
process.stdin.on('end', function () {
    var counter = 0;
    var prev = buff[0];
    for (var i = 0; i < buff.length; i++) {
        var curr = buff[i];
        // if (!curr) continue;
        var isIncrease = curr > prev;
        console.log("".concat(i, " ").concat(curr, " ").concat(isIncrease ? '(increase)' : ''));
        if (isIncrease)
            counter++;
        prev = curr;
    }
    // "123 123".splitToInt()
    //   .slideWindow()
    //   .count(([a, b]) => a < b);
    console.log(counter);
});
// console.log(deepths)
