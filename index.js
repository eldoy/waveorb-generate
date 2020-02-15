const tools = require('./lib/tools.js')

const scripts = {}

scripts.model = async function() {
  const name = process.argv[4]
  if (!name) {
    console.log([
      `\nModel name is missing.\n`,
      `Usage: waveorb generate model [name] [type]\n`,
      `Example: waveorb generate model project\n`
    ].join('\n'))
    process.exit(1)
  }

  console.log(`\nCreating model ${name}...`)

  const type = process.argv[5] || 'fullpage'

  // Move files
  tools.copyFolder(tools.path(`templates/model/${type}`), 'app', name, function(to) {
    return to.endsWith('/actions.js')
      ? to.replace('/actions.js', `/${name}-actions.js`)
      : to
  })

  // Rename action
  tools.rename('app/actions/actions.js', `app/actions/${name}-actions.js`)

  console.log(`\nRun 'npm i mongowave' to make the db plugin work.`)
}

scripts.login = async function() {
  console.log(`\nCreating login...`)

  // Move files
  tools.copyFolder(tools.path(`templates/login`), 'app')

  console.log(`\nRun 'npm i mongowave' to make the db plugin work.`)
  console.log(`\nRun 'npm i wmail' to make the mail plugin work.`)
}

scripts.payment = async function() {
  console.log(`\nCreating payment...`)

  // Move files
  tools.copyFolder(tools.path(`templates/payment`), 'app')

  console.log(`\nRun 'npm i stripe' to make the payment plugin work.`)
  console.log(`\nRun 'npm i wmail' to make the mail plugin work.`)
}

const script = scripts[process.argv[3] || '']
if (typeof script !== 'function') {
  console.log([
    `\nUsage: waveorb generate [type] [name]\n`,
    `Examples:\n`,
    `waveorb generate model project`,
    `waveorb generate login`,
    `waveorb generate payment`
  ].join('\n'))
  process.exit(1)
}
script()

// Copy shared files
tools.copyFolder(tools.path(`templates/shared`), 'app')
