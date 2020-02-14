module.exports = async function($) {
  $.page.title = 'Signup'

  async function handleSignup(form) {
    qa('.errors', el => text(el, ''))
    var result = await api.action('createUser', { data: serialize(form) })
    if (result.error) {
      showErrors(result)
    } else {
      cookie('token', result.token)
      cookie('flash', 'Welcome to Waveorb')
      location = '/sites.html'
    }
  }

  return /* html */`
    <h1>Signup</h1>
    <form class="signup-form" onsubmit="return false">
      <p>
        <label for="email">Email</label>
        <br>
        <input id="email" name="email" type="text" oninput="clearFields(this)">
        <span class="errors email-errors"></span>
      </p>
      <p>
        <label for="password">Password</label>
        <br>
        <input id="password" name="password" type="password" oninput="clearFields(this)">
        <span class="errors password-errors"></span>
      </p>
      <p>
        <button onclick="spinner(this, handleSignup)">Sign up</button>
      </p>
    </form>
    <p>Already have an account? <a href="/login.html">Go to login</a></p>
    <script>${ handleSignup }</script>
  `
}
