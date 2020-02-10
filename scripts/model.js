// CRUD templates: list, show, new, edit, delete
// CRUD actions: list, show, create, update, delete, count

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

  // Need db plugin
}
