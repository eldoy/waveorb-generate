const path = require('path')
const extras = require('extras')
const tools = require('./lib/tools.js')

const GENERATORS = ['model', 'actions', 'pages', 'plugin']
const NEEDS_NAME = ['model', 'actions', 'pages']

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
}

scripts.pages = function() {
  tools.copyFolder(
    path.join(__dirname, 'templates', 'pages', '*'),
    path.join('app', 'pages', name),
    name
  )
  scripts.plugin()
}

scripts.plugin = function() {
  if (!extras.exist(path.join('app', 'plugins', 'db.js'))) {
    tools.copyFolder(
      path.join(__dirname, 'templates', 'plugins', '*'),
      path.join('app', 'plugins')
    )
    extras.run('npm install configdb')
  }
}

const script = scripts[type]
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [type] [name]\n`,
    `Valid types are:\n${GENERATORS.join('  \n')}`
  ].join('\n'))
  process.exit(1)
}

if (!name && NEEDS_NAME.includes(type)) nameMissing()

// Run selected script
script()
