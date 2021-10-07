const { basext } = require('extras')

module.exports = function() {
  const [dbname] = basext(process.cwd())

  return `const db = require('mongowave')

module.exports = function() {
  return db({ name: '${dbname}' })
}`
}
