module.exports = function({ base, plural, Names }) {
  return `module.exports = async function($) {
  $.page.title = '${Names}'

  async function renderList() {
    var items = await api({ action: '${base}/find' })
    if (items.length) {
      html('#list', /* html */\`
        \${items.map(item => {
          return /* html */\`
            <div class="flex list">
              <span>\${esc(item.name)}</span>
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
      <a href="\${$.link('${base}/new')}">New ${base}</a>
    </div>
    <div id="list"></div>
    <script>
      \${renderList}
      renderList()
    </script>
  \`
}`
}
