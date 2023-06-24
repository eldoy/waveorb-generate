const { basext } = require('extras')

module.exports = function() {
  const [dbname] = basext(process.cwd())
  return `name: ${dbname}`
}