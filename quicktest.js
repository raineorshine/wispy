fs = require('fs')
wispy = require('./')

const src = fs.readFileSync(process.argv[2], 'utf-8')
const parsed = wispy.parse(src)

// console.dir(parsed.ast, { colors: true, depth: 100 })
// console.log('---')

const ins = { type: 'insert', loc: { start: 5 }, value: '!!!' }
const ast1 = parsed.ast//wispy.edit(parsed.ast, parsed.wispy, ins)
// console.dir(ast1, { colors: true, depth: 100 })
// console.log('---')

console.log('--- wispy ---')
console.log(wispy.renderWispy(ast1))

const jsText = wispy.renderJs(ast1)
console.log('--- JS ---')
console.log(jsText)
