const tools = require('../lib/tools.js')

module.exports = async function() {
  const name = process.argv[3]
  if (!name) {
    console.log([
      `\nModel name is missing.\n`,
      `Usage: waveorb generate model [name] [type]\n`,
      `Example: waveorb generate model project\n`
    ].join('\n'))
    process.exit(1)
  }

  console.log(`Creating model ${name}...`)

  const type = process.argv[4] || 'fullpage'

  tools.rmdir('app')

  tools.mkdir(`app/pages/${name}`)
  tools.mkdir('app/actions')
  tools.mkdir('app/layouts')
  tools.mkdir('app/locales')
  tools.mkdir('app/plugins')
  tools.mkdir('app/assets/js')

  // Create pages
  const names = ['list', 'get', 'new', 'edit', 'delete']
  names.forEach(function(file) {
    const page = tools.template(`model/${type}/${file}`, name)
    tools.write(`app/pages/${name}/${file}.js`, page)
  })

  // Create actions
  console.log(name)
  tools.write(`app/actions/${name}.js`, tools.template('model/actions', name))
}
