const filters = {}

filters.authenticate = async function($) {
  const token = $.req.cookie('token')
  const session = await $.app.db('session').get({ token })
  if (session && session.user_id) {
    $.user = await $.app.db('user').get({ _id: session.user_id })
    if (!$.user) {
      $.req.cookie('token', '', -1)
      await $.app.db('session').delete({ token })
      throw Error('user not found')
    }
  } else {
    throw Error('must be logged in')
  }
}

module.exports = filters