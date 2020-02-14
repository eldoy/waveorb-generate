const tools = require('../lib/tools.js')

module.exports = async function() {
  const name = process.argv[4]
  if (!name) {
    console.log([
      `\nModel name is missing.\n`,
      `Usage: waveorb generate model [name] [type]\n`,
      `Example: waveorb generate model project\n`
    ].join('\n'))
    process.exit(1)
  }

  console.log(`Creating model ${name}...`)

  const type = process.argv[5] || 'fullpage'

  // Move files
  tools.copyFolder(tools.path(`templates/model/${type}`), 'app', name, function(to) {
    return to.endsWith('/actions.js')
      ? to.replace('/actions.js', `/${name}-actions.js`)
      : to
  })

  // Rename action
  tools.rename('app/actions/actions.js', `app/actions/${name}-actions.js`)
}
