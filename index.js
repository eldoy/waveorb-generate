const path = require('path')
const { exist, mkdir, copy, tree, edit, basext, run } = require('extras')
const pluralize = require('pluralize')

const GENERATORS = ['model', 'actions', 'pages']

const scripts = {}

const type = process.argv[3] || ''
const name = process.argv[4] || ''

function copyFolder(from, to) {
  if (!exist(to)) mkdir(to)
  copy(from, to)
  tree(to).forEach(f => {
    edit(f, t => {
      if (!name) return t || ''
      const plural = pluralize(name)
      t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
      t = t.replace(/__names__/g, plural)
      t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
      t = t.replace(/__name__/g, name)
      const [dbname] = basext(process.cwd())
      return t.replace(/__DBNAME__/g, dbname.replace(/[^a-z-_]/g, ''))
    })
  })
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
  copyFolder(
    path.join(__dirname, 'templates', 'actions', '*'),
    path.join('app', 'actions', name)
  )

  // Need db plugin to make actions work
  if (!exist(path.join('app', 'plugins', 'db.js'))) {
    copyFolder(
      path.join(__dirname, 'templates', 'plugins', '*'),
      path.join('app', 'plugins')
    )
    run('npm install mongowave', { silent: true })
  }
}

scripts.pages = function() {
  copyFolder(
    path.join(__dirname, 'templates', 'pages', '*'),
    path.join('app', 'pages', name)
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
