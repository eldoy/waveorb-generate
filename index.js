const tools = require('./lib/tools.js')

const scripts = {}

// Usage:
// waveorb generate model project

scripts.model = async function() {
  const name = process.argv[4]
  if (!name) {
    console.log([
      `\nModel name is missing.\n`,
      `Usage: waveorb generate model [name]\n`,
      `Example: waveorb generate model project\n`
    ].join('\n'))
    process.exit(1)
  }

  console.log(`\nCreating model ${name}...`)

  tools.copyFolder('templates/model/actions', `app/actions/${name}`)
  tools.copyFolder('templates/model/pages', `app/pages/${name}`)
}

const script = scripts[process.argv[3] || '']
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [type] [name]\n`,
    `Example: waveorb generate model project\n`,
  ].join('\n'))
  process.exit(1)
}

// Run selected script
script()

// Copy shared files
tools.copyFolder(tools.path(`templates/shared`), 'app')
