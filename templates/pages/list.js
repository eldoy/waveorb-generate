module.exports = function({ base, plural, fields, name, Names }) {
  // Show name, email or id
  const display = fields.name ? 'name' : fields.email ? 'email' : 'id'

  return `module.exports = async function($) {
  $.page.title = '${Names}'

  async function renderList() {
    var items = await api('/${base}/find')
    if (items.length) {
      html('#list', /* html */\`
        \${items.map(item => {
          return /* html */\`
            <div class="flex list">
              <span>\${esc(item.${display})}</span>
              <nav>
                <a href="\${\`/${base}/show?${base}_id=\${item.id}\`}">
                  Show
                </a>
                <a href="\${\`/${base}/edit?${base}_id=\${item.id}\`}">
                  Edit
                </a>
                <a href="\${\`/${base}/delete?${base}_id=\${item.id}\`}">
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
      <a id="new" href="/${base}/new">New ${base}</a>
    </div>
    <div id="list"></div>
    <script>
      \${renderList}
      renderList()
    </script>
  \`
}`
}
