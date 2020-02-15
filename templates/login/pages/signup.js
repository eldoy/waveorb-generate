module.exports = async function($) {
  $.page.title = $.t('pages.signup.title')

  async function handleSignup(form) {
    var button = q('button', form)
    button.disabled = true
    qa('.errors', function(el) { text(el, '') })
    html('.error-message', '')
    var result = await api.action('createUser', { data: serialize(form) })
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
    <h1>${ $.t('pages.signup.header') }</h1>
    <div class="error-message"></div>
    <form class="signup-form" onsubmit="handleSignup(this);return false">
      <p>
        <label for="email">${ $.t('pages.signup.form.email') }</label>
        <br>
        <input id="email" name="email" type="text">
        <div class="errors email-error"></div>
      </p>
      <p>
        <label for="password">${ $.t('pages.signup.form.password') }</label>
        <br>
        <input id="password" name="password" type="password">
        <div class="errors password-error"></div>
      </p>
      <p>
        <button>${ $.t('pages.signup.form.button') }</button>
      </p>
    </form>
    <p>
      ${ $.t('pages.signup.account') }
      <a href="${ $.link('login') }">${ $.t('pages.signup.login') }</a>
    </p>
    <script>${ handleSignup }</script>
  `
}
