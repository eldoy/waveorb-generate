module.exports = function({ base, fields, name, Name }) {
  const entries = Object.entries(fields)

  function parents() {
    const trail = name.split('/').slice(0, -1)
    if (trail.length) {
      return trail.map(parent => {
        return `\n      <input type="hidden" name="${parent}_id" value="\${params('${parent}_id')}">\n`
      }).join('\n')
    }
    return ''
  }

  function inputs() {
    if (entries.length) {
      return `${entries.map(([k, v]) => {
        return `      <p>
        <label for="${k}">${k[0].toUpperCase() + k.slice(1)}</label>
        ${function() {
          if (v == 'text') {
            return `<textarea id="${k}" name="${k}" oninput="clearErrors(this)"></textarea>`
          } else {
            return `<input id="${k}" type="${v == 'string' ? 'text' : v}" name="${k}" oninput="clearErrors(this)">`
          }
        }()}
        <em class="${k}-errors"></em>
      </p>`
      }).join('\n')}`
    }
    return ''
  }

  return `module.exports = async function($) {
  $.page.title = 'New ${base}'

  async function handleSave(btn) {
    btn.disabled = true
    var values = serialize(btn.form)
    var result = await api({ action: '${base}/create', values })
    if (!showErrors(result)) {
      cookie('flash', '${Name} created')
      location = $.link('${base}/list')
    }
    btn.disabled = false
  }

  async function renderForm() {
    html('form', /* html */\`${parents()}${inputs()}
      <p>
        <button onclick="handleSave(this)">Save</button>
        <a href="\${$.link('${base}/list')}">Cancel</a>
      </p>
    \`)
  }

  return /* html */\`
    <h1>New ${base}</h1>
    <form onsubmit="return false"></form>
    <script>
      \${renderForm}
      renderForm()
      \${handleSave}
    </script>
  \`
}`
}
