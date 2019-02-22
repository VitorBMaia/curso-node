var fs = require('fs')


var buffer = fs.readFileSync('arquivo.txt')
var str = buffer.toString()

console.log(str.split('\n').length)