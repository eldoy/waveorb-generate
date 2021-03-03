module.exports = function({ base, plural, fields, name, Names }) {
  // Show name, email or id
  const display = fields.name ? 'name' : fields.email ? 'email' : 'id'

  function ids() {
    const trail = name.split('/').slice(0, -1)
    if (trail.length) {
      return `?${trail.map(path => `${path}_id=\${params('${path}_id')}`).join('&')}`
    }
    return ''
  }

  return `module.exports = async function($) {
  $.page.title = '${Names}'

  async function renderList() {
    var items = await api({ action: '${base}/find' })
    if (items.length) {
      html('#list', /* html */\`
        \${items.map(item => {
          return /* html */\`
            <div class="flex list">
              <span>\${esc(item.${display})}</span>
              <nav>
                <a href="\${$.link(\`${base}/show?${base}_id=\${item.id}\`)}">
                  Show
                </a>
                <a href="\${$.link(\`${base}/edit?${base}_id=\${item.id}\`)}">
                  Edit
                </a>
                <a href="\${$.link(\`${base}/delete?${base}_id=\${item.id}\`)}">
                  Delete
                </a>
              </nav>
            </div>
          \`
        }).join('')}
      \`)
    } else {
      html('#list', \`No ${plural} found... Click on <mark>&ldquo;New ${base}&rdquo;</mark> to create one!\`)
    }
  }

  return /* html */\`
    <div class="flex">
      <h1>${Names}</h1>
      <a href="\${$.link('${base}/new${ids()}')}">New ${base}</a>
    </div>
    <div id="list"></div>
    <script>
      \${renderList}
      renderList()
    </script>
  \`
}`
}
