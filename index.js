var path = require('path')
var extras = require('extras')
var pluralize = require('pluralize')
var loader = require('conficurse')
var templates = loader.load(path.join(__dirname, 'templates'))

var GENERATORS = ['model', 'actions', 'pages', 'file', 'plugin']

var argv = process.argv.slice(3)
var [type = '', name = '', ...options] = argv

if (!GENERATORS.includes(type)) {
  extras.exit(
    [
      `\nUsage: waveorb generate [type] [name] [fields]\n`,
      `Valid types are:\n\n${GENERATORS.join('  \n')}`
    ].join('\n')
  )
}

if (!name) {
  extras.exit(
    [
      `\n${type[0].toUpperCase() + type.slice(1)} name is missing.\n`,
      `Usage: waveorb generate ${type} [name]\n`,
      `Example: waveorb generate ${type} project\n`
    ].join('\n')
  )
}

// Store models here
var models = []

// Load from file
if (type == 'file') {
  // Check that all files exist
  if (!extras.exist(name)) {
    extras.exit(`File not found!`)
  }

  function push(file) {
    var data = extras.read(file)
    var [base, ext] = extras.basext(file)
    if (!data.name) data.name = base
    models.push(data)
  }

  // Expand dirs to files and merge
  if (extras.isDir(name)) {
    extras
      .dir(name)
      .map((f) => path.join(name, f))
      .forEach(push)
  } else {
    push(name)
  }
} else {
  var base = name.split('/').reverse()[0]
  var fields = {}
  if (!options.length) fields.name = 'string'
  options.forEach((pair) => {
    var [key, value] = pair.split(':').map((x) => x.trim())
    fields[key] = value || 'string'
  })
  var data = { name, fields }
  models.push(data)
}

function copy(to, file, content) {
  var filepath = path.join(to, file)
  if (!extras.exist(to)) {
    extras.exec(`mkdir -p ${to}`)
  }
  extras.write(filepath, content)
}

for (var model of models) {
  model.base = model.name.split('/').reverse()[0]
  model.plural = model.plural || pluralize(model.base)
  model.Name = model.base[0].toUpperCase() + model.base.slice(1)
  model.Names = model.plural[0].toUpperCase() + model.plural.slice(1)

  if (['plugin'].includes(type)) {
    if (name == 'net') {
      if (!extras.exist(path.join('app', 'actions', 'upload', 'create.js'))) {
        var content = templates.upload.create()
        var to = path.join('app', 'actions', 'upload')
        copy(to, `create.js`, content)
      }

      if (!extras.exist(path.join('app', 'plugins', 'net.js'))) {
        var content = templates.plugins.net()
        var to = path.join('app', 'plugins')
        copy(to, `net.js`, content)
      }

      if (!extras.exist(path.join('app', 'config', 'upload.yml'))) {
        var content = templates.config.upload()
        var to = path.join('app', 'config')
        copy(to, `upload.yml`, content)
        extras.exec('npm install dugg', { silent: true })
      }
    }

    if (name == 'db') {
      if (!extras.exist(path.join('app', 'plugins', 'db.js'))) {
        var content = templates.plugins.db()
        var to = path.join('app', 'plugins')
        copy(to, `db.js`, content)
      }

      if (!extras.exist(path.join('app', 'config', 'db.yml'))) {
        var content = templates.config.db()
        var to = path.join('app', 'config')
        copy(to, `db.yml`, content)
        extras.exec('npm install mongowave', { silent: true })
      }
    }
  }

  if (['model', 'actions'].includes(type)) {
    // Write actions
    for (var action in templates.actions) {
      var content = templates.actions[action](model)
      var to = path.join('app', 'actions', model.base)
      copy(to, `${action}.js`, content)
    }

    if (!extras.exist(path.join('app', 'config', 'db.yml'))) {
      var content = templates.config.db()
      var to = path.join('app', 'config')
      copy(to, `db.yml`, content)
    }

    // Need db plugin to make actions work
    if (!extras.exist(path.join('app', 'plugins', 'db.js'))) {
      var content = templates.plugins.db()
      var to = path.join('app', 'plugins')
      copy(to, `db.js`, content)
      extras.exec('npm install mongowave', { silent: true })
    }
  }

  if (['model', 'pages'].includes(type)) {
    // Write pages
    for (var page in templates.pages) {
      var content = templates.pages[page](model)
      var to = path.join('app', 'pages', model.base)
      copy(to, `${page}.js`, content)
    }
  }
}

console.log('\nFiles generated.\n')
