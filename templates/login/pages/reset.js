module.exports = async function($) {
  $.page.title = 'Reset password'

  async function handleReset() {
    var m = location.search.match(/\?key=([a-z0-9-]{36})/)
    if (!m) {
      cookie('flash', 'Key not valid, please try again.')
      location = '/forgot.html'
    } else {
      key = m[1]
      const result = await api.action('resetPassword', { data: { key } })
      if (result.error) {
        cookie('flash', result.error.message)
        location = '/forgot.html'
      } else {
        cookie('token', result.token)
        init()
        q('.verify-key').style.display = 'none'
        q('.reset-form').style.display = ''
      }
    }
  }

  async function handleUpdate(form) {
    const password = serialize(form).password
    const result = await api.action('updatePassword', { data: { key, password } })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('flash', 'Your password has been updated.')
      location = '/sites.html'
    }
  }

  return /* html */`
    <h1>Reset password</h1>
    <p class="verify-key">
      Please wait, verifying key...
    </p>
    <form class="reset-form" onsubmit="return false" style="display: none">
      <p>
        <label for="password">New Password</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button onclick="spinner(this, handleUpdate)">Update</button>
      </p>
    </form>
    <script>var key;(${ handleReset }());${ handleUpdate }</script>
  `
}
