module.exports = async function($) {
  $.page.title = 'Edit __name__'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '__name__/update', query: { id }, values })
    if (!showErrors(result)) {
      cookie('flash', '__Name__ updated')
      location = $.link('index')
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api({ action: '__name__/get', query: { id }})
    html('form', /* html */`
      <p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" value="${esc(item.name)}">
        <em class="name-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="${$.link(`index`)}">Cancel</a>
      </p>
    `)
  }

  return /* html */`
    <h1>Edit __name__</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('__name___id')
      ${renderForm}
      renderForm()
      ${handleSave}
    </script>
  `
}
