const path = require('path')
const { exist, mkdir, isDir, dir, read, write, basext, run, exit } = require('extras')
const pluralize = require('pluralize')
const loader = require('conficurse')
const templates = loader.load(path.join(__dirname, 'templates'))

const GENERATORS = ['model', 'actions', 'pages', 'file']

const argv = process.argv.slice(3)
const [type = '', name = '', ...options] = argv

if (!GENERATORS.includes(type)) {
  exit([
    `\nUsage: waveorb generate [type] [name] [fields]\n`,
    `Valid types are:\n\n${GENERATORS.join('  \n')}`
  ].join('\n'))
}

if (!name) {
  exit([
    `\n${type[0].toUpperCase() + type.slice(1)} name is missing.\n`,
    `Usage: waveorb generate ${type} [name]\n`,
    `Example: waveorb generate ${type} project\n`
  ].join('\n'))
}

// Store models here
let models = []

// Load from file
if (type == 'file') {

  // Check that all files exist
  if (!exist(name)) {
    exit(`File not found!`)
  }

  function push(file) {
    const data = read(file)
    const [base, ext] = basext(file)
    if (!data.name) data.name = base
    models.push(data)
  }

  // Expand dirs to files and merge
  if (isDir(name)) {
    dir(name).map(f => path.join(name, f)).forEach(push)
  } else {
    push(name)
  }

} else {
  const base = name.split('/').reverse()[0]
  const fields = { name: 'string' }
  options.forEach(pair => {
    let [key, value] = pair.split(':').map(x => x.trim())
    fields[key] = value || 'string'
  })
  const data = { name, fields }
  models.push(data)
}


for (const model of models) {
  model.base = model.name.split('/').reverse()[0]
  model.plural = model.plural || pluralize(model.base)
  model.Name = model.base[0].toUpperCase() + model.base.slice(1)
  model.Names = model.plural[0].toUpperCase() + model.plural.slice(1)

  console.log(JSON.stringify(model, null, 2))

  if (type != 'page') {
    // Write actions
    for (const action in templates.actions) {
      const template = templates.actions[action]
      const to = path.join('app', 'actions', model.base)
      if (!exist(to)) mkdir(to)
      write(path.join(to, `${action}.js`), template(model))
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

  if (type != 'action') {
    // Write pages
    for (const page in templates.pages) {
      const template = templates.pages[page]
      const to = path.join('app', 'pages', model.base)
      if (!exist(to)) mkdir(to)
      write(path.join(to, `${page}.js`), template(model))
    }
  }
}
