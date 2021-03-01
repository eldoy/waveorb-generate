const path = require('path')
const { exist, mkdir, write, basext, run } = require('extras')
const pluralize = require('pluralize')
const loader = require('conficurse')
const templates = loader.load(path.join(__dirname, 'templates'))

const GENERATORS = ['model', 'actions', 'pages']

const scripts = {}

const type = process.argv[3] || ''
const name = process.argv[4] || ''
const plural = pluralize(name)
const args = {
  name,
  plural,
  Name: name[0].toUpperCase() + name.slice(1),
  Names: plural[0].toUpperCase() + plural.slice(1)
}

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
  for (const action in templates.actions) {
    const template = templates.actions[action]
    const to = path.join('app', 'actions', name)
    if (!exist(to)) mkdir(to)
    write(path.join(to, `${action}.js`), template(args))
  }

  // Need db plugin to make actions work
  if (!exist(path.join('app', 'plugins', 'db.js'))) {
    const template = templates.plugins.db
    const to = path.join('app', 'plugins')
    if (!exist(to)) mkdir(to)
    write(path.join(to, `db.js`), template())
    run('npm install mongowave', { silent: true })
  }
}

scripts.pages = function() {
  for (const page in templates.pages) {
    const template = templates.pages[page]
    const to = path.join('app', 'pages', name)
    if (!exist(to)) mkdir(to)
    write(path.join(to, `${page}.js`), template(args))
  }
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
