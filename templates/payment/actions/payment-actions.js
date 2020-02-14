/** Payment routes */
module.exports = {
  createPayment: {
    filters: ['authenticate'],
    validate: {
      data: {
        token: {
          required: true,
          is: '$string'
        },
        site_id: {
          required: true,
          is: '$id'
        },
        amount: {
          required: true,
          is: '$string'
        }
      }
    },
    main: async function($) {
      const { token, site_id, amount } = $.params.data
      const charge = await $.app.payment.charges.create({
        amount,
        currency: 'usd',
        description: 'Waveorb Site Activation',
        source: token
      })

      const timestamp = String(parseInt(new Date().getTime()))
      const key = await $.app.crypto.encrypt(timestamp)

      return await $.app.db('site').update({ _id: site_id, user_id: $.user._id }, { key, amount, charge })
    }
  }
}
