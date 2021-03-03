function cap(str) {
  return (str[0].toUpperCase() + str.slice(1)).replace(/[-_]/g, ' ')
}

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
        const [type, ...options] = v.split('.')
        const fieldset = ['radio', 'check', 'checkbox'].includes(type)
        return `      <${fieldset ? 'fieldset' : 'p'}>
        ${fieldset ? `<legend>${cap(k)}</legend>` : `<label for="${k}">${cap(k)}</label>`}
        ${function() {
          if (type == 'text') {
            return `<textarea id="${k}" name="${k}" oninput="clearErrors(this)"></textarea>`
          } else if (type == 'select') {
            if (options.length) {
              return `<select name="${k}">\n${options.map(o => {
                return `          <option value="${o}">${cap(o)}</option>`
              }).join('\n')}
        </select>`
            }
            return ''
          } else if (type == 'radio') {
            if (options.length) {
              return options.map(o => {
                return `<label>${cap(o)} <input type="radio" name="${type}" value="${o}"></label>`
              }).join('\n        ')
            }
            return ''
          } else if (type == 'checkbox' || type == 'check') {
            if (options.length) {
              return options.map(o => {
                return `<label>${cap(o)} <input type="checkbox" name="${type}" value="${o}"></label>`
              }).join('\n        ')
            }
            return ''
          } else {
            return `<input id="${k}" type="${v == 'string' ? 'text' : type}" name="${k}" oninput="clearErrors(this)">`
          }
        }()}
        <em class="${k}-errors"></em>
      </${fieldset ? 'fieldset' : 'p'}>`
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
