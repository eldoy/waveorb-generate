const stripe = require('stripe')
const key = 'sk_test_dbq7qyoRBcrapgToGX7eelMe'

module.exports = async function(app) {
  app.payment = stripe(key)
}
