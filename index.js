const tools = require('./lib/tools.js')
const path = require('path')

const GENERATORS = [ 'model', 'actions', 'pages']

const scripts = {}

const type = process.argv[3] || ''
const name = process.argv[4] || ''

function nameMissing() {
  if (!name) {
    console.log([
      `\n${type[0].toUpperCase() + type.slice(1)} name is missing.\n`,
      `Usage: waveorb generate ${type} [name]\n`,
      `Example: waveorb generate ${type} project\n`
    ].join('\n'))
    process.exit(1)
  }
}

scripts.model = function() {
  scripts.actions()
  scripts.pages()
}

scripts.actions = function() {
  tools.copyFolder(
    path.join('templates', 'actions', '*'),
    path.join('app', 'actions', name),
    name
  )
}

scripts.pages = function() {
  tools.copyFolder(
    path.join('templates', 'pages', '*'),
    path.join('app', 'pages', name),
    name
  )
}

const script = scripts[type]
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [type] [name]\n`,
    `Valid types are:\n${GENERATORS.join('  \n')}`
  ].join('\n'))
  process.exit(1)
}

if (!name) nameMissing()

// Run selected script
script()
