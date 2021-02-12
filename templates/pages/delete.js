module.exports = async function($) {
  $.page.title = 'Delete __name__'

  async function handleDelete(btn) {
    btn.disabled = true
    var result = await api({ action: '__name__/delete', query: { id } })
    if (result.error) {
      flash(result.error.message)
    } else {
      cookie('flash', '__Name__ deleted')
      location = $.link('index')
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api({ action: '__name__/get', query: { id }})
    html('form', /* html */`
      <p>
        Really delete <mark>&rdquo;${esc(item.name)}&rdquo;</mark>?
      </p>
      <p>
        <button onclick="handleDelete(this)">Delete</button>
        <a href="${$.link(`index`)}">Cancel</a>
      </p>
    `)
  }

  return /* html */`
    <h1>Delete __name__</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('__name___id')
      ${renderForm}
      renderForm()
      ${handleDelete}
    </script>
  `
}
