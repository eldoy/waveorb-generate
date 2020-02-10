// CRUD templates: list, show, new, edit, delete
// CRUD actions: list, show, create, update, delete, count

const pluralize = require('pluralize')
const tools = require('../lib/tools.js')

function template(file, name) {
  let t = tools.read(`templates/${file}.js`)
  console.log({ name })
  const plural = pluralize(name)

  t = t.replace(/__Names__/g, plural[0].toUpperCase() + plural.slice(1))
  t = t.replace(/__names__/g, plural)
  t = t.replace(/__Name__/g, name[0].toUpperCase() + name.slice(1))
  t = t.replace(/__name__/g, name)
  return t
}

module.exports = async function() {
  const name = process.argv[3]
  if (!name) {
    console.log([
      `\nModel name is missing.\n`,
      `Usage: waveorb generate model [name]\n`,
      `Example: waveorb generate model project\n`
    ].join('\n'))
    process.exit(1)
  }

  console.log(`Creating model ${name}...`)

  // tools.rmdir('app')

  tools.mkdir(`app/pages/${name}`)
  tools.mkdir('app/actions')

  // Create pages
  const names = ['list', 'get', 'new', 'edit', 'delete']
  names.forEach(function(file) {
    const page = template(file, name)
    tools.write(`app/pages/${name}/${file}.js`, page)
  })

  // Create actions
  console.log(name)
  tools.write(`app/actions/${name}.js`, template('actions', name))
}
