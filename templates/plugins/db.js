process.env.CONFIGDB_PATH = '__CONFIGDB_PATH__'
const db = require('configdb')

module.exports = async function(app) {
  app.db = db
}
