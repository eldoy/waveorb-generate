module.exports = async function($) {
  $.page.title = $.t('pages.login.title')

  async function handleLogin(form) {
    var button = q('button', form)
    button.disabled = true
    qa('.errors', function(el) { text(el, '') })
    html('.error-message', '')
    var result = await api.action('createSession', { data: serialize(form) })
    if (result.error) {
      button.disabled = false
      html('.error-message', result.error.message)
      Object.keys(result.data || {}).forEach(function(key) {
        text(`.${key}-error`, result.data[key].join(', '))
      })
    } else {
      cookie('token', result.token)
      location = $.link('index')
    }
  }

  return /* html */`
    <h1>${ $.t('pages.login.header') }</h1>
    <div class="error-message"></div>
    <form class="login-form" onsubmit="handleLogin(this);return false">
      <p>
        <label for="email">${ $.t('pages.login.form.email') }</label>
        <br>
        <input id="email" name="email" type="email">
        <div class="errors email-error"></div>
      </p>
      <p>
        <label for="password">${ $.t('pages.login.form.password') }</label>
        <br>
        <input id="password" name="password" type="password">
        <div class="errors password-error"></div>
      </p>
      <p>
        <button>${ $.t('pages.login.form.button') }</button>
      </p>
    </form>
    <p>
      ${ $.t('pages.login.noaccount') }
      <a href="${ $.link('signup') }">${ $.t('pages.login.signup') }</a>
    </p>
    <p>
      <a href="${ $.link('forgot') }">${ $.t('pages.login.forgot') }</a>
    </p>
    <script>${ handleLogin }</script>
  `
}
