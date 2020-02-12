#!/usr/bin/env node
const scripts = {
  model: require('../scripts/model.js')
}
const script = scripts[process.argv[2] || '']
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [script]\n`,
    `Available scripts:\n`,
    `model - generate model code`
  ].join('\n'))
  process.exit(1)
}
script()
