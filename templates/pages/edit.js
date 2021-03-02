module.exports = function({ base, Name }) {
  return `module.exports = async function($) {
  $.page.title = 'Edit ${base}'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '${base}/update', query: { id }, values })
    if (!showErrors(result)) {
      cookie('flash', '${Name} updated')
      location = $.link('${base}/list')
    }
    btn.disabled = false
  }

  async function renderForm() {
    const item = await api({ action: '${base}/get', query: { id }})
    html('form', /* html */\`
      <p>
        <label for="name">Name</label>
        <input id="name" type="text" name="name" value="\${esc(item.name)}">
        <em class="name-errors"></em>
      </p>
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="\${$.link('${base}/list')}">Cancel</a>
      </p>
    \`)
  }

  return /* html */\`
    <h1>Edit ${base}</h1>
    <form onsubmit="return false"></form>
    <script>
      var id = params('${base}_id')
      \${renderForm}
      renderForm()
      \${handleSave}
    </script>
  \`
}`
}
