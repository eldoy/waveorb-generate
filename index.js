const model = require('./scripts/model.js')
const scripts = { model }
const script = scripts[process.argv[3] || '']
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate model [name]\n`,
    `Example: waveorb generate model project`
  ].join('\n'))
  process.exit(1)
}
script()
