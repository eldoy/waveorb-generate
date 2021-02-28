const path = require('path')
const extras = require('extras')
const tools = require('./lib/tools.js')

const GENERATORS = ['model', 'actions', 'pages']

const scripts = {}

const type = process.argv[3] || ''
const name = process.argv[4] || ''

function nameMissing() {
  console.log([
    `\n${type[0].toUpperCase() + type.slice(1)} name is missing.\n`,
    `Usage: waveorb generate ${type} [name]\n`,
    `Example: waveorb generate ${type} project\n`
  ].join('\n'))
  process.exit(1)
}

scripts.model = function() {
  scripts.actions()
  scripts.pages()
}

scripts.actions = function() {
  tools.copyFolder(
    path.join(__dirname, 'templates', 'actions', '*'),
    path.join('app', 'actions', name),
    name
  )

  // Need db plugin to make actions work
  if (!extras.exist(path.join('app', 'plugins', 'db.js'))) {
    tools.copyFolder(
      path.join(__dirname, 'templates', 'plugins', '*'),
      path.join('app', 'plugins'),
      name
    )
    extras.run('npm install mongowave', { silent: true })
  }
}

scripts.pages = function() {
  tools.copyFolder(
    path.join(__dirname, 'templates', 'pages', '*'),
    path.join('app', 'pages', name),
    name
  )
}

const script = scripts[type]
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [type] [name]\n`,
    `Valid types are:\n\n${GENERATORS.join('  \n')}`
  ].join('\n'))
  process.exit(1)
}

if (!name) nameMissing()

// Run selected script
script()
