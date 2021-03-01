module.exports = function(name, names, Name, Names) {
  return `module.exports = async function($) {
  $.page.title = 'Delete ${name}'

  async function handleDelete(btn) {
    btn.disabled = true
    var result = await api({ action: '${name}/delete', query: { id } })
    if (result.error) {
      flash(result.error.message)
    } else {
      cookie('flash', '${Name} deleted')
      location = $.link('${name}/list')
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api({ action: '${name}/get', query: { id }})
    html('form', /* html */\`
      <p>
        Really delete <mark>&rdquo;\${esc(item.name)}&rdquo;</mark>?
      </p>
      <p>
        <button onclick="handleDelete(this)">Delete</button>
        <a href="\${$.link('${name}/list')}">Cancel</a>
      </p>
    \`)
  }

  return /* html */\`
    <h1>Delete ${name}</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('${name}_id')
      \${renderForm}
      renderForm()
      \${handleDelete}
    </script>
  \`
}`
}
