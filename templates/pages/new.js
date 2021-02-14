module.exports = async function($) {
  $.page.title = 'New __name__'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '__name__/create', values })
    console.log(result)
    if (!showErrors(result)) {
      cookie('flash', '__Name__ created')
      location = $.link('__name__/list')
    }
    btn.disabled = false
  }

  return /* html */`
    <h1>New __name__</h1>
    <form onsubmit="return false">
      <p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" oninput="clearErrors(this)">
        <em class="name-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="${$.link('__name__/list')}">Cancel</a>
      </p>
    </form>
    <script>
      ${handleSave}
    </script>
  `
}
