module.exports = async function($) {
  $.page.title = 'Forgot'

  async function handleForgot(form) {
    qa('.errors', el => text(el, ''))
    var result = await api.action('forgotPassword', { data: serialize(form) })
    if (result.error) {
      showErrors(result, 'query')
    } else {
      cookie('flash', `We've sent you a login link, please check your email`)
      location = '/login.html'
    }
  }

  return /* html */`
    <h1>Forgot password</h1>
    <form onsubmit="return false">
      <p>
        <label for="email">Email</label>
        <br>
        <input id="email" type="text" name="email" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <button onclick="spinner(this, handleForgot)">Submit</button>
      </p>
    </form>
    <p>
      <a href="/login.html">Back to login</a>
    </p>
    <script>${ handleForgot }</script>
  `
}
