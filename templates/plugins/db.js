process.env.CONFIGDB_PATH = '~/.waveorb.yml'
const db = require('configdb')

module.exports = async function(app) {
  app.db = db
}
