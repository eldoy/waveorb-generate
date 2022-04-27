module.exports = function({ base, Name }) {
  return `module.exports = async function($) {
  $.page.title = 'Delete ${base}'

  async function handleDelete(btn) {
    btn.disabled = true
    var result = await api('/${base}/delete', { query: { id } })
    if (result.error) {
      flash(result.error.message)
    } else {
      cookie('flash', '${Name} deleted')
      location = $.link('${base}/list')
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api('/${base}/get', { query: { id } })
    html('form', /* html */\`
      <p>
        Really delete <mark>&rdquo;\${esc(item.name)}&rdquo;</mark>?
      </p>
      <p>
        <button onclick="handleDelete(this)">Delete</button>
        <a href="\${$.link('${base}/list')}">Cancel</a>
      </p>
    \`)
  }

  return /* html */\`
    <h1>Delete ${base}</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('${base}_id')
      \${renderForm}
      renderForm()
      \${handleDelete}
    </script>
  \`
}`
}
