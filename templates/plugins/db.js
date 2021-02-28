const db = require('mongowave')

module.exports = async function(app) {
  app.db = await db({ name: '__DBNAME__' })
}
