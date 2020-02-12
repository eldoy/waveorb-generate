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

  // Move files
  tools.copyFolder(`templates/model/${type}`, 'app', name)

  // Rename action
  tools.rename('app/actions/actions.js', `app/actions/${name}-actions.js`)
}
