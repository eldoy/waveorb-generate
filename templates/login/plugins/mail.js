const mail = require('wmail')

const config = {
  domain: 'eldoy.com',
  key: 'YOUR_MAILGUN_API_KEY'
}

const options = {
  reply: 'vidar@waveorb.com',
  from: 'vidar@waveorb.com',
  to: 'vidar@fugroup.net'
}

module.exports = async function(app) {
  app.mail = mail({ app, ...config, options })
}
