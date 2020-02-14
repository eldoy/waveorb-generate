module.exports = async function($) {
  $.page.title = $.t('pages.login.title')

  async function handleLogin(form) {
    var button = q('button', form)
    button.disabled = true
    qa('.errors', function(el) { text(el, '') })
    var result = await api.action('createSession', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      Object.keys(result.values || {}).forEach(function(key) {
        text(`.${key}-error`, result.values[key].join(', '))
      })
    } else {
      cookie('token', result.token)
      location = $.link('index')
    }
  }

  return /* html */`
    <h1>Login</h1>
    <form class="login-form" onsubmit="return false">
      <p>
        <label for="email">Email</label>
        <br>
        <input id="email" name="email" type="email" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <label for="password">Password</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button onclick="spinner(this, handleLogin)">Log in</button>
      </p>
    </form>
    <p>Don't have an account yet? <a href="/signup.html">Go to signup</a></p>
    <p>
      <a href="/forgot.html">Forgot your password?</a>
    </p>
    <script>${ handleLogin }</script>
  `
}
